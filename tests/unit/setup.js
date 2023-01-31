import Vue from 'vue'

Vue.config.productionTip = false
Vue.config.devtools = false

Object.defineProperty(document, 'fonts', {
  value: { ready: Promise.resolve({}) },
})
