const container = require('markdown-it-container')

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
