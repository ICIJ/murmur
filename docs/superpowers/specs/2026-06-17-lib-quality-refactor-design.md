# Library-wide quality refactor — design

Date: 2026-06-17
Branch: `refactor/style-harmonization`
Status: Approved

## Goal

A single-branch, behavior-preserving quality pass over the entire `lib/` of
`@icij/murmur-next`. The library is published (v4.10.1), so the work raises code
quality without changing observable behavior or the public API.

## Findings (baseline)

The "harmonization" goals are almost entirely already done:

- 42 of 44 components already use `<script setup lang="ts">`. Only two
  stragglers remain: `lib/components/Form/FormAdvancedLink/FormAdvancedLink.vue`
  and `lib/components/Pagination/PaginationTiny.vue`.
- All 43 stories already use typed CSF (`Meta` / `StoryObj`) — effectively CSF3.
- Only 5 composables exist: `useChart`, `useColorMode`, `useQueryObserver`,
  `useResizeObserver`, `useSendEmail`.
- JSDoc is almost entirely absent: only `useChart.ts` has any; 11 of 12
  composable/util files have none.
- ~265 line-comments across `lib/` to audit. Some are good "why" comments and
  must be kept (e.g. the resize-debounce rationale in `useResizeObserver.ts`).

So the real work is the deeper-quality goals, which touch nearly every file.

## The eight goals → concrete scope

| Goal | Concrete scope |
|------|----------------|
| script-setup harmonization | Convert the 2 stragglers to `<script setup lang="ts">` |
| CSF3 stories | Audit all 43; normalize any deviating from `Meta`/`StoryObj` CSF3 |
| `/pirhoo-style` | Apply across every `.ts` / `.vue` / `.stories.ts` |
| Dead comment removal | Audit ~265 comments; delete stale/obvious; KEEP "why" comments |
| JSDoc | Every composable + every exported util function |
| Atomicity / naming | Split fat functions, rename unclear ones (guided by `/pirhoo-style`) |
| `/vue-best-practices` | Review each component against the skill; fix findings |
| Aggressive composable extraction | Pull non-trivial reactive/stateful logic out of components into `lib/composables`, even single-use, to thin component scripts |

## Hard constraints

1. **No public API breaks.** Exported component names, props, events, slots, and
   existing module exports stay stable. SemVer-published package. New composables
   may be *added* to exports.
2. **Behavior-preserving.** Verified by the existing 42 specs + both builds +
   Storybook. No intentional behavior changes.
3. **Authority order.** `/vue-best-practices` and `/pirhoo-style` govern. Where
   they conflict, `/pirhoo-style` wins (user's personal style).

## Composable extraction policy

- Aggressive: extract non-trivial reactive/stateful logic out of components,
  even when single-use, to thin component scripts.
- Each extracted composable gets JSDoc.
- **Export policy:** broadly-useful composables are added to the public exports
  (`lib/main.ts` and the ESM entry). Purely-internal single-use composables live
  in `lib/composables/` but stay unexported, to avoid bloating the published API.
- Naming follows the existing `useXxx` convention.
- Where a composable owns testable logic, add a colocated unit test.

## Execution waves (one branch)

Each wave must end green: `yarn lint && yarn test:unit && yarn build:lib`.

- **Wave 0 — Foundations.** JSDoc + style pass on all `composables/` + `utils/`.
  Establish extraction conventions and the `/pirhoo-style` baseline.
- **Wave 1 — Simple components.** Accordion, Brand, Button, HapticCopy,
  SlideUpDown, ImageMode, ActiveTextTruncate, ContentPlaceholder,
  ResponsiveIframe, TexturedDeck, Legend, SharingOptions, FollowUsPopover,
  EmbeddableFooter.
- **Wave 2 — Complex components.** `App/`, `Form/` (incl. the 2 stragglers),
  `Pagination/`.
- **Wave 3 — datavisualisations/ + maps/.** The `useChart`-heavy area.
- **Wave 4 — Stories CSF3 conformance + final full validation**
  (`yarn lint && yarn test:unit && yarn build:lib && yarn build:storybook`).

## Validation

- `yarn lint` — zero new errors.
- `yarn test:unit` — all 42 specs pass; new composable tests pass.
- `yarn build:lib` — UMD + ESM builds succeed.
- `yarn build:storybook` — Storybook builds (final wave).
- Spot-check public API surface (`lib/main.ts` exports) unchanged before/after.

## Out of scope

- New features or visual/behavioral changes.
- Dependency upgrades.
- Renaming public components, props, events, or slots.
- Test-framework migration (Vitest stays).
