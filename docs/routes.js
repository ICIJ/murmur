import { dirname } from 'path-browserify'
import filter from 'lodash/filter'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export const ROUTE_SECTIONS = ['getting-started', 'visual', 'structure',
  'components', 'datavisualisation', 'maps', 'utilities']

const docPaths = import.meta.glob(`./pages/**/*/doc.md`)

export function loadDoc(section, name) {
  return docPaths[`./pages/${section}/${name}/doc.md`]
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
  // Collect doc.vue/md file paths
  const docPaths = import.meta.glob(`./pages/**/*/doc.md`, { eager: true, as: 'front-matter' })
  const paths = Object.keys(docPaths)
  // Create an arry of routes for the components for the given section
  filter(paths, (p) => p.indexOf(`./pages/${section}`) === 0).forEach(path => {
    const name = dirname(path).split('/').pop()
    // Add the route to the list
    pushRouteOnce({
      name,
      path: `/${section}/${name}`,
      meta: {
        section,
        // We load metadata from the document using front-matter
        ...docPaths[path].default
      },
      // Webpack requires to write the file name explicitly in order to create chunks
      component: loadDoc(section, name)
    })
  })
})

export default routes;
