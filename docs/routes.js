import { dirname, extname } from 'path'
import filter from 'lodash/filter'

export const ROUTE_SECTIONS = ['components', 'visual', 'structure', 'dataVisualisation', 'utilities']

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: () => import(/* webpackChunkName: "home-page" */ './components/HomePage.vue')
  },
  {
    path: '/visual/colors',
    name: 'colors',
    section: 'visual',
    component: () => import(/* webpackChunkName: "colors" */ './visual/colors/doc.vue')
  },
  {
    path: '/visual/states',
    name: 'states',
    section: 'visual',
  },
  {
    path: '/visual/typography',
    name: 'typography',
    section: 'visual',
  },
  {
    path: '/visual/iconography',
    name: 'iconography',
    section: 'visual',
  },
  {
    path: '/visual/themes',
    name: 'themes',
    section: 'visual',
  },
  {
    path: '/structure/grid',
    name: 'grid',
    section: 'structure',
  },
  {
    path: '/structure/breakpoints',
    name: `breakpoints`,
    section: 'structure',
  },
  {
    path: '/visual/spacing',
    name: 'spacing',
    section: 'structure',
  },
  {
    path: '/datavisualisation/columns',
    section: 'datavisualisation',
    name: 'columns'
  },
  {
    path: '/datavisualisation/bars',
    section: 'datavisualisation',
    name: 'bars'
  },
  {
    path: '/datavisualisation/lines',
    section: 'datavisualisation',
    name: 'lines'
  },
  {
    path: '/datavisualisation/stacked',
    section: 'datavisualisation',
    name: 'stacked'
  },
  {
    path: '/utilities/config',
    section: 'utilities',
    name: 'config'
  },
  {
    path: '/utilities/iframes',
    section: 'utilities',
    name: 'iframes'
  },
  {
    path: '/utilities/assets',
    section: 'utilities',
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
      section,
      path: `/${section}/${name}`,
      component: () => {
        // Webpack requires to write the file name explicitly in order to create chunks
        if (extname(path) === '.md') {
          return import(/* webpackChunkName: "[request]" */ `./${section}/${name}/doc.md`)
        } else {
          return import(/* webpackChunkName: "[request]" */ `./${section}/${name}/doc`)
        }
      }
    })
  })
})

export function pushRouteOnce(route, predicate = { name: route.name }) {
  if (filterRoutes(predicate).length === 0) {
    routes.push(route)
  }
}

export function filterRoutes(predicate = {}) {
  return filter(routes, predicate)
}

export default routes;
