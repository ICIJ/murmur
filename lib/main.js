import VueI18n from 'vue-i18n'
import { basename, extname } from 'path'

import i18n from './i18n'
export { default as config } from './config'
export { default as ContentPlaceholder } from './components/ContentPlaceholder.vue'
export { default as DonateForm } from './components/DonateForm.vue'
export { default as EmbedableFooter } from './components/EmbedableFooter.vue'
export { default as EmbedForm } from './components/EmbedForm.vue'
export { default as FollowUsPopover } from './components/FollowUsPopover.vue'
export { default as Fa } from './components/Fa'
export { default as GenericFooter } from './components/GenericFooter.vue'
export { default as MainHeader } from './components/MainHeader.vue'
export { default as ResponsiveIframe } from './components/ResponsiveIframe.vue'
export { default as SharingOptions } from './components/SharingOptions.vue'
export { default as SignUpForm } from './components/SignUpForm.vue'
export { default as SlideUpDown } from './components/SlideUpDown.vue'

import * as components from './components'

class Collection {
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

export default Collection
