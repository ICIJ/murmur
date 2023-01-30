import { dirname, extname } from 'path'
import { promises as fs } from 'fs'
import frontMatter from 'front-matter'
import startCase from 'lodash/startCase'
import url from 'url'

interface ReturnValue {
  code?: string | object
}

export default function () {
  return {
    enforce: 'post',
    name: 'vite-plugin-front-matter',
    async transform(_: string, id: string): Promise<ReturnValue> {
      const parsedId = url.parse(id, true)
      const isFrontMatter = 'front-matter' in parsedId.query

      if (!isFrontMatter || !parsedId.pathname) {
        return {}
      }

      const title = startCase(dirname(parsedId.pathname).split('/').pop())
      
      let metadata = { title }
      
      if (extname(parsedId.pathname) === '.md') {
        const raw = await fs.readFile(parsedId.pathname, 'utf8')
        const { attributes: frontMatterMetadata } = <any>frontMatter(raw)
        metadata = { ...metadata, ...frontMatterMetadata }
      }

      const json = JSON.stringify(metadata, null, 2)
      const code = `export default ${json}`
      return { code }
    }
  }
}