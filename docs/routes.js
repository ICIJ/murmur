import startCase from 'lodash/startCase'
const docs = require.context("./", true, /doc\.vue$/).keys()

export default docs.map(path => {
  const name = path.split('/doc.vue').shift().split('./components/').pop()
  return {
    path: `/components/${name}`,
    label: startCase(name),
    component: () => import(/* webpackChunkName: "component-[index]" */ `${path}`)
  }
})
