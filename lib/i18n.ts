import { createI18n } from 'vue-i18n'

import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

// Declares en.json's shape as vue-i18n's global schema, so every useI18n()
// call (and $t in templates) is typed against it without a per-call generic.
declare module 'vue-i18n' {
  // Module augmentation requires an interface (not a type alias) to merge
  // with vue-i18n's own DefineLocaleMessage declaration.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends En {}
}
type En = typeof en

export const locale = 'en'
export const fallbackLocale = 'en'
export const options = {
  warnHtmlMessage: false,
  // https://vue-i18n.intlify.dev/guide/advanced/composition.html#implicit-with-injected-properties-and-functions
  globalInjection: true,
  legacy: false,
  locale,
  fallbackLocale,
  messages: { fr, en }
}
// Explicit `object` schema at this one call: fr.json doesn't mirror en.json
// key-for-key (real translation drift, e.g. it's missing advanced-link-form
// and custom-pagination entirely), so validating `messages` against the
// DefineLocaleMessage schema declared above would fail here. Consumption
// (useI18n(), $t) still resolves against that schema via its own default.
export const i18n = createI18n<object, 'en' | 'fr', false>(options)
