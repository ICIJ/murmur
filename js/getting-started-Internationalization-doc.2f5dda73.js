(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["getting-started-Internationalization-doc"],{"1fd4":function(s,a,t){"use strict";t.r(a);var e=function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",[s._m(0),t("p",[s._v("This library can be translated using "),t("a",{attrs:{href:"https://github.com/kazupon/vue-i18n",target:"_blank",rel:"noopener noreferrer"}},[s._v("vue-i18n"),t("OutboundLink")],1),s._v(".\nBy default, we provide a series of locales in English for our components. The\ntranslation library is installed at a component level. So each component using\ntranslation received a "),t("code",[s._v("i18n")]),s._v(" attribute.")]),s._m(1),t("p",[s._v("This library expose a static method to add new locales:")]),s._m(2),t("p",[s._v("Then you can switch to a new language easily:")]),s._m(3),s._m(4),t("p",[s._v("In the very same fashion, you can modify existing locales:")]),s._m(5),s._m(6),t("p",[s._v("Here are English locales defined in "),t("repository-link",{attrs:{path:"lib/locales/en.json"}},[s._v("lib/locales/en.json")]),s._v(":")],1),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",{staticClass:"hljs"},[s._v(s._s(s.en)+"\n")])])])])},n=[function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("h3",{attrs:{id:"how-it-work"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-it-work","aria-hidden":"true"}},[s._v("#")]),s._v(" How it work")])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("h3",{attrs:{id:"adding-more-locales"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-more-locales","aria-hidden":"true"}},[s._v("#")]),s._v(" Adding more locales")])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"language-js extra-class"},[t("pre",[t("code",{staticClass:"hljs language-js"},[t("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" Murmur "),t("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),t("span",{staticClass:"hljs-string"},[s._v("'@icij/murmur'")]),s._v("\n\nMurmur.setLocaleMessage("),t("span",{staticClass:"hljs-string"},[s._v("'fr'")]),s._v(", {\n  "),t("span",{staticClass:"hljs-string"},[s._v('"imddb-header"')]),s._v(": {\n    "),t("span",{staticClass:"hljs-string"},[s._v('"navbar"')]),s._v(": {\n      "),t("span",{staticClass:"hljs-string"},[s._v('"leak"')]),s._v(": "),t("span",{staticClass:"hljs-string"},[s._v('"Contact confidentiel"')]),s._v(",\n      "),t("span",{staticClass:"hljs-string"},[s._v('"support"')]),s._v(": "),t("span",{staticClass:"hljs-string"},[s._v('"Soutenez nous"')]),s._v(",\n      "),t("span",{staticClass:"hljs-string"},[s._v('"follow"')]),s._v(": "),t("span",{staticClass:"hljs-string"},[s._v('"Suivez l\'ICIJ"')]),s._v("\n    }\n  }\n})\n")])])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"language-js extra-class"},[t("pre",[t("code",{staticClass:"hljs language-js"},[s._v("Murmur.setLocale("),t("span",{staticClass:"hljs-string"},[s._v("'fr'")]),s._v(")\n")])])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("h3",{attrs:{id:"overiding-locales"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#overiding-locales","aria-hidden":"true"}},[s._v("#")]),s._v(" Overiding locales")])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"language-js extra-class"},[t("pre",[t("code",{staticClass:"hljs language-js"},[t("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" Murmur "),t("span",{staticClass:"hljs-keyword"},[s._v("from")]),s._v(" "),t("span",{staticClass:"hljs-string"},[s._v("'@icij/murmur'")]),s._v("\n\nMurmur.mergeLocaleMessage("),t("span",{staticClass:"hljs-string"},[s._v("'en'")]),s._v(", {\n  "),t("span",{staticClass:"hljs-string"},[s._v('"imddb-header"')]),s._v(": {\n    "),t("span",{staticClass:"hljs-string"},[s._v('"navbar"')]),s._v(": {\n      "),t("span",{staticClass:"hljs-string"},[s._v('"leak"')]),s._v(": "),t("span",{staticClass:"hljs-string"},[s._v('"SecureDrop"')]),s._v(",\n      "),t("span",{staticClass:"hljs-string"},[s._v('"support"')]),s._v(": "),t("span",{staticClass:"hljs-string"},[s._v('"Buy us a beer 🍺"')]),s._v(",\n      "),t("span",{staticClass:"hljs-string"},[s._v('"follow"')]),s._v(": "),t("span",{staticClass:"hljs-string"},[s._v('"Follow ICIJ"')]),s._v("\n    }\n  }\n})\n")])])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("h3",{attrs:{id:"default-locales"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#default-locales","aria-hidden":"true"}},[s._v("#")]),s._v(" Default locales")])}],r=(t("cadf"),t("551c"),t("097d"),t("e847")),l=t("504c");l["default"].mergeLocaleMessage("en",{"imddb-header":{navbar:{leak:"SecureDrop",support:"Buy us a beer 🍺",follow:"Follow ICIJ"}}});var i={data:function(){return{en:r}}},c=i,o=t("2877"),v=Object(o["a"])(c,e,n,!1,null,null,null);v.options.__file="doc.md";a["default"]=v.exports}}]);
//# sourceMappingURL=getting-started-Internationalization-doc.2f5dda73.js.map