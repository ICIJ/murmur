import Vue from 'vue'
import VueI18n from 'vue-i18n'

if (!Vue.prototype.hasOwnProperty('$i18n')) {
  Vue.use(VueI18n)
}

export const locale: string = 'en'
export const fallbackLocale: string = 'en'

export default new VueI18n({
  locale,
  fallbackLocale,
  messages: {
    fr: require('@/locales/fr.json'),
    en: require('@/locales/en.json')
  }
})
