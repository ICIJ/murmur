# Tree-shakable per-component ESM distribution — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a second, tree-shakable ESM build of `@icij/murmur-next` so a single-component import excludes unused components and their CSS, while keeping the existing UMD/CJS bundle and `app.use(Murmur)` working.

**Architecture:** Two Vite build passes share one plugin/resolve/css config module. Pass 1 is today's inlined UMD+ESM build (`dist/lib`, unchanged). Pass 2 is a new `preserveModules` ESM build (`dist/es`) with per-component CSS code-splitting, all runtime dependencies externalized, and a `sideEffects` allowlist that keeps per-component CSS imports while letting bundlers prune unused JS.

**Tech Stack:** Vite 7 lib mode, Rollup `preserveModules`, `vite-plugin-dts`, `@vitejs/plugin-vue`, esbuild (for the tree-shaking probe), Vitest.

**Spec:** `docs/superpowers/specs/2026-06-15-tree-shakable-esm-design.md`

---

## File Structure

- **Create** `vite.config.shared.ts` — exports the plugin factory, `resolve`, `css`, and the externalization helper shared by both build passes. Single source of truth for build config; no behavior of its own.
- **Modify** `vite.config.ts` — consume `vite.config.shared.ts`; keep producing the exact same `dist/lib` output (UMD pass). `vitest.config.ts` imports this, so it must keep default-exporting a working config.
- **Create** `vite.config.es.ts` — the ESM `preserveModules` pass writing to `dist/es`.
- **Create** `lib/plugin.ts` — the `Murmur` plugin object, moved out of `main.ts`.
- **Modify** `lib/main.ts` — pure re-exports + `export { default } from './plugin'`.
- **Create** `scripts/verify-treeshake.sh` — packs the lib, builds a throwaway consumer importing one component, asserts unused code is dropped.
- **Modify** `package.json` — `module`/`types`/`sideEffects`/`files`/`exports` + a `build:lib:es` script.
- **Modify** `README.md` — document the tree-shakable ESM build and the `app.use(Murmur)` ESM migration note.

---

## Task 1: Extract shared Vite config (UMD output unchanged)

**Files:**
- Create: `vite.config.shared.ts`
- Modify: `vite.config.ts`

- [ ] **Step 1: Capture a baseline of the current UMD output**

This is the regression oracle for the whole task — `dist/lib` must not change.

Run:
```bash
yarn build:lib
mkdir -p /tmp/murmur-baseline
cp dist/lib/murmur.js dist/lib/murmur.umd.cjs dist/lib/murmur.css /tmp/murmur-baseline/
```
Expected: three files copied, no error.

- [ ] **Step 2: Create the shared config module**

Create `vite.config.shared.ts`:
```ts
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import Vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Delete from './plugins/plugin-delete'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

/**
 * Plugins shared by both build passes. A factory (not a constant array) so each
 * pass gets fresh plugin instances and can append its own DTS config.
 */
export function sharedPlugins() {
  return [
    Delete(),
    Vue({
      template: {
        transformAssetUrls: {
          'image-mode': ['src'],
          'image-mode-source': ['src'],
          'b-img': ['src'],
          'video': ['src', 'poster'],
          'source': ['src'],
          'img': ['src'],
          'image': ['xlink:href', 'href'],
          'use': ['xlink:href', 'href']
        }
      }
    }),
    VueI18nPlugin({
      include: resolve(__dirname, 'lib/locales')
    }),
    Icons({
      scale: 1,
      compiler: 'vue3',
      autoInstall: false
    }),
    Components({
      dts: false,
      dirs: [],
      resolvers: [
        BootstrapVueNextResolver(),
        IconsResolver({ prefix: 'i', enabledCollections: ['ph'] })
      ]
    }),
    AutoImport({
      dts: false,
      vueTemplate: true,
      imports: [],
      resolvers: [IconsResolver({ prefix: 'i', enabledCollections: ['ph'] })]
    })
  ]
}

export const sharedResolve = {
  extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  alias: {
    'vue': resolve(__dirname, './node_modules/vue'),
    'node_modules': resolve(__dirname, 'node_modules'),
    '@': fileURLToPath(new URL('./lib', import.meta.url)),
    '~storybook': resolve(__dirname, './.storybook')
  },
  dedupe: ['vue']
}

export const sharedCss = {
  preprocessorOptions: {
    scss: {
      api: 'modern',
      silenceDeprecations: ['legacy-js-api', 'import', 'color-functions', 'global-builtin', 'if-function'],
      additionalData: `
            @use 'sass:math';
            @use 'sass:color';
            @import "@/styles/lib.scss";
          `
    },
    sass: {
      quietDeps: true
    }
  }
}

/** Narrow external list for the UMD pass: only the peers a CDN page provides. */
export const umdExternal = ['bootstrap', 'vue', 'bootstrap-vue-next']

/**
 * The ESM pass externalizes ALL runtime dependencies (and their subpaths) so
 * consumers dedupe/tree-shake them via their own node_modules instead of
 * receiving inlined copies of d3, topojson, lodash, etc.
 */
const esmExternalNames = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
]
export function esmExternal(id: string): boolean {
  return esmExternalNames.some((dep) => id === dep || id.startsWith(`${dep}/`))
}
```

- [ ] **Step 3: Rewrite `vite.config.ts` to consume the shared module**

Replace the entire contents of `vite.config.ts` with:
```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import DTS from 'vite-plugin-dts'
import { sharedPlugins, sharedResolve, sharedCss, umdExternal } from './vite.config.shared'

export default defineConfig({
  base: '/',
  assetsInclude: ['/sb-preview/**'],
  plugins: [
    ...sharedPlugins(),
    DTS({
      exclude: [
        'tests/**',
        '**/*stories.ts',
        'test',
        'vite',
        'vite.config.ts',
        'vitest.config.ts'
      ],
      outDir: 'dist/lib',
      tsconfigPath: './tsconfig.json',
      logLevel: 'silent'
    })
  ],
  resolve: sharedResolve,
  css: sharedCss,
  build: {
    target: 'es2015',
    copyPublicDir: false,
    outDir: 'dist/lib',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: '@icij/murmur',
      fileName: 'murmur'
    },
    rollupOptions: {
      external: umdExternal,
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'murmur.css'
          }
          return assetInfo.name ?? ''
        }
      }
    }
  }
})
```

- [ ] **Step 4: Rebuild and diff against the baseline**

Run:
```bash
yarn build:lib
diff /tmp/murmur-baseline/murmur.umd.cjs dist/lib/murmur.umd.cjs && \
diff /tmp/murmur-baseline/murmur.js dist/lib/murmur.js && \
diff /tmp/murmur-baseline/murmur.css dist/lib/murmur.css && \
echo "UMD OUTPUT UNCHANGED"
```
Expected: `UMD OUTPUT UNCHANGED` with no diff output. If any file differs, the refactor changed behavior — reconcile before continuing.

- [ ] **Step 5: Confirm Vitest still loads the refactored config**

Run: `yarn test:unit`
Expected: same pass/fail counts as before the change (all currently-passing suites still pass).

- [ ] **Step 6: Commit**

```bash
git add vite.config.shared.ts vite.config.ts
git commit -m "refactor(build): extract shared Vite config module"
```

---

## Task 2: Extract the Murmur plugin into `lib/plugin.ts`

**Files:**
- Create: `lib/plugin.ts`
- Modify: `lib/main.ts`
- Test: `tests/unit/main.spec.ts`, `tests/unit/config.spec.ts` (existing; must keep passing)

- [ ] **Step 1: Create `lib/plugin.ts` with the plugin object moved verbatim**

Create `lib/plugin.ts`:
```ts
import { createBootstrap } from 'bootstrap-vue-next'
import { App, Component, DefineComponent } from 'vue'
import { i18n } from './i18n'
import * as components from './components'
import * as datavisualisations from './datavisualisations'
import * as maps from './maps'
import config from './config'

type ComponentMap = Record<string, Component | DefineComponent>

interface PluginOptions {
  useI18n?: boolean
  useBootstrap?: boolean
  useConfig?: boolean
  registerComponents?: boolean
}

const Murmur = {
  get i18n() {
    return i18n
  },
  get config() {
    return config
  },
  get components(): ComponentMap {
    return components
  },
  get datavisualisations(): ComponentMap {
    return datavisualisations
  },
  get maps(): ComponentMap {
    return maps
  },
  setLocaleMessage(lang: string, message: any) {
    return Murmur.i18n.global.setLocaleMessage(lang, message)
  },
  mergeLocaleMessage(lang: string, message: any) {
    return Murmur.i18n.global.mergeLocaleMessage(lang, message)
  },
  setLocale(lang: 'fr' | 'en') {
    return (Murmur.i18n.global.locale.value = lang)
  },
  getLocale() {
    return Murmur.i18n.global.locale.value
  },
  install(app: App<Element>, {
    useI18n = true,
    useBootstrap = true,
    useConfig = true,
    registerComponents = true
  }: PluginOptions = {}) {
    if (useBootstrap) {
      app.use(createBootstrap())
    }

    if (useI18n) {
      app.use(Murmur.i18n)
    }

    if (useConfig) {
      app.config.globalProperties.$config = Murmur.config
    }

    if (registerComponents) {
      Object.keys(this.components).forEach(key =>
        app.component(key, this.components[key])
      )
      Object.keys(this.datavisualisations).forEach(key =>
        app.component(key, this.datavisualisations[key])
      )
      Object.keys(this.maps).forEach(key =>
        app.component(key, this.maps[key])
      )
    }
  }
}

export default Murmur
```

- [ ] **Step 2: Reduce `lib/main.ts` to pure re-exports**

In `lib/main.ts`, delete the top-of-file imports that only fed the plugin and the entire `Murmur` object + its `export default Murmur`. Specifically:

Remove these lines (currently lines 1–7):
```ts
import { createBootstrap } from 'bootstrap-vue-next'
import { i18n } from './i18n'
import * as components from './components'
import * as datavisualisations from './datavisualisations'
import * as maps from './maps'
import config from './config'
import { App, Component, DefineComponent } from 'vue'
```

Remove the entire block from `type ComponentMap = ...` through `export default Murmur` (currently lines 166–235).

Add, at the end of the file, a single line:
```ts
export { default } from './plugin'
```

The file must still contain every `export { default as X } from './...'` named re-export and the `export type { ... } from './types'` block — leave those untouched.

- [ ] **Step 3: Run the existing plugin/default-export tests**

These import `Murmur from '@/main'` and exercise `install`, locale, and config.

Run: `yarn test:unit tests/unit/main.spec.ts tests/unit/config.spec.ts tests/unit/components/Form/FormSignUp.spec.ts`
Expected: PASS (the default export still resolves through `main.ts` → `plugin.ts`).

- [ ] **Step 4: Run the full unit suite**

Run: `yarn test:unit`
Expected: same pass/fail counts as before the change.

- [ ] **Step 5: Verify the UMD build still bundles the plugin**

Run:
```bash
yarn build:lib
grep -q "createBootstrap" dist/lib/murmur.umd.cjs && echo "PLUGIN BUNDLED IN UMD"
```
Expected: `PLUGIN BUNDLED IN UMD`.

- [ ] **Step 6: Commit**

```bash
git add lib/plugin.ts lib/main.ts
git commit -m "refactor(lib): move Murmur plugin to plugin.ts, main.ts is re-exports only"
```

---

## Task 3: Add the ESM `preserveModules` build pass

**Files:**
- Create: `vite.config.es.ts`
- Modify: `package.json` (scripts only, in this task)

- [ ] **Step 1: Create `vite.config.es.ts`**

Create `vite.config.es.ts`:
```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import DTS from 'vite-plugin-dts'
import { sharedPlugins, sharedResolve, sharedCss, esmExternal } from './vite.config.shared'

export default defineConfig({
  base: '/',
  assetsInclude: ['/sb-preview/**'],
  plugins: [
    ...sharedPlugins(),
    DTS({
      exclude: [
        'tests/**',
        '**/*stories.ts',
        'test',
        'vite',
        'vite.config.ts',
        'vite.config.es.ts',
        'vite.config.shared.ts',
        'vitest.config.ts'
      ],
      outDir: 'dist/es',
      // Emit .d.ts mirrored from lib/ so types sit beside their .js
      // (dist/es/main.d.ts, dist/es/components/.../X.d.ts).
      entryRoot: 'lib',
      tsconfigPath: './tsconfig.json',
      logLevel: 'silent'
    })
  ],
  resolve: sharedResolve,
  css: sharedCss,
  build: {
    target: 'es2015',
    copyPublicDir: false,
    outDir: 'dist/es',
    emptyOutDir: true,
    sourcemap: true,
    // Emit one CSS file per component chunk, auto-imported by that chunk's JS.
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: esmExternal,
      output: {
        // Mirror the lib/ source tree into dist/es so each module is prunable.
        preserveModules: true,
        preserveModulesRoot: 'lib',
        entryFileNames: '[name].js',
        exports: 'named'
      }
    }
  }
})
```

- [ ] **Step 2: Add build scripts**

In `package.json`, change the `build:lib` script and add `build:lib:es`:
```json
    "build:lib": "vite build && vite build --config vite.config.es.ts",
    "build:lib:es": "vite build --config vite.config.es.ts",
```
(Leave `prepublish: "yarn build:lib"` as-is — it now runs both passes.)

- [ ] **Step 3: Run the ESM build**

Run: `yarn build:lib:es`
Expected: build completes; `dist/es/` is created. A Vite warning that `lib.fileName` is ignored under `preserveModules` is expected and harmless.

- [ ] **Step 4: Verify the ESM output is a per-module tree**

Run:
```bash
test -f dist/es/main.js && \
test -f dist/es/plugin.js && \
test -f dist/es/main.d.ts && \
test -f dist/es/components/Button/ButtonIcon.js && \
test -f dist/es/datavisualisations/BarChart/BarChart.js && \
echo "ESM TREE OK"
```
Expected: `ESM TREE OK`. (If `main.d.ts` is missing or nested under `dist/es/lib/`, fix the `entryRoot`/`outDir` DTS options before continuing.)

- [ ] **Step 5: Verify each styled component imports its own CSS and deps are external**

Run:
```bash
# A styled component's chunk pulls in a .css import...
grep -Eq "import['\"\`][^'\"]*\.css" dist/es/components/Button/ButtonIcon.js && echo "PER-COMPONENT CSS OK"
# ...and runtime deps are bare (external), not inlined:
grep -q "from\s*['\"]d3" dist/es/datavisualisations/BarChart/BarChart.js && echo "D3 EXTERNAL OK"
# ...and there is no inlined node_modules tree:
test ! -d dist/es/node_modules && echo "NO INLINED DEPS"
```
Expected: `PER-COMPONENT CSS OK`, `D3 EXTERNAL OK`, `NO INLINED DEPS`. (The exact CSS filename/path is chosen by Vite and is not load-bearing; the requirement is that the import exists so bundlers keep used CSS and drop unused.)

- [ ] **Step 6: Confirm the UMD build still runs in the same command**

Run:
```bash
yarn build:lib
test -f dist/lib/murmur.umd.cjs && test -f dist/es/main.js && echo "BOTH PASSES OK"
```
Expected: `BOTH PASSES OK`.

- [ ] **Step 7: Commit**

```bash
git add vite.config.es.ts package.json
git commit -m "feat(build): add tree-shakable preserveModules ESM build (dist/es)"
```

---

## Task 4: Wire `package.json` exports, `sideEffects`, and `files`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update the fields**

In `package.json`, set/replace these top-level fields (keep `main` pointing at UMD; repoint `module`/`types` to `dist/es`; add `sideEffects`; extend `files` and `exports`):
```json
  "main": "./dist/lib/murmur.umd.cjs",
  "module": "./dist/es/main.js",
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
      "import": "./dist/es/main.js",
      "require": "./dist/lib/murmur.umd.cjs"
    },
    "./dist/lib/murmur.css": "./dist/lib/murmur.css",
    "./lib/": "./lib/",
    "./dist/": "./dist/"
  },
```

- [ ] **Step 2: Verify the package resolves and the published file list is correct**

Run:
```bash
yarn build:lib
npm pack --dry-run 2>&1 | grep -E "dist/es/main.js|dist/lib/murmur.umd.cjs|dist/lib/murmur.css" && echo "FILES INCLUDED"
```
Expected: all three paths listed and `FILES INCLUDED` printed. If `dist/es/main.js` is absent, the `files` glob is wrong.

- [ ] **Step 3: Verify TypeScript can resolve the package types**

Run:
```bash
node --input-type=module -e "import { createRequire } from 'node:module'; const r=createRequire('file://'+process.cwd()+'/'); const e=r('./package.json').exports['.']; if(!e.types||!e.import||!e.require) throw new Error('exports incomplete'); console.log('EXPORTS OK')"
```
Expected: `EXPORTS OK`.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "feat(pkg): point ESM exports at tree-shakable dist/es with sideEffects allowlist"
```

---

## Task 5: Tree-shaking verification fixture (headline proof)

**Files:**
- Create: `scripts/verify-treeshake.sh`

- [ ] **Step 1: Write the verification script**

Create `scripts/verify-treeshake.sh`:
```bash
#!/usr/bin/env bash
# Proves a single-component import drops unused components + their deps.
# Packs the lib, builds a throwaway consumer with esbuild (which honours the
# package.json "sideEffects" allowlist), and greps the output bundle.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> building library"
yarn build:lib >/dev/null

echo "==> packing tarball"
TARBALL="$ROOT/$(npm pack --silent)"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP" "$TARBALL"' EXIT
cd "$TMP"

cat > package.json <<'JSON'
{ "name": "treeshake-fixture", "private": true, "type": "module" }
JSON

echo "==> installing tarball + vue into fixture"
npm install --silent "$TARBALL" vue >/dev/null

cat > entry.js <<'JS'
import { ButtonIcon } from '@icij/murmur-next'
// reference it so it cannot be dropped as unused
globalThis.__keep = ButtonIcon
JS

echo "==> bundling consumer with esbuild"
npx --yes esbuild entry.js \
  --bundle --format=esm --minify \
  --loader:.css=empty \
  --outfile=out.js >/dev/null

echo "==> asserting unused components are absent"
fail=0
for needle in "BarChart" "ChoroplethMap" "SymbolMap" "topojson" "d3-geo"; do
  if grep -q "$needle" out.js; then
    echo "FAIL: '$needle' leaked into a ButtonIcon-only bundle"
    fail=1
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "PASS: tree-shaking dropped unused components and their deps"
  echo "bundle size: $(wc -c < out.js) bytes"
else
  exit 1
fi
```

- [ ] **Step 2: Make it executable**

Run: `chmod +x scripts/verify-treeshake.sh`
Expected: no output.

- [ ] **Step 3: Run the proof**

Run: `./scripts/verify-treeshake.sh`
Expected: ends with `PASS: tree-shaking dropped unused components and their deps` and a byte count. If any needle leaks, the `sideEffects` allowlist or `preserveModules`/`external` config is wrong — fix the relevant earlier task.

- [ ] **Step 4: Record the baseline numbers**

Run (captures full-barrel vs single-component size for the changelog):
```bash
# single-component size already printed above; now the full barrel:
cd "$(mktemp -d)" && npm init -y >/dev/null && \
npm install --silent "$(cd - >/dev/null && pwd)/$(cd "$OLDPWD" && npm pack --silent)" vue >/dev/null 2>&1 || true
echo "Record the 'bundle size' from Step 3 in the PR description."
```
Expected: a noted byte count to cite. (This step is informational; if the helper line errors in your shell, just reuse the Step 3 byte count.)

- [ ] **Step 5: Commit**

```bash
git add scripts/verify-treeshake.sh
git commit -m "test(build): add tree-shaking verification fixture"
```

---

## Task 6: Document the tree-shakable build and migration note

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a usage + migration section to `README.md`**

Append (or place near the existing install/usage section) the following to `README.md`:
```markdown
## Importing components

`@icij/murmur-next` ships a tree-shakable ESM build. Import only what you use and
your bundler drops the rest — no global stylesheet required:

```js
import { ButtonIcon } from '@icij/murmur-next'
```

Each component pulls in only its own styles, so unused components and their CSS
never reach your bundle.

### Using the global plugin

The all-in plugin still works for registering every component at once:

```js
import { createApp } from 'vue'
import Murmur from '@icij/murmur-next'

createApp(App).use(Murmur)
```

> **Migration note (v5):** when using the ESM build, `app.use(Murmur)` registers
> components but no longer guarantees the aggregate stylesheet is loaded
> automatically. If you relied on the single bundled stylesheet, import it
> explicitly:
>
> ```js
> import '@icij/murmur-next/dist/lib/murmur.css'
> ```
>
> The UMD/CDN build (`dist/lib/murmur.umd.cjs`) is unchanged and still bundles
> all styles.
```

- [ ] **Step 2: Sanity-check the README renders**

Run: `grep -q "tree-shakable" README.md && echo "README UPDATED"`
Expected: `README UPDATED`.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: document tree-shakable imports and app.use migration note"
```

---

## Self-Review

**Spec coverage:**
- Two-pass build (UMD unchanged + new `dist/es`) → Tasks 1, 3. ✅
- Per-component CSS auto-imported → Task 3 Step 5. ✅
- Barrel-only tree-shaking via `preserveModules` + `sideEffects` allowlist → Tasks 3, 4. ✅
- Plugin extraction to `lib/plugin.ts` → Task 2. ✅
- `package.json` exports/`sideEffects`/`files`/`module`/`types` → Task 4. ✅
- Backward compat (UMD byte-equivalent, `require`, deep paths, aggregate CSS) → Task 1 Step 4, Task 4. ✅
- Acknowledged `app.use(Murmur)` ESM regression documented → Task 6. ✅
- Tarball-based tree-shaking proof → Task 5. ✅
- `yarn test:unit` green → Tasks 1, 2. ✅

**Deviation noted (within approved scope):** the ESM pass externalizes *all* runtime dependencies (d3, topojson, lodash, …), not only the three UMD externals. This is required for genuine tree-shaking and dedup; the UMD pass keeps the original narrow external list. The spec's Pass-2 external bullet is updated to match.

**Placeholder scan:** no TBD/TODO; every code step shows complete content. ✅

**Type/name consistency:** `sharedPlugins()`, `sharedResolve`, `sharedCss`, `umdExternal`, `esmExternal` are defined in Task 1 and consumed by the same names in Tasks 1 and 3. `lib/plugin.ts` default export is consumed via `export { default } from './plugin'` in Task 2. ✅
