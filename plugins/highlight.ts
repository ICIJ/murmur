import { promises as fs } from 'fs'
import url from 'url'
import hljs from 'highlight.js'

interface ReturnValue {
  code?: string
}

export default function () {
  return {
    enforce: 'post',
    name: 'vite-plugin-highlight',
    async transform(_: string, id: string): Promise<ReturnValue> {
      const parsedId = url.parse(id, true)
      const isHighlight = 'highlight' in parsedId.query

      if (!isHighlight || !parsedId.pathname) {
        return {}
      }

      const raw = await fs.readFile(parsedId.pathname, 'utf8')
      const language = String(parsedId.query.highlight)
      const { value } = hljs.getLanguage(language) ? hljs.highlight(raw, { language }) : hljs.highlightAuto(raw)
      const buff = Buffer.from(JSON.stringify(value))
      const code = `export default ${buff}`
      return { code }
    }
  }
}