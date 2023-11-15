import{n as l}from"./main-9365f8ba.js";const i={data(){return{highlighthed:"dc",icijOffices:[{id:"paris",color:"#6e40aa",label:"Paris, France"},{id:"sydney",color:"#ff5e63",label:"Sydney, Australia"},{id:"dc",color:"#aff05b",label:"Washington DC, USA"}]}}};var n=function(){var s=this,a=s._self._c;return a("div",{staticClass:"markdown-body"},[a("p",[s._v("A quick way to create orginal legend:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"bg-light p-5"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("ordinal-legend")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"icijOffices"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("value")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"paris"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"bg-light p-5"},[a("ordinal-legend",{attrs:{data:s.icijOffices,value:"paris"}})],1)])],1),a("p",[s._v("Or horizontal:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"bg-light p-5"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("ordinal-legend")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"icijOffices"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":highlight.sync")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"highlighthed"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("horizontal")]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"bg-light p-5"},[a("ordinal-legend",{attrs:{data:s.icijOffices,highlight:s.highlighthed,horizontal:""},on:{"update:highlight":function(t){s.highlighthed=t}}})],1)])],1),a("p",[s._v("It also works with a custom marker path:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"bg-light p-5"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("ordinal-legend")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"icijOffices"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("marker-path")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z"')]),s._v(" />")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"bg-light p-5"},[a("ordinal-legend",{attrs:{data:s.icijOffices,"marker-path":"M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z"}})],1)])],1),a("api-table",{attrs:{path:"components/OrdinalLegend.vue"}})],1)},e=[],v=l(i,n,e,!1,null,null,null,null);const _=v.exports;export{_ as default};