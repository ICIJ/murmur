const container = require('markdown-it-container')
const escape = require('lodash/escape')

module.exports = function (name) {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const code = escape(tokens[idx + 1].content)
        return `<sample-card code="${code}"><template><div>\n`
      } else {
        return `</div></template></sample-card>\n`
      }
    }
  }]
}
