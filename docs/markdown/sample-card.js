const hljs = require('highlight.js');
const container = require('markdown-it-container')
const escape = require('lodash/escape')

module.exports = function (name) {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const language = tokens[idx].info.slice(name.length + 1).trim() || 'html'
        const code = hljs.highlight(tokens[idx + 1].content, { language })
        return `<sample-card lang="${language}" code="${escape(tokens[idx + 1].content)}">
          <template slot="code">
            <pre><code class="${language}">${code.value}</code></pre>
          </template>
          <template>
            <div>`
      } else {
        return `</div></template></sample-card>\n`
      }
    }
  }]
}
