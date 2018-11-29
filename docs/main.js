// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import Collection from '@/main'

import App from './components/App'
import routes from './routes'
import './styles/app.scss'

Collection.config.set('project.name', 'Demo Project')
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router: new VueRouter({ routes })
}).$mount('#app')
