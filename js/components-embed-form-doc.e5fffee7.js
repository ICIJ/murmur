(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-embed-form-doc"],{5960:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[t._v("<"),a("span",{staticClass:"hljs-name"},[t._v("embed-form")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("url")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"https://projects.icij.org/the-implant-files/graphics/#/device-related-incidents-in-europe"')]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v(":height")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"330"')]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("no-preview")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"card card-sm mx-auto my-4 pt-2"')]),t._v(">")]),a("span",{staticClass:"hljs-tag"},[t._v("</"),a("span",{staticClass:"hljs-name"},[t._v("embed-form")]),t._v(">")]),t._v("\n")])])]),[a("div",[a("embed-form",{staticClass:"card card-sm mx-auto my-4 pt-2",attrs:{url:"https://projects.icij.org/the-implant-files/graphics/#/device-related-incidents-in-europe",height:330,"no-preview":""}})],1)]],2),a("p",[t._v("We usualy put this form inside a modal (here, with Boostrap Vue).")]),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[t._v("<"),a("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"p-4 text-center"')]),t._v(">")]),t._v("\n  "),a("span",{staticClass:"hljs-tag"},[t._v("<"),a("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"btn btn-info font-weight-bold"')]),t._v(" @"),a("span",{staticClass:"hljs-attr"},[t._v("click")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"$refs.formModal.show()"')]),t._v(">")]),t._v("\n    Click to see the form with preview\n  "),a("span",{staticClass:"hljs-tag"},[t._v("</"),a("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(">")]),t._v("\n"),a("span",{staticClass:"hljs-tag"},[t._v("</"),a("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n"),a("span",{staticClass:"hljs-tag"},[t._v("<"),a("span",{staticClass:"hljs-name"},[t._v("b-modal")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("hide-footer")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("lazy")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"Embed form with a preview"')]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("ref")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"formModal"')]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"lg"')]),t._v(">")]),t._v("\n  "),a("span",{staticClass:"hljs-tag"},[t._v("<"),a("span",{staticClass:"hljs-name"},[t._v("embed-form")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("no-title")]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v("url")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"https://projects.icij.org/the-implant-files/graphics/#/device-related-incidents-in-europe?no-embeddable-footer=1"')]),t._v(" "),a("span",{staticClass:"hljs-attr"},[t._v(":height")]),t._v("="),a("span",{staticClass:"hljs-string"},[t._v('"550"')]),t._v(">")]),a("span",{staticClass:"hljs-tag"},[t._v("</"),a("span",{staticClass:"hljs-name"},[t._v("embed-form")]),t._v(">")]),t._v("\n"),a("span",{staticClass:"hljs-tag"},[t._v("</"),a("span",{staticClass:"hljs-name"},[t._v("b-modal")]),t._v(">")]),t._v("\n")])])]),[a("div",[a("div",{staticClass:"p-4 text-center"},[a("button",{staticClass:"btn btn-info font-weight-bold",on:{click:function(s){t.$refs.formModal.show()}}},[t._v("\n    Click to see the form with preview\n  ")])]),a("b-modal",{ref:"formModal",attrs:{"hide-footer":"",lazy:"",title:"Embed form with a preview",size:"lg"}},[a("embed-form",{attrs:{"no-title":"",url:"https://projects.icij.org/the-implant-files/graphics/#/device-related-incidents-in-europe?no-embeddable-footer=1",height:550}})],1)],1)]],2),a("api-table",{attrs:{api:'{\n  "description": "Embed Form",\n  "methods": [],\n  "displayName": "EmbedForm",\n  "props": {\n    "noTitle": {\n      "type": {\n        "name": "boolean"\n      },\n      "required": "",\n      "tags": {},\n      "comment": "/**\\n     * Hide the form title\\n     */",\n      "description": "Hide the form title"\n    },\n    "noPreview": {\n      "type": {\n        "name": "boolean"\n      },\n      "required": "",\n      "tags": {},\n      "comment": "/**\\n     * Hide the preview panel\\n     */",\n      "description": "Hide the preview panel"\n    },\n    "width": {\n      "type": {\n        "name": "number|string"\n      },\n      "required": "",\n      "defaultValue": {\n        "value": "\\"100%\\"",\n        "func": false\n      },\n      "tags": {},\n      "comment": "/**\\n     * Default width of the iframe code\\n     */",\n      "description": "Default width of the iframe code"\n    },\n    "height": {\n      "type": {\n        "name": "number"\n      },\n      "required": "",\n      "defaultValue": {\n        "value": "function() { return window.innerHeight; }",\n        "func": true\n      },\n      "tags": {},\n      "comment": "/**\\n     * Default height of the iframe code\\n     */",\n      "description": "Default height of the iframe code"\n    },\n    "minWidth": {\n      "type": {\n        "name": "number"\n      },\n      "required": "",\n      "defaultValue": {\n        "value": "0",\n        "func": false\n      },\n      "tags": {},\n      "comment": "/**\\n     * Default minimal width of the iframe code (if extract from window\\\\&#39;s size)\\n     */",\n      "description": "Default minimal width of the iframe code (if extract from window\\\\&#39;s size)"\n    },\n    "minHeight": {\n      "type": {\n        "name": "number"\n      },\n      "required": "",\n      "defaultValue": {\n        "value": "0",\n        "func": false\n      },\n      "tags": {},\n      "comment": "/**\\n     * Default minimal height of the iframe code (if extract from window\\\\&#39;s size)\\n     */",\n      "description": "Default minimal height of the iframe code (if extract from window\\\\&#39;s size)"\n    },\n    "url": {\n      "type": {\n        "name": "string"\n      },\n      "required": "",\n      "tags": {},\n      "comment": "/**\\n     * URL of the iframe code\\n     */",\n      "description": "URL of the iframe code"\n    }\n  },\n  "comment": "/**\\n * Embed Form\\n */",\n  "tags": {},\n  "events": {},\n  "slots": {}\n}'}})],1)},n=[],i={},l=i,r=a("2877"),o=Object(r["a"])(l,e,n,!1,null,null,null);o.options.__file="doc.md";s["default"]=o.exports}}]);
//# sourceMappingURL=components-embed-form-doc.e5fffee7.js.map