// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import BootstrapVue from 'bootstrap-vue'
import Collection from '@/main'

import App from './components/App.vue'
import ApiTable from './components/ApiTable.vue'
import SampleCard from './components/SampleCard.vue'

import routes from './routes'
import './styles/app.scss'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueClipboard)
Vue.use(BootstrapVue);

Vue.component('ApiTable', ApiTable)
Vue.component('SampleCard', SampleCard)

Object.keys(Collection.components).forEach(key => {
  Vue.component(key, Collection.components[key])
})

Collection.config.set('project.name', 'Demo Project')

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router: new VueRouter({ routes })
}).$mount('#app')
