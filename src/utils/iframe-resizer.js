import every from 'lodash/every'
import { injectAssets } from './assets'
// Will hold the pym instance once
var pymChild = null
// URL parameters generated by Pym
const pymParams = ['initialWidth', 'childId', 'parentUrl', 'parentTitle']

export default class IframeResizer {
  constructor () {
    this.initializer = injectAssets('//pym.nprapps.org/pym.v1.min.js').then(() => {
      pymChild = pymChild || new window.pym.Child({ polling: 300 })
      return pymChild
    })
    return this.initializer
  }
  sendHeight () {
    this.initializer.then(pymChild => pymChild.sendHeight())
  }
  static create () {
    return new IframeResizer()
  }
  static template(url, id = 'icij-' + Date.now().toString(32)) {
    return [
      `<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>`,
      `<div id="${id}"></div>`,
      `<script>`,
      `var icijIframe = new pym.Parent("${id}", "${IframeResizer.deletePymParams(url)}", {})`,
      `</script>`,
    ].join('\n')
  }
  static deletePymParams(href = window.location.href) {
    const url = new URL(href);
    // Remove all unwanted param
    for (let param of pymParams) url.searchParams.delete(param);
    // Rebuild the URL
    return url.href
  }
  static isEmbedded (href = window.location.href) {
    const url = new URL(href);
    return every(pymParams, param => url.searchParams.has(param))
  }
}
