import { dirname } from 'path'
import filter from 'lodash/filter'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export const ROUTE_SECTIONS = ['getting-started', 'visual', 'structure', 'components', 'datavisualisation', 'utilities']

var routes = [
  {
    path: '/',
    redirect: '/getting-started/installation-guide'
  },
  {
    path: '/visual/states',
    name: 'states',
    meta: { section: 'visual' },
  },
  {
    path: '/visual/typography',
    name: 'typography',
    meta: { section: 'visual' },
  },
  {
    path: '/visual/iconography',
    name: 'iconography',
    meta: { section: 'visual' },
  },
  {
    path: '/visual/themes',
    name: 'themes',
    meta: { section: 'visual' },
  },
  {
    path: '/structure/grid',
    name: 'grid',
    meta: { section: 'structure' },
  },
  {
    path: '/structure/breakpoints',
    name: `breakpoints`,
    meta: { section: 'structure' },
  },
  {
    path: '/visual/spacing',
    name: 'spacing',
    meta: { section: 'structure' },
  },
  {
    path: '/datavisualisation/columns',
    meta: { section: 'datavisualisation' },
    name: 'columns'
  },
  {
    path: '/datavisualisation/bars',
    meta: { section: 'datavisualisation' },
    name: 'bars'
  },
  {
    path: '/datavisualisation/lines',
    meta: { section: 'datavisualisation' },
    name: 'lines'
  },
  {
    path: '/datavisualisation/stacked',
    meta: { section: 'datavisualisation' },
    name: 'stacked'
  },
  {
    path: '/utilities/config',
    meta: { section: 'utilities' },
    name: 'config'
  },
  {
    path: '/utilities/iframes',
    meta: { section: 'utilities' },
    name: 'iframes'
  },
  {
    path: '/utilities/assets',
    meta: { section: 'utilities' },
    name: 'assets'
  }
]

ROUTE_SECTIONS.forEach(section => {
  // Collect doc.vue file paths
  const paths = require.context('./', true, /doc\./).keys()
  // Create an arry of routes for the components for the given section
  filter(paths, (p) => p.indexOf(`./${section}`) === 0).forEach(path => {
    const name = dirname(path).split('/').pop()
    // Add the route to the list
    pushRouteOnce({
      name,
      path: `/${section}/${name}`,
      // Webpack requires to write the file name explicitly in order to create chunks
      meta: {
        section,
        // We load metadata from the document using front-matter
        ...require(`!!json-loader!metadata-loader!./${section}/${name}/doc`)
      },
      component: () => import(/* webpackChunkName: "[request]" */ `./${section}/${name}/doc`)
    })
  })
})

export function sortRoutes() {
  routes = sortBy(routes, (r) => get(r, 'meta.order', 1))
  return routes
}

export function pushRouteOnce(route, predicate = { name: route.name }) {
  if (filterRoutes(predicate).length === 0) {
    routes.push(route)
    // Sort routes again
    sortRoutes()
  }
}

export function filterRoutes(predicate = {}) {
  return filter(routes, predicate)
}

export default routes;
