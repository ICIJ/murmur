# Tree-shakable ESM distribution for `@icij/murmur-next`

**Date:** 2026-06-15
**Status:** Approved design, pending implementation plan

## Problem

Consumers of `@icij/murmur-next` cannot tree-shake. Importing a single component
(`import { BarChart } from '@icij/murmur-next'`) pulls the entire library —
every component, d3, topojson, bootstrap-vue-next, i18n — into the consumer's
bundle. Three causes:

1. **Single inlined bundle.** `vite build` compiles `lib/main.ts` into one
   `murmur.js` / `murmur.umd.cjs` chunk with `inlineDynamicImports: true`. There
   are no module boundaries left for a bundler to prune.
2. **No `sideEffects` field.** Bundlers conservatively assume every module has
   side effects and keep it.
3. **Single aggregate CSS.** All styles ship as one `murmur.css`. Even with
   perfectly tree-shaken JS, the full stylesheet ships.

## Goal

Ship a tree-shakable ESM build so that a single-component import excludes unused
components **and their CSS**, while preserving backward compatibility for
existing consumers.

## Decisions

| Question | Decision |
| --- | --- |
| Existing global plugin / UMD build | **Keep both.** Add tree-shakable ESM alongside; UMD output unchanged. |
| CSS strategy | **Per-component CSS, auto-imported** into each component's JS chunk. |
| Import surface | **Barrel only** — `import { BarChart } from '@icij/murmur-next'`, made tree-shakable via `preserveModules` + `sideEffects` allowlist. No new subpaths to document. |
| Build mechanism | **Two Vite passes** (Approach A): UMD pass unchanged, new ESM pass with `preserveModules`. |
| `sideEffects` value | **Allowlist** (`["**/*.css", "**/*.scss"]`), not literal `false`, so per-component CSS imports are never stripped. |
| Plugin location | **Extract** the `Murmur` plugin object into `lib/plugin.ts`; `main.ts` becomes pure re-exports. |

## Backward compatibility

Retrocompatibility is a first-class priority. Preserved unchanged:

- **UMD / CDN / `<script>`** consumers — `dist/lib/murmur.umd.cjs` is emitted by
  the unchanged UMD pass and must be byte-equivalent to today's output.
- **Named ESM imports** — `import { BarChart } from '@icij/murmur-next'` keep
  working (now tree-shakable).
- **Deep paths** — `./lib/`, `./dist/` and the aggregate
  `./dist/lib/murmur.css` subpaths remain exported.
- **CJS `require`** — resolves to the UMD bundle as today.

**Accepted regression (acknowledged):** the zero-config `app.use(Murmur)`
all-in experience is no longer guaranteed to "just work out of the box" from the
ESM build. The default export remains the plugin and component registration
still works, but consumers may need an explicit step — importing the aggregate
stylesheet (`import '@icij/murmur-next/dist/lib/murmur.css'`) or relying on the
per-component CSS auto-imported when the plugin references all components. We do
**not** contort the build to perfectly preserve this path; instead we document a
migration note. Where it works without extra steps, that is a bonus, not a
requirement.

## Architecture

### Two Vite build passes

`inlineDynamicImports` (one UMD file) and `preserveModules` (tree-shakable ESM)
are mutually exclusive, and Vite lib mode forces inlining when emitting multiple
formats in one pass. So two passes are required, run sequentially by
`build:lib`.

**Pass 1 — inlined UMD + ESM (unchanged).** Current `vite.config.ts` behavior,
emitting all three inlined artifacts exactly as today:

- `dist/lib/murmur.umd.cjs` (+ `.map`)
- `dist/lib/murmur.js` (+ `.map`) — inlined ESM, retained so any consumer
  deep-importing `./dist/lib/murmur.js` is unaffected
- `dist/lib/murmur.css`

Output location and content unchanged so `main`, the `require` condition, the
`./dist/` deep path, and existing CSS imports keep resolving. Only the
`module` / `exports.import` fields are repointed (to the new `dist/es` build) —
the files themselves stay.

**Pass 2 — ESM, `preserveModules` (new).** Mirrors the `lib/` source tree into a
separate output dir to avoid colliding with Pass 1:

- `dist/es/main.js` — the barrel entry (pure re-exports)
- `dist/es/plugin.js` — the extracted `Murmur` plugin
- `dist/es/components/Button/ButtonIcon.js` + `ButtonIcon.css`
- `dist/es/datavisualisations/BarChart/BarChart.js` + `BarChart.css`
- … one `.js` per source module (sibling `.css` for the ~37 styled components),
  preserving the tree
- `.d.ts` files emitted alongside so types resolve per-module

Key Pass 2 flags:

- `lib.formats: ['es']`
- `rollupOptions.output.preserveModules: true`
- `rollupOptions.output.preserveModulesRoot: 'lib'`
- `build.cssCodeSplit: true` (per-`.vue` CSS, auto-imported by its JS chunk)
- **no** `inlineDynamicImports`
- `external`: the ESM pass externalizes **all** runtime dependencies and their
  subpaths (d3, topojson, lodash, … plus the `vue`/`bootstrap`/`bootstrap-vue-next`
  peers), so consumers dedupe/tree-shake them via their own `node_modules`
  rather than receiving inlined copies. (The UMD pass keeps the original narrow
  `vue`/`bootstrap`/`bootstrap-vue-next` external list, since CDN users expect a
  self-contained bundle.) The i18n/icon plugins carry over unchanged.

Pass 2 must verify each styled component's JS chunk begins with an
`import './<Name>.css'` statement (this is what the `sideEffects` allowlist
protects).

### Plugin extraction

`main.ts` is currently both the named-export barrel and the home of the `Murmur`
default plugin, which imports `createBootstrap`, `i18n`, `config`, and
`import * as components/datavisualisations/maps` namespaces.

Move the `Murmur` object into `lib/plugin.ts`. `main.ts` then:

- keeps all named `export { default as X } from './...'` re-exports
- adds `export { default } from './plugin'`
- keeps the public type re-exports

This isolates the plugin's heavy top-level imports (bootstrap, i18n, the
namespace barrels) in a module the consumer's bundler can prune wholesale when
the default export is unused — removing any ambiguity about whether a
single-component import drags in the plugin graph.

The UMD pass still bundles `plugin.ts` and all components inline, so
`app.use(Murmur)` behaves exactly as before in the UMD/CJS build.

## `package.json` changes

```jsonc
{
  "main": "./dist/lib/murmur.umd.cjs",        // unchanged (CJS/UMD)
  "module": "./dist/es/main.js",               // -> new ESM build
  "types": "./dist/es/main.d.ts",
  "sideEffects": [
    "**/*.css",
    "**/*.scss"
  ],
  "files": [
    "lib/**/*",
    "dist/lib/**/*",
    "dist/es/**/*"
  ],
  "exports": {
    ".": {
      "types": "./dist/es/main.d.ts",
      "import": "./dist/es/main.js",           // ESM -> tree-shakable
      "require": "./dist/lib/murmur.umd.cjs"   // CJS -> inlined UMD
    },
    "./dist/lib/murmur.css": "./dist/lib/murmur.css",
    "./lib/": "./lib/",
    "./dist/": "./dist/"
  }
}
```

### Why an allowlist, not `sideEffects: false`

A literal `sideEffects: false` lets aggressive bundlers drop the per-component
`import './ButtonIcon.css'` statements as "unused", silently stripping styles.
Listing `*.css`/`*.scss` as the only side-effecting files tells bundlers the JS
is pure but the CSS imports must be kept. This is the standard pattern for
component libraries that ship per-component CSS. For JS tree-shaking the effect
is identical to `false`.

## Verification

The success criterion is demonstrated tree-shaking, not merely a passing build.

### Build-level checks
- `dist/es/` mirrors `lib/`: one `.js` per source module, sibling `.css` for the
  styled components, `.d.ts` alongside. Spot-check `BarChart.js` begins with
  `import './BarChart.css'`.
- `dist/lib/` is byte-equivalent to a pre-change build — diff
  `murmur.umd.cjs`, `murmur.js`, and `murmur.css` to confirm zero regression on
  the back-compat path.

### Tree-shaking proof (headline result)
- Pack the library (`yarn pack`) and install the tarball into a throwaway
  consumer app (avoids workspace resolution masking the real published shape).
- Consumer does `import { ButtonIcon } from '@icij/murmur-next'` and builds.
- Assert the output bundle **contains** `ButtonIcon` and **excludes**
  `BarChart` / `ChoroplethMap` / d3 / topojson, and that `createBootstrap` and
  i18n are absent.
- Record baseline numbers: full-barrel import size vs single-component import
  size. These go in the PR description / changelog.

### Regression
- `yarn test:unit` (vitest) green, unchanged.
- Smoke test: `app.use(Murmur)` from the UMD build still registers all
  components and styles render.

### Definition of done
- UMD output unchanged.
- Single-component ESM import excludes unused components and their CSS.
- `app.use(Murmur)` unaffected in the UMD/CJS build; ESM all-in path documented
  with any required CSS-import step.
- Types resolve for the `.` import.
- `yarn test:unit` passes.

## Out of scope

- Explicit per-component subpath exports (`@icij/murmur-next/BarChart`) — barrel
  + `sideEffects` is sufficient; can be added later if a consumer's bundler
  proves too naive.
- Splitting or restructuring the SCSS design tokens.
- Any change to component source/behavior beyond the `plugin.ts` extraction.
