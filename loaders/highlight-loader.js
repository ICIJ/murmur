const hljs = require('highlight.js')
const loaderUtils = require('loader-utils')

module.exports = function highlightLoader(source) {
  this && this.cacheable && this.cacheable()
  const query = loaderUtils.parseQuery(this.query || '?')
  const lang = query.lang
  const code = hljs.getLanguage(lang) ? hljs.highlight(lang, source) : hljs.highlightAuto(source)
  const json = JSON.stringify(code.value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `module.exports = ${json}`;
}
