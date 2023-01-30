import hljs from 'highlight.js'
import container from 'markdown-it-container'

export default function (name = 'sample-card') {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const language = tokens[idx].info.slice(name.length + 1).trim() || 'html'
        const rawCode = tokens[idx + 1].content
        const code = hljs.highlight(rawCode, { language })
        const sanitizedCode = code.value.replace(/{{/, '{<span></span>{')
        return `<div class="d-flex flex-column-reverse">
        <sample-card lang="${language}">
          <template slot="code">
            <pre><code class="${language}">${sanitizedCode}</code></pre>
          </template>
        </sample-card>
        <div class="border bg-light">`
      } else {
        return `</div></div>`
      }
    }
  }]
}
