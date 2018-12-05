// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import BootstrapVue from 'bootstrap-vue'
import VueHighlightJS from 'vue-highlightjs'
import Collection from '@/main'

import App from './components/App.vue'
import ApiTable from './components/ApiTable.vue'
import SampleCard from './components/SampleCard.vue'
import PalettePresenter from './components/PalettePresenter.vue'

import routes from './routes'
import './styles/app.scss'

import 'highlight.js/styles/monokai-sublime.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueClipboard)
Vue.use(BootstrapVue)
Vue.use(VueHighlightJS)
Vue.use(Collection)

Vue.component('ApiTable', ApiTable)
Vue.component('SampleCard', SampleCard)
Vue.component('PalettePresenter', PalettePresenter)

Collection.config.set('project.name', 'Demo Project')

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router: new VueRouter({ routes })
}).$mount('#app')
