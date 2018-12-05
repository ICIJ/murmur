import { basename, extname } from 'path'
export { default as config } from './config'
export { default as ContentPlaceholder } from './components/ContentPlaceholder.vue'
export { default as DonateForm } from './components/DonateForm.vue'
export { default as EmbedableFooter } from './components/EmbedableFooter.vue'
export { default as EmbedForm } from './components/EmbedForm.vue'
export { default as FollowUsPopover } from './components/FollowUsPopover.vue'
export { default as FontAwesomeIcon } from './components/Fa'
export { default as GenericFooter } from './components/GenericFooter.vue'
export { default as MainHeader } from './components/MainHeader.vue'
export { default as ResponsiveIframe } from './components/ResponsiveIframe.vue'
export { default as SharingOptions } from './components/SharingOptions.vue'
export { default as SignUpForm } from './components/SignUpForm.vue'
export { default as SlideUpDown } from './components/SlideUpDown.vue'

class Collection {
  static get config() {
    return require('./config.js').default
  }
  static get components() {
    const context = require.context("./components/", true, /\.(js)|(vue)$/, 'lazy');
    return context.keys().reduce((components, path) => {
      const name = basename(path, extname(path))
      const filename = basename(path)
      components[name] = () => import(`./components/${filename}`);
      return components
    }, {});
  }
  static install (Vue, options) {
    const components = Collection.components
    Object.keys(components).forEach(key => Vue.component(key, components[key]))
  }
}

export default Collection
