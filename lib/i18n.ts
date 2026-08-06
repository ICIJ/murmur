import { createI18n } from 'vue-i18n'

import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

export const locale = 'en'
export const fallbackLocale = 'en'
export const options = {
  warnHtmlMessage: false,
  // https://vue-i18n.intlify.dev/guide/advanced/composition.html#implicit-with-injected-properties-and-functions
  globalInjection: true,
  // createI18n()'s overload resolution keys off the literal `false`, not `boolean`,
  // to pick the Composition API mode; without `as const` it widens and falls back
  // to the legacy-mode overload.
  legacy: false as const,
  locale,
  fallbackLocale,
  messages: { fr, en }
}
export const i18n = createI18n(options)
