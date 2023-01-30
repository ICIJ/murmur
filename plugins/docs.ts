import frontMatter from 'front-matter'
import glob from 'fast-glob'
import { promises as fs } from 'fs'
import { dirname } from 'path'
import sortBy from 'lodash/sortBy'

export const ROUTE_SECTIONS = [
  'getting-started',
  'visual',
  'structure',
  'components',
  'datavisualisation',
  'maps',
  'utilities'
]
  
export default function myPlugin() {
  const virtualModuleId = 'virtual:docs'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const routes: object[] = []
        const pages = await glob('./docs/pages/**/*.md')

        for (const page of pages) {
          const name = dirname(page).split('/').pop()
          const section = dirname(page).split('/').slice(0, -1).pop()
          const sectionId = ROUTE_SECTIONS.indexOf(<string>section)
          const path = `/${section}/${name}`
          const md = await fs.readFile(page, 'utf8')
          const { attributes: frontMatterMeta } = <any>frontMatter(md)
          const meta = { section, sectionId, order: 1, ...frontMatterMeta}
          routes.push({ name, path, meta })
        }

        const sortedRoutes = sortBy(routes, ['meta.sectionId', 'meta.order'])

        return `export default ${JSON.stringify(sortedRoutes)}`
      }
    }
  }
}
