(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["datavisualisation-stacked-column-doc"],{"48bc":function(s,a,t){"use strict";t.r(a);var n=function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",[t("p",[s._v("Component do draw dead simple stacked column charts.")]),t("sample-card",{attrs:{lang:"html",code:'<div class="m-4">\n  <h4>\n    Breast implant companies buried evidence of injuries for years\n  </h4>\n  <p class="text-muted">\n    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.\n  </p>\n  <stacked-column-chart :data="incidentReportsUrl" y-axis-tick-format=",.0f" class="my-4" />  \n  <p class="text-muted small">\n    Source: U.S. Food and Drug Administration, ICIJ analysis\n  </p>\n</div>\n'}},[t("template",{slot:"code"},[t("pre",[t("code",{staticClass:"html"},[t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n    Breast implant companies buried evidence of injuries for years\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v("\n    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("stacked-column-chart")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"incidentReportsUrl"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("y-axis-tick-format")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('",.0f"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(" />")]),s._v("  \n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v("\n    Source: U.S. Food and Drug Administration, ICIJ analysis\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n"),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[t("div",[t("div",{staticClass:"m-4"},[t("h4",[s._v(" Breast implant companies buried evidence of injuries for years ")]),t("p",{staticClass:"text-muted"},[s._v(" Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared. ")]),t("stacked-column-chart",{staticClass:"my-4",attrs:{data:s.incidentReportsUrl,"y-axis-tick-format":",.0f"}}),t("p",{staticClass:"text-muted small"},[s._v(" Source: U.S. Food and Drug Administration, ICIJ analysis ")])],1)])]],2),t("p",[s._v("Or without direct-labeling:")]),t("sample-card",{attrs:{lang:"html",code:'<div class="m-4">\n  <div class="d-flex align-items-baseline">\n    <h4>\n      Breast implant companies buried evidence of injuries for years\n    </h4>\n    <b-form-checkbox class="text-nowrap ml-4" switch v-model="socialMode">\n      Social mode\n    </b-form-checkbox>\n  </div>\n  <p class="text-muted">\n    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.\n  </p>\n  <stacked-column-chart :social-mode="socialMode" no-direct-labeling :data="incidentReportsUrl" y-axis-tick-format=",.0f" class="my-4" />  \n  <p class="text-muted small">\n    Source: U.S. Food and Drug Administration, ICIJ analysis\n  </p>\n</div>\n'}},[t("template",{slot:"code"},[t("pre",[t("code",{staticClass:"html"},[t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"d-flex align-items-baseline"')]),s._v(">")]),s._v("\n    "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n      Breast implant companies buried evidence of injuries for years\n    "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n    "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-nowrap ml-4"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("switch")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"socialMode"')]),s._v(">")]),s._v("\n      Social mode\n    "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v("\n    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("stacked-column-chart")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":social-mode")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"socialMode"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("no-direct-labeling")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"incidentReportsUrl"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("y-axis-tick-format")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('",.0f"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(" />")]),s._v("  \n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v("\n    Source: U.S. Food and Drug Administration, ICIJ analysis\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n"),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[t("div",[t("div",{staticClass:"m-4"},[t("div",{staticClass:"d-flex align-items-baseline"},[t("h4",[s._v(" Breast implant companies buried evidence of injuries for years ")]),t("b-form-checkbox",{staticClass:"text-nowrap ml-4",attrs:{switch:""},model:{value:s.socialMode,callback:function(a){s.socialMode=a},expression:"socialMode"}},[s._v(" Social mode ")])],1),t("p",{staticClass:"text-muted"},[s._v(" Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared. ")]),t("stacked-column-chart",{staticClass:"my-4",attrs:{"social-mode":s.socialMode,"no-direct-labeling":"",data:s.incidentReportsUrl,"y-axis-tick-format":",.0f"}}),t("p",{staticClass:"text-muted small"},[s._v(" Source: U.S. Food and Drug Administration, ICIJ analysis ")])],1)])]],2),t("collapsible-block",{attrs:{label:"Show the data structure"}},[t("div",{staticClass:"language-json extra-class"},[t("pre",[t("code",{staticClass:"hljs language-json"},[s._v("[\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2008")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("300")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("49")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2009")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("138")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("37")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2010")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("3")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("109")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("44")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2011")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("1")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("141")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("29")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2012")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("0")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("175")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("32")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2013")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("4")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("130")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("40")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2014")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("6")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("122")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("33")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2015")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("1")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("163")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("29")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2016")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("5")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("304")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("28")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2017")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("8")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2082")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("48")]),s._v("\n   },\n   {\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"date"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("2018")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"death"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("7")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("5185")]),s._v(",\n      "),t("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),s._v(":"),t("span",{staticClass:"hljs-number"},[s._v("86")]),s._v("\n   }\n]\n")])])])]),t("api-table",{attrs:{path:"datavisualisations/StackedColumnChart.vue"}})],1)},l=[],i={data:function(){return{socialMode:!1,incidentReportsUrl:"https://gist.githubusercontent.com/pirhoo/4055e8d1ee3016805eaf1d2feabdd895/raw/a3d2ba8e9d19fcd9fc659dab50ec075248178238/stacked-colums-incidents.json"}}},e=i,v=t("2877"),c=Object(v["a"])(e,n,l,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=datavisualisation-stacked-column-doc.3bfb8759.js.map