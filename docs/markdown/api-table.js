const container = require('markdown-it-container')
const vueDocs = require('vue-docgen-api')
const escape = require('lodash/escape')

module.exports = function (name) {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const path = tokens[idx].info.slice(name.length + 1).trim().match(/(.*\.vue)/);
        const api = escape(JSON.stringify(vueDocs.parse(path[1]), null, 2))
        return `<api-table api="${api}">`
      } else {
        return `</api-table>\n`
      }
    }
  }]
}
