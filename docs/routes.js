// Collect doc.vue file paths
const docs = require.context("./", true, /doc\.vue$/).keys()
// Create an arry of routes for the components
export const componentsRoutes = docs.map(path => {
  const name = path.split('/doc.vue').shift().split('./components/').pop()
  return {
    path: `/components/${name}`,
    name: name,
    component: () => import(/* webpackChunkName: "[request]" */ `${path}`)
  }
})

export default componentsRoutes.concat([
  {
    path: '/',
    name: 'home-page',
    component: () => import(/* webpackChunkName: "home-page" */ './components/HomePage.vue')
  }
])
