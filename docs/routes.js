export const visualRoutes = [
  {
    path: '/visual/colors',
    name: 'colors',
    component: () => import(/* webpackChunkName: "colors" */ './visual/colors/doc.vue')
  },
  {
    path: '/visual/states',
    name: 'states',
  },
  {
    path: '/visual/typography',
    name: 'typography',
  },
  {
    path: '/visual/iconography',
    name: 'iconography',
  },
  {
    path: '/visual/themes',
    name: 'themes',
  }
]

export const structureRoutes = [
  {
    path: '/structure/grid',
    name: 'grid',
  },
  {
    path: '/structure/breakpoints',
    name: `breakpoints`,
  },
  {
    path: '/visual/spacing',
    name: 'spacing',
  }
]

// Collect doc.vue file paths
const docs = require.context("./", true, /doc\.vue$/).keys()
// Create an arry of routes for the components
export const componentsRoutes = docs.map(path => {
  const name = path.split('/doc.vue').shift().split('./components/').pop()
  return {
    name,
    path: `/components/${name}`,
    component: () => import(/* webpackChunkName: "[request]" */ `${path}`)
  }
})


export const dataVisualisationRoutes = [
  {
    path: '/datavisualisation/columns',
    name: 'columns'
  },
  {
    path: '/datavisualisation/bars',
    name: 'bars'
  },
  {
    path: '/datavisualisation/lines',
    name: 'lines'
  },
  {
    path: '/datavisualisation/stacked',
    name: 'stacked'
  }
]

export const utilitiesRoutes = [
  {
    path: '/utilities/config',
    name: 'config'
  },
  {
    path: '/utilities/iframes',
    name: 'iframes'
  },
  {
    path: '/utilities/assets',
    name: 'Assets'
  }
]

export const mainRoutes = [
  {
    path: '/',
    name: 'home-page',
    component: () => import(/* webpackChunkName: "home-page" */ './components/HomePage.vue')
  }
]

let routes = []
routes = routes.concat(mainRoutes)
routes = routes.concat(visualRoutes)
routes = routes.concat(componentsRoutes)
routes = routes.concat(utilitiesRoutes)

export default routes;
