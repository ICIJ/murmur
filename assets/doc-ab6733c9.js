import{n,e as l}from"./main-64d7fa55.js";const e={data(){return{en:l}}};var i=function(){var a=this,t=a._self._c;return t("div",{staticClass:"markdown-body"},[t("h3",[a._v("How it work")]),a._m(0),t("h3",[a._v("Adding more locales")]),t("p",[a._v("Murmur exposes a static method to add new locales:")]),a._m(1),t("p",[a._v("Then you can switch to a new language easily:")]),a._m(2),t("h3",[a._v("Overiding locales")]),t("p",[a._v("In the very same fashion, you can modify existing locales:")]),a._m(3),t("h3",[a._v("Default locales")]),t("p",[a._v("Here are English locales defined in "),t("repository-link",{attrs:{path:"lib/locales/en.json"}},[a._v("lib/locales/en.json")]),a._v(":")],1),t("collapsible-block",{attrs:{label:"All English locales"}},[t("pre",{staticClass:"bg-dark p-3 m-0"},[t("code",{},[a._v(a._s(JSON.stringify(a.en,null,2)))])])])],1)},_=[function(){var s=this,a=s._self._c;return a("p",[s._v("Murmur can be translated using "),a("a",{attrs:{href:"https://github.com/kazupon/vue-i18n"}},[s._v("vue-i18n")]),s._v(". By default, we provide a series of locales in English for our components. The translation library is installed at a component level. So each component using translation received a "),a("code",{},[s._v("i18n")]),s._v(" attribute.")])},function(){var s=this,a=s._self._c;return a("pre",[a("code",{staticClass:"hljs language-js"},[a("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" "),a("span",{staticClass:"hljs-title class_"},[s._v("Murmur")]),s._v(" "),a("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v("'@icij/murmur'")]),s._v(`

`),a("span",{staticClass:"hljs-title class_"},[s._v("Murmur")]),s._v("."),a("span",{staticClass:"hljs-title function_"},[s._v("setLocaleMessage")]),s._v("("),a("span",{staticClass:"hljs-string"},[s._v("'fr'")]),s._v(`, {
  `),a("span",{staticClass:"hljs-string"},[s._v('"imddb-header"')]),s._v(`: {
    `),a("span",{staticClass:"hljs-string"},[s._v('"navbar"')]),s._v(`: {
      `),a("span",{staticClass:"hljs-string"},[s._v('"leak"')]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v('"Contact confidentiel"')]),s._v(`,
      `),a("span",{staticClass:"hljs-string"},[s._v('"support"')]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v('"Soutenez nous"')]),s._v(`,
      `),a("span",{staticClass:"hljs-string"},[s._v('"follow"')]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v(`"Suivez l'ICIJ"`)]),s._v(`
    }
  }
})
`)])])},function(){var s=this,a=s._self._c;return a("pre",[a("code",{staticClass:"hljs language-js"},[a("span",{staticClass:"hljs-title class_"},[s._v("Murmur")]),s._v("."),a("span",{staticClass:"hljs-title function_"},[s._v("setLocale")]),s._v("("),a("span",{staticClass:"hljs-string"},[s._v("'fr'")]),s._v(`)
`)])])},function(){var s=this,a=s._self._c;return a("pre",[a("code",{staticClass:"hljs language-js"},[a("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" "),a("span",{staticClass:"hljs-title class_"},[s._v("Murmur")]),s._v(" "),a("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v("'@icij/murmur'")]),s._v(`

`),a("span",{staticClass:"hljs-title class_"},[s._v("Murmur")]),s._v("."),a("span",{staticClass:"hljs-title function_"},[s._v("mergeLocaleMessage")]),s._v("("),a("span",{staticClass:"hljs-string"},[s._v("'en'")]),s._v(`, {
  `),a("span",{staticClass:"hljs-string"},[s._v('"imddb-header"')]),s._v(`: {
    `),a("span",{staticClass:"hljs-string"},[s._v('"navbar"')]),s._v(`: {
      `),a("span",{staticClass:"hljs-string"},[s._v('"leak"')]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v('"SecureDrop"')]),s._v(`,
      `),a("span",{staticClass:"hljs-string"},[s._v('"support"')]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v('"Buy us a beer 🍺"')]),s._v(`,
      `),a("span",{staticClass:"hljs-string"},[s._v('"follow"')]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v('"Follow ICIJ"')]),s._v(`
    }
  }
})
`)])])}],r=n(e,i,_,!1,null,null,null,null);const c=r.exports;export{c as default};
