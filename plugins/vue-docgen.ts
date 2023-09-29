import url from 'url'
import vueDocs from 'vue-docgen-api'

import { MdPluginTypes, ReturnValue } from './MdPluginTypes'

export default function (): MdPluginTypes {
  return {
    enforce: 'post',
    name: 'vite-plugin-vue-docgen',
    async transform(_: string, id: string): Promise<ReturnValue> {
      const parsedId = url.parse(id, true)
      const isVueDocgen = 'vue-docgen' in parsedId.query

      if (!isVueDocgen || !parsedId.pathname) {
        return {}
      }

      try {
        const api = await vueDocs.parse(parsedId.pathname)
        const buff = Buffer.from(JSON.stringify(api))
        return { code: `export default ${buff}` }
      } catch (_) {
        const emptyApi = { props: {}, slots: {}, events: {}, methods: {} }
        const buff = JSON.stringify(emptyApi)
        return { code: `export default ${buff}` }
      }
    }
  }
}
