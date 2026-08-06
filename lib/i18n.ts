import { createI18n } from 'vue-i18n'

import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

export const locale = 'en'
export const fallbackLocale = 'en'
export const options = {
  warnHtmlMessage: false,
  // https://vue-i18n.intlify.dev/guide/advanced/composition.html#implicit-with-injected-properties-and-functions
  globalInjection: true,
  legacy: false as const,
  locale,
  fallbackLocale,
  messages: { fr, en }
}
export const i18n = createI18n(options)
