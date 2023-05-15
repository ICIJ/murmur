import{n,l as i,f as v,a as e}from"./main-23a4d7da.js";const r={data(){return{currentPage:1}},beforeMount(){i.add(v,e)},watch:{currentPage(l){this.$router.push({query:{page:l}})}}};var c=function(){var s=this,a=s._self._c;return a("div",{staticClass:"markdown-body"},[a("p",[s._v("Default styling:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-2 text-center"},[a("tiny-pagination",{attrs:{"per-page":10,"total-rows":200},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1)])],1),a("p",[s._v("Different sizes:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("size")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"sm"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("size")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"md"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("size")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"lg"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-2 text-center"},[a("p",[a("tiny-pagination",{attrs:{size:"sm","per-page":10,"total-rows":200},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1),a("p",[a("tiny-pagination",{attrs:{size:"md","per-page":10,"total-rows":200},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1),a("p",[a("tiny-pagination",{attrs:{size:"lg","per-page":10,"total-rows":200},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1)])])],1),a("p",[s._v("Hide navigations buttons:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("no-nav")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-2 text-center"},[a("tiny-pagination",{attrs:{"per-page":10,"total-rows":200,"no-nav":""},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1)])],1),a("p",[s._v("Use compact mode:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("compact")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-2 text-center"},[a("tiny-pagination",{attrs:{"per-page":10,"total-rows":200,compact:""},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1)])],1),a("p",[s._v("Or display as a block (here with some additional background and border):")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-5 text-center"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("block")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"border bg-white p-1 shadow"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-5 text-center"},[a("tiny-pagination",{staticClass:"border bg-white p-1 shadow",attrs:{"per-page":10,"total-rows":200,block:""},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1)])],1),a("p",[s._v("And finally, with custom navigation button icons and variant:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-5 text-center"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("tiny-pagination")]),s._v(` 
    `),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"currentPage"')]),s._v(` 
    `),a("span",{staticClass:"hljs-attr"},[s._v("block")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"border bg-dark text-light p-1 shadow"')]),s._v(` 
    `),a("span",{staticClass:"hljs-attr"},[s._v("previous-page-icon")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"arrow-left"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("next-page-icon")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"arrow-right"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("nav-variant")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"dark"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("size")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"sm"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v(":per-page")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(` 
    `),a("span",{staticClass:"hljs-attr"},[s._v(":total-rows")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"200"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-5 text-center"},[a("tiny-pagination",{staticClass:"border bg-dark text-light p-1 shadow",attrs:{"previous-page-icon":"arrow-left","next-page-icon":"arrow-right","nav-variant":"dark",size:"sm","per-page":10,"total-rows":200,block:""},model:{value:s.currentPage,callback:function(t){s.currentPage=t},expression:"currentPage"}})],1)])],1),a("api-table",{attrs:{path:"components/TinyPagination.vue"}})],1)},_=[],p=n(r,c,_,!1,null,null,null,null);const h=p.exports;export{h as default};
