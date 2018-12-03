const vueDocs = require('vue-docgen-api')

module.exports = function vueDocgenLoader(source) {
  try {
    const json = JSON.stringify(vueDocs.parse(this.resourcePath), null, 2)
    return `module.exports = ${json}`
  } catch (e) {
    this.emitWarning(e)
    return 'module.exports = { "props": {}, "slos": {}, "events": {}, "methods": {} }'
  }
};
