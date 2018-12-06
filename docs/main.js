// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueHighlightJS from 'vue-highlightjs'
import Collection from '@/main'

import store from './store'
import App from './components/App.vue'
import ApiTable from './components/ApiTable.vue'
import OutboundLink from './components/OutboundLink.vue'
import PalettePresenter from './components/PalettePresenter.vue'
import RepositoryLink from './components/RepositoryLink.vue'
import SampleCard from './components/SampleCard.vue'

import routes from './routes'
import './styles/app.scss'

import 'highlight.js/styles/monokai-sublime.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueHighlightJS)
Vue.use(Collection)

Vue.config.productionTip = false

Vue.component('ApiTable', ApiTable)
Vue.component('OutboundLink', OutboundLink)
Vue.component('PalettePresenter', PalettePresenter)
Vue.component('RepositoryLink', RepositoryLink)
Vue.component('SampleCard', SampleCard)

Collection.config.set('project.name', 'Demo Project')

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App),
  router: new VueRouter({ routes }),
}).$mount('#app')
