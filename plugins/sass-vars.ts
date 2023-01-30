import { promises as fs } from 'fs'
import url from 'url'
import getSassVars from 'get-sass-vars'

interface ReturnValue {
  code?: string|object
}

export default function () {
  return {
    enforce: 'post',
    name: 'vite-plugin-sass-vars',
    async transform(_: string, id: string): Promise<ReturnValue> {
      const parsedId = url.parse(id, true)
      const isSassVars = 'sass-vars' in parsedId.query

      if (!isSassVars || !parsedId.pathname) {
        return {}
      }
      const raw = await fs.readFile(parsedId.pathname, 'utf-8')
      const vars = await getSassVars(raw)
      const json = JSON.stringify(vars, null, 2)
      const code = `export default ${json}` 
      return { code }
    }
  }
}