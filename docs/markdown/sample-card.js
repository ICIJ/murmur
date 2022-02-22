const hljs = require('highlight.js');
const container = require('markdown-it-container')
const escape = require('lodash/escape')

module.exports = function (name) {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const language = tokens[idx].info.slice(name.length + 1).trim() || 'html'
        const rawCode = tokens[idx + 1].content
        const code = hljs.highlight(rawCode, { language })
        const sanitizedCode = code.value.replace(/{{/, '{<span></span>{')
        return `<sample-card lang="${language}">
          <template slot="code">
            <pre><code class="${language}">${sanitizedCode}</code></pre>
          </template>
          <template>
            <div>`
      } else {
        return `</div></template></sample-card>\n`
      }
    }
  }]
}
