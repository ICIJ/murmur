export default [
  { 
    path: '/content-placeholder',
    component: () => import(/* webpackChunkName: "content-placeholder" */ './components/content-placeholder/doc.vue')
  },
  { 
    path: '/donate-form',
    component: () => import(/* webpackChunkName: "donate-form" */ './components/donate-form/doc.vue')
  },
  { 
    path: '/embedable-footer',
    component: () => import(/* webpackChunkName: "embedable-footer" */ './components/embedable-footer/doc.vue')
  },
  { 
    path: '/embed-form',
    component: () => import(/* webpackChunkName: "embed-form" */ './components/embed-form/doc.vue')
  },
  { 
    path: '/follow-us-popover',
    component: () => import(/* webpackChunkName: "follow-us-popover" */ './components/follow-us-popover/doc.vue')
  },
  { 
    path: '/generic-footer',
    component: () => import(/* webpackChunkName: "generic-footer" */ './components/generic-footer/doc.vue')
  },
  { 
    path: '/main-header',
    component: () => import(/* webpackChunkName: "main-header" */ './components/main-header/doc.vue')
  },
  { 
    path: '/responsive-iframe',
    component: () => import(/* webpackChunkName: "responsive-iframe" */ './components/responsive-iframe/doc.vue')
  },
  { 
    path: '/sharing-options',
    component: () => import(/* webpackChunkName: "sharing-options" */ './components/sharing-options/doc.vue')
  },
  { 
    path: '/sign-up-form',
    component: () => import(/* webpackChunkName: "sign-up-form" */ './components/sign-up-form/doc.vue')
  }
]
