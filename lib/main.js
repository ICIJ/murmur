import VueI18n from 'vue-i18n'
import { basename, extname } from 'path'

import i18n from './i18n'
export { default as config } from './config'
export { default as ContentPlaceholder } from './components/ContentPlaceholder.vue'
export { default as DonateForm } from './components/DonateForm.vue'
export { default as EmbeddableFooter } from './components/EmbeddableFooter.vue'
export { default as EmbedForm } from './components/EmbedForm.vue'
export { default as FollowUsPopover } from './components/FollowUsPopover.vue'
export { default as Fa } from './components/Fa'
export { default as GenericFooter } from './components/GenericFooter.vue'
export { default as ImddbHeader } from './components/ImddbHeader.vue'
export { default as ResponsiveIframe } from './components/ResponsiveIframe.vue'
export { default as SharingOptions } from './components/SharingOptions.vue'
export { default as SignUpForm } from './components/SignUpForm.vue'
export { default as SlideUpDown } from './components/SlideUpDown.vue'

import * as components from './components'

class Murmur {
  static setLocaleMessage(lang, message) {
    return this.i18n.setLocaleMessage(lang, message)
  }
  static mergeLocaleMessage(lang, message) {
    return this.i18n. mergeLocaleMessage(lang, message)
  }
  static setLocale(lang) {
    return this.i18n.locale = lang
  }
  static getLocale() {
    return this.i18n.locale
  }
  static get i18n() {
    return i18n
  }
  static get config() {
    return require('./config.js').default
  }
  static get components() {
    return components
  }
  static install (Vue, options) {
    Object.keys(components).forEach(key => Vue.component(key, components[key]))
  }
}

export default Murmur
