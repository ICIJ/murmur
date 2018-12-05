import { dirname } from 'path'
import filter from 'lodash/filter'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export const ROUTE_SECTIONS = ['getting-started', 'visual', 'structure', 'components', 'datavisualisation', 'utilities']

export function loadDoc(section, name) {
  return () => import(/* webpackChunkName: "[request]" */ `./${section}/${name}/doc`)
}

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


var routes = [
  {
    path: '/',
    redirect: '/getting-started/installation-guide'
  }
]

ROUTE_SECTIONS.forEach(section => {
  // Collect doc.vue file paths
  const paths = require.context('./', true, /doc\./, 'lazy').keys()
  // Create an arry of routes for the components for the given section
  filter(paths, (p) => p.indexOf(`./${section}`) === 0).forEach(path => {
    const name = dirname(path).split('/').pop()
    // Add the route to the list
    pushRouteOnce({
      name,
      path: `/${section}/${name}`,
      meta: {
        section,
        // We load metadata from the document using front-matter
        ...require(`!!json-loader!metadata-loader!./${section}/${name}/doc`)
      },
      // Webpack requires to write the file name explicitly in order to create chunks
      component: loadDoc(section, name)
    })
  })
})

export default routes;
