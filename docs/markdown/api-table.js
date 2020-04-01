const container = require('markdown-it-container')
const vueDocs = require('vue-docgen-api')
const { escape } = require('lodash')

module.exports = function (name) {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const path = tokens[idx].info.slice(name.length + 1).trim().match(/(.*\.vue)/)
        return `<api-table path="${path[1]}">`
      } else {
        return `</api-table>\n`
      }
    }
  }]
}
