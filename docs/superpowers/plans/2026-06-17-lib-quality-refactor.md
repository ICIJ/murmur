# Library Quality Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise code quality across all of `lib/` (style, comments, JSDoc, atomicity, vue-best-practices, aggressive composable extraction) without changing the published public API or any observable behavior.

**Architecture:** Behavior-preserving refactor on the `refactor/style-harmonization` branch. The existing 42 specs + `yarn lint` + `yarn build:lib` are the safety net — every task ends green before commit. Work proceeds in waves: foundations (composables/utils) first, then simple components, complex components, datavis/maps, and finally stories conformance.

**Tech Stack:** Vue 3 `<script setup lang="ts">`, Vite (UMD + ESM configs), Vitest + Vue Test Utils, Storybook CSF3, `@vueuse/core`, ESLint + Prettier.

---

## Authorities & global rules (apply to EVERY task)

These two skills govern all edits. **Invoke them in the executing session before editing:**

- `/pirhoo-style` — personal style authority. **Wins on any conflict.**
- `/vue-best-practices` — Vue review authority for `.vue` files.

**The Standard Refactor Recipe** — apply to each file in a task, in this order:

1. **Style:** Apply `/pirhoo-style` to the whole file (naming, formatting, idioms).
2. **vue-best-practices** (`.vue` only): Run the skill's checklist against the
   component; fix findings that don't change the public API (props/events/slots).
3. **Comments:** Delete stale, redundant, or obvious comments. **Keep "why"
   comments** that explain non-obvious rationale (e.g. the resize-debounce note
   in `useResizeObserver.ts`). Do not add narration comments.
4. **Atomicity / naming:** Split functions doing more than one thing; rename
   unclear identifiers. Keep each function single-purpose.
5. **Composable extraction (aggressive):** Move non-trivial reactive/stateful
   logic into a `useXxx` composable in `lib/composables/`, even if single-use.
   - Add JSDoc to the composable (see JSDoc rule).
   - If the composable owns testable logic, add a colocated spec under
     `tests/unit/composables/`.
   - **Export policy:** add broadly-useful composables to `lib/main.ts` exports;
     keep single-use internal composables unexported.
6. **JSDoc:** Every composable and every *exported* util function gets a JSDoc
   block: one-line summary, `@param` for each parameter, `@returns`, and
   `@example` where it aids a consumer.

**Hard constraints (never violate):**

- No change to exported component names, props, events, slots, or existing
  `lib/main.ts` exports. New composable exports are additive only.
- No behavior changes. No dependency changes. No public-component renames.

**Per-task verification gate** (run before every commit):

```bash
yarn lint && yarn test:unit && yarn build:lib
```

Expected: lint clean, all specs pass, both UMD + ESM builds succeed.

**Public-API guard.** Before Wave 0 and after Wave 4, snapshot the export surface:

```bash
node -e "import('./lib/main.ts').then(m => console.log(Object.keys(m).sort().join('\n')))" 2>/dev/null \
  || grep -oE 'export (default |\{[^}]*\}|const \w+|function \w+)' lib/main.ts | sort > /tmp/api-after.txt
```

Diff the before/after lists; the only allowed difference is *added* composables.

---

## Wave 0 — Foundations (composables + utils + directives)

### Task 0.1: Baseline snapshot & branch check

**Files:** none (verification only)

- [ ] **Step 1: Confirm branch and clean tree**

Run: `git branch --show-current && git status --porcelain`
Expected: `refactor/style-harmonization` and clean tree.

- [ ] **Step 2: Capture the green baseline**

Run: `yarn lint && yarn test:unit && yarn build:lib`
Expected: all pass. If anything fails here, STOP — the baseline is broken and must be reported before refactoring.

- [ ] **Step 3: Snapshot public exports**

Run:
```bash
grep -nE 'export' lib/main.ts > /tmp/api-before.txt && wc -l /tmp/api-before.txt
```
Expected: a file listing current exports. Keep it for the Wave 4 diff.

### Task 0.2: Refactor `lib/utils/` (7 files)

**Files:**
- Modify: `lib/utils/animation.ts`, `assets.ts`, `clipboard.ts`, `floatingUi.ts`, `iframe-resizer.ts`, `placeholder.ts`, `strings.ts`
- Test (existing, must stay green): `tests/unit/utils/assets.spec.js`, `iframe-resizer.spec.js`, `clipboard.spec.js`

- [ ] **Step 1: Apply the Standard Refactor Recipe** to each util file. For utils the relevant recipe steps are: style (1), comments (3), atomicity/naming (4), and **JSDoc on every exported function (6)**. No composable extraction here.

Example JSDoc shape to apply to each exported function:
```ts
/**
 * Copy a string to the clipboard, falling back to a hidden textarea
 * when the async Clipboard API is unavailable.
 *
 * @param text - The text to copy.
 * @returns A promise resolving once the copy completes.
 */
export async function copyToClipboard(text: string): Promise<void> { /* ... */ }
```

- [ ] **Step 2: Verify**

Run: `yarn lint && yarn test:unit && yarn build:lib`
Expected: all pass (utils specs especially).

- [ ] **Step 3: Commit**

```bash
git add lib/utils
git commit -m "refactor(utils): apply style, prune comments, add JSDoc

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

### Task 0.3: Refactor `lib/directives/EllipsisTooltip.ts`

**Files:**
- Modify: `lib/directives/EllipsisTooltip.ts`

- [ ] **Step 1: Apply recipe** steps 1, 3, 4, 6 (style, comments, atomicity, JSDoc on exported members).
- [ ] **Step 2: Verify** — `yarn lint && yarn test:unit && yarn build:lib` → all pass.
- [ ] **Step 3: Commit**

```bash
git add lib/directives/EllipsisTooltip.ts
git commit -m "refactor(directives): style + JSDoc EllipsisTooltip

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

### Task 0.4: Refactor the 5 existing composables

**Files:**
- Modify: `lib/composables/useChart.ts`, `useColorMode.ts`, `useQueryObserver.ts`, `useResizeObserver.ts`, `useSendEmail.ts`
- Test: `tests/unit/composables/` (create dir if a composable gains testable extracted logic)

- [ ] **Step 1: Apply recipe** steps 1, 3, 4, 6 to each. Add full JSDoc (summary, `@param`, `@returns`, `@example`) to each composable's public function. Preserve the existing good "why" comment in `useResizeObserver.ts`.
- [ ] **Step 2: Verify** — `yarn lint && yarn test:unit && yarn build:lib` → all pass.
- [ ] **Step 3: Commit**

```bash
git add lib/composables
git commit -m "refactor(composables): style, prune comments, add JSDoc

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Wave 1 — Simple components

Each task below applies the **Standard Refactor Recipe** (all 6 steps) to the
listed `.vue` files, with the named extraction candidates. After edits, run the
verification gate and commit. Extraction candidates are starting points — extract
more if the recipe's step 5 reveals other non-trivial reactive logic.

### Task 1.1: Accordion

**Files:** `lib/components/Accordion/AccordionStep.vue`, `AccordionWrapper.vue`
**Extraction candidates:** open/active-step state management → `useAccordion` (internal unless useful to consumers).

- [ ] **Step 1:** Apply recipe (all 6 steps) to both files; extract `useAccordion` if the wrapper holds non-trivial step state.
- [ ] **Step 2: Verify** — `yarn lint && yarn test:unit && yarn build:lib` → all pass.
- [ ] **Step 3: Commit** — `git add lib/components/Accordion lib/composables && git commit -m "refactor(accordion): recipe pass + extract useAccordion"` (drop the composable path if none extracted; add the Co-Authored-By trailer).

### Task 1.2: ActiveTextTruncate

**Files:** `lib/components/ActiveTextTruncate/ActiveTextTruncate.vue`
**Extraction candidates:** resize-driven truncation measurement → `useActiveTextTruncate` (reuses `useResizeObserver`).

- [ ] **Step 1:** Apply recipe (all 6 steps); extract measurement/truncation logic into a composable.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — `git add` touched paths, message `refactor(active-text-truncate): recipe pass + extract composable` + trailer.

### Task 1.3: Brand

**Files:** `lib/components/Brand/Brand.vue`, `BrandExpansion.vue`
**Extraction candidates:** expansion animation/timing state → `useBrandExpansion`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to both files.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(brand): recipe pass + extract composable` + trailer.

### Task 1.4: Button

**Files:** `lib/components/Button/ButtonIcon.vue`, `ButtonIconCounter.vue`, `ButtonConfirm.vue`
**Extraction candidates:** confirm-countdown/hold state in `ButtonConfirm` → `useConfirmButton`; counter formatting in `ButtonIconCounter`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to all three files.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(button): recipe pass + extract useConfirmButton` + trailer.

### Task 1.5: HapticCopy

**Files:** `lib/components/HapticCopy/HapticCopy.vue`
**Extraction candidates:** copy + transient "copied!" feedback state → `useHapticCopy` (wraps `utils/clipboard`). Likely consumer-useful → export.

- [ ] **Step 1:** Apply recipe (all 6 steps); extract `useHapticCopy` and export it from `lib/main.ts`.
- [ ] **Step 2: Verify** — gate passes; confirm `lib/main.ts` only *adds* the export.
- [ ] **Step 3: Commit** — message `refactor(haptic-copy): extract + export useHapticCopy` + trailer.

### Task 1.6: SlideUpDown

**Files:** `lib/components/SlideUpDown/SlideUpDown.vue`
**Extraction candidates:** height transition logic → `useSlideUpDown` (wraps `utils/animation`).

- [ ] **Step 1:** Apply recipe (all 6 steps); extract transition logic.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(slide-up-down): recipe pass + extract composable` + trailer.

### Task 1.7: ImageMode

**Files:** `lib/components/ImageMode/ImageMode.vue`, `ImageModeSource.vue`
**Extraction candidates:** color-mode-driven source selection → `useImageMode` (wraps `useColorMode`).

- [ ] **Step 1:** Apply recipe (all 6 steps) to both files.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(image-mode): recipe pass + extract composable` + trailer.

### Task 1.8: ContentPlaceholder

**Files:** `lib/components/ContentPlaceholder/ContentPlaceholder.vue`
**Extraction candidates:** placeholder geometry generation (wraps `utils/placeholder`) → `useContentPlaceholder`.

- [ ] **Step 1:** Apply recipe (all 6 steps).
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(content-placeholder): recipe pass` + trailer.

### Task 1.9: ResponsiveIframe

**Files:** `lib/components/ResponsiveIframe/ResponsiveIframe.vue`
**Extraction candidates:** iframe resize messaging (wraps `utils/iframe-resizer`) → `useResponsiveIframe`.

- [ ] **Step 1:** Apply recipe (all 6 steps).
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(responsive-iframe): recipe pass + extract composable` + trailer.

### Task 1.10: TexturedDeck

**Files:** `lib/components/TexturedDeck/TexturedDeck.vue`
**Extraction candidates:** texture/background computed logic if non-trivial.

- [ ] **Step 1:** Apply recipe (all 6 steps).
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(textured-deck): recipe pass` + trailer.

### Task 1.11: Legend

**Files:** `lib/components/Legend/LegendOrdinal.vue`, `LegendScale.vue`
**Extraction candidates:** scale/ordinal computation shared between the two → `useLegend`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to both; extract shared legend logic into `useLegend`.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(legend): recipe pass + extract useLegend` + trailer.

### Task 1.12: SharingOptions

**Files:** `lib/components/SharingOptions/SharingOptions.vue`, `SharingOptionsLink.vue`
**Extraction candidates:** share-URL/network link building → `useSharingOptions`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to both files.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(sharing-options): recipe pass + extract composable` + trailer.

### Task 1.13: FollowUsPopover

**Files:** `lib/components/FollowUsPopover/FollowUsPopover.vue`
**Extraction candidates:** floating-ui popover state (wraps `utils/floatingUi`) → `useFollowUsPopover`.

- [ ] **Step 1:** Apply recipe (all 6 steps).
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(follow-us-popover): recipe pass + extract composable` + trailer.

### Task 1.14: EmbeddableFooter

**Files:** `lib/components/EmbeddableFooter/EmbeddableFooter.vue`
**Extraction candidates:** embed/resize state (wraps `useResizeObserver`/`utils/iframe-resizer`) → `useEmbeddableFooter`.

- [ ] **Step 1:** Apply recipe (all 6 steps).
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(embeddable-footer): recipe pass + extract composable` + trailer.

---

## Wave 2 — Complex components

### Task 2.1: PaginationTiny (straggler → script setup)

**Files:** `lib/components/Pagination/PaginationTiny.vue` (496 lines)
**Extraction candidates:** page-range/window computation → `usePagination` (shared with `Pagination.vue`).

- [ ] **Step 1: Convert to `<script setup lang="ts">`.** Preserve every prop, emit, and slot exactly (public API). Move Options-API `data`/`computed`/`methods` into refs/computeds/functions.
- [ ] **Step 2: Apply recipe** steps 1–6; extract page-range math into `usePagination`.
- [ ] **Step 3: Verify** — `yarn lint && yarn test:unit && yarn build:lib` → all pass. Open the Pagination story in `yarn storybook` if any doubt about behavior.
- [ ] **Step 4: Commit** — `git add lib/components/Pagination lib/composables` message `refactor(pagination): convert PaginationTiny to script setup + extract usePagination` + trailer.

### Task 2.2: Pagination

**Files:** `lib/components/Pagination/Pagination.vue`
**Extraction candidates:** reuse `usePagination` from Task 2.1.

- [ ] **Step 1:** Apply recipe (all 6 steps); replace inline page math with `usePagination`.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(pagination): reuse usePagination in Pagination` + trailer.

### Task 2.3: FormControl group

**Files:** `lib/components/Form/FormControl/FormControlDigits.vue`, `FormControlRange.vue`, `FormControlSecret.vue`, `FormControlSelectableDropdown.vue`
**Extraction candidates:** `v-model` plumbing → `useVModel`-style wrapper (or `@vueuse/core`'s `useVModel`); range thumb math → `useRangeControl`; dropdown open/selection → `useSelectableDropdown`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to each file, one at a time, verifying between files if cautious.
- [ ] **Step 2: Verify** — gate passes after all four.
- [ ] **Step 3: Commit** — message `refactor(form-control): recipe pass + extract control composables` + trailer.

### Task 2.4: FormAdvancedLink (straggler → script setup)

**Files:** `lib/components/Form/FormAdvancedLink/FormAdvancedLink.vue`, `FormAdvancedLinkTab.vue`
**Extraction candidates:** active-tab state → `useTabs`/`useAdvancedLink`.

- [ ] **Step 1: Convert `FormAdvancedLink.vue` to `<script setup lang="ts">`**, preserving all props/emits/slots.
- [ ] **Step 2:** Apply recipe (all 6 steps) to both files; extract tab state.
- [ ] **Step 3: Verify** — gate passes.
- [ ] **Step 4: Commit** — message `refactor(form-advanced-link): convert to script setup + extract tab composable` + trailer.

### Task 2.5: Form donate/embed/signup

**Files:** `lib/components/Form/FormDonate.vue`, `FormEmbed.vue`, `FormSignUp.vue`
**Extraction candidates:** donate amount/frequency state → `useDonateForm`; signup submission (wraps `useSendEmail`) → `useSignUpForm`; embed snippet generation → `useEmbedForm`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to each, one at a time.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(form): recipe pass + extract form composables` + trailer.

### Task 2.6: App

**Files:** `lib/components/App/AppHeader.vue`, `AppFooter.vue`, `AppIcon.vue`, `AppIconLayers.vue`
**Extraction candidates:** header scroll/responsive state → `useAppHeader`; icon resolution/layer composition → `useAppIcon`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to each, one at a time.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(app): recipe pass + extract app composables` + trailer.

---

## Wave 3 — datavisualisations + maps

These share `useChart`. Prefer extending/reusing `useChart` and extracting
chart-specific composables over duplicating logic.

### Task 3.1: useChart hardening

**Files:** `lib/composables/useChart.ts`
**Extraction candidates:** split any multi-purpose helpers (scales, axes, dimensions) into focused composables (`useChartDimensions`, `useChartScales`) if `useChart` is doing too much.

- [ ] **Step 1:** Apply recipe steps 1, 3, 4, 6; split oversized helpers into focused composables, re-composed inside `useChart`.
- [ ] **Step 2: Verify** — `yarn lint && yarn test:unit && yarn build:lib` → all pass (datavis specs depend on this).
- [ ] **Step 3: Commit** — message `refactor(use-chart): split into focused chart composables` + trailer.

### Task 3.2: BarChart + ColumnChart

**Files:** `lib/datavisualisations/BarChart/BarChart.vue`, `lib/datavisualisations/ColumnChart/ColumnChart.vue`

- [ ] **Step 1:** Apply recipe (all 6 steps) to both; route shared logic through the Task 3.1 composables.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(datavis): recipe pass on Bar/Column charts` + trailer.

### Task 3.3: StackedBarChart + StackedColumnChart

**Files:** `lib/datavisualisations/StackedBarChart/StackedBarChart.vue`, `lib/datavisualisations/StackedColumnChart/StackedColumnChart.vue`
**Test:** `tests/unit/datavisualisations/StackedColumnChart/StackedColumnChart.spec.js` must stay green.

- [ ] **Step 1:** Apply recipe (all 6 steps) to both.
- [ ] **Step 2: Verify** — gate passes (watch the StackedColumnChart spec).
- [ ] **Step 3: Commit** — message `refactor(datavis): recipe pass on stacked charts` + trailer.

### Task 3.4: LineChart

**Files:** `lib/datavisualisations/LineChart/LineChart.vue`

- [ ] **Step 1:** Apply recipe (all 6 steps).
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(datavis): recipe pass on LineChart` + trailer.

### Task 3.5: ChoroplethMap

**Files:** `lib/maps/ChoroplethMap/ChoroplethMap.vue`, `ChoroplethMapAnnotation.vue`
**Test:** `tests/unit/maps/ChoroplethMap/ChoroplethMap.spec.ts`, `ChoroplethMapAnnotation.spec.ts` must stay green.
**Extraction candidates:** topojson projection/scale setup → `useChoropleth`/`useMapProjection`.

- [ ] **Step 1:** Apply recipe (all 6 steps) to both files.
- [ ] **Step 2: Verify** — gate passes (watch both map specs).
- [ ] **Step 3: Commit** — message `refactor(maps): recipe pass + extract map projection composable` + trailer.

### Task 3.6: SymbolMap

**Files:** `lib/maps/SymbolMap/SymbolMap.vue`
**Test:** `tests/unit/maps/SymbolMap/SymbolMap.spec.ts` must stay green.

- [ ] **Step 1:** Apply recipe (all 6 steps); reuse the Task 3.5 projection composable.
- [ ] **Step 2: Verify** — gate passes.
- [ ] **Step 3: Commit** — message `refactor(maps): recipe pass on SymbolMap` + trailer.

---

## Wave 4 — Stories conformance + final validation

### Task 4.1: CSF3 story audit

**Files:** all 43 `stories/**/*.stories.{ts,js}`

- [ ] **Step 1: Apply `/pirhoo-style`** to each story file and confirm CSF3 shape: a default export `Meta` (typed `satisfies Meta<typeof Component>` or `Meta<typeof Component>`) and named `StoryObj` exports — no legacy `Template.bind({})` patterns. Migrate the one `.js` story (`stories/murmur/directives/EllipsisTooltip.stories.js`) to TS if trivially safe; otherwise leave it and note why.
- [ ] **Step 2: Verify** — `yarn build:storybook`
  Expected: Storybook builds with no new errors.
- [ ] **Step 3: Commit** — `git add stories && git commit -m "refactor(stories): normalize to CSF3 + style"` + trailer.

### Task 4.2: Final full validation & API guard

**Files:** none (verification only)

- [ ] **Step 1: Full gate**

Run: `yarn lint && yarn test:unit && yarn build:lib && yarn build:storybook`
Expected: all pass.

- [ ] **Step 2: Public-API diff**

Run:
```bash
grep -nE 'export' lib/main.ts > /tmp/api-after.txt
diff /tmp/api-before.txt /tmp/api-after.txt
```
Expected: only *added* lines (new composable exports). Any removed or changed export is a regression — fix before finishing.

- [ ] **Step 3: Request code review** via `superpowers:requesting-code-review`, then proceed to branch finishing (`superpowers:finishing-a-development-branch`).

---

## Notes for the executor

- Work one task at a time; never batch across the verification gate.
- If `/vue-best-practices` suggests a change that would alter a prop/event/slot,
  **do not make it** — log it as a follow-up instead. Public API is frozen.
- Extraction candidates are *starting points*. The recipe's step 5 is the real
  driver: extract whatever non-trivial reactive logic you find.
- If a wave's verification gate fails and the cause is a pre-existing flaky/broken
  test (not your change), stop and report rather than papering over it.
