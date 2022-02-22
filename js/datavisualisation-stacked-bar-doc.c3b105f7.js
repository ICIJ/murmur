(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["datavisualisation-stacked-bar-doc"],{5437:function(s,a,t){"use strict";t.r(a);var l=function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",[t("p",[s._v("Component do draw dead simple stacked bar charts.")]),t("sample-card",{attrs:{lang:"html"}},[t("template",{slot:"code"},[t("pre",[t("code",{staticClass:"html"},[t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n    Medical device companies reported tens of thousands of incidents in 2017  \n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v("\n    Companies must report when a patient has potentially been hurt or killed by one of their medical devices.\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("stacked-bar-chart")]),s._v("\n    "),t("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"incidentReports"')]),s._v("\n    "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v("\n    "),t("span",{staticClass:"hljs-attr"},[s._v("label-above")]),s._v(" />")]),s._v("  \n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v("\n    Note: The companies shown here are 10 of the biggest participants in the medical device industry. Numbers for Becton, Dickinson and Company include adverse events reported by C. R. Bard, which was acquired in 2017. Source: U.S. Food and Drug Administration, ICIJ analysis.\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n"),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[t("div",[t("div",{staticClass:"m-4"},[t("h4",[s._v(" Medical device companies reported tens of thousands of incidents in 2017 ")]),t("p",{staticClass:"text-muted"},[s._v(" Companies must report when a patient has potentially been hurt or killed by one of their medical devices. ")]),t("stacked-bar-chart",{staticClass:"my-4",attrs:{data:s.incidentReports,"label-above":""}}),t("p",{staticClass:"text-muted small"},[s._v(" Note: The companies shown here are 10 of the biggest participants in the medical device industry. Numbers for Becton, Dickinson and Company include adverse events reported by C. R. Bard, which was acquired in 2017. Source: U.S. Food and Drug Administration, ICIJ analysis. ")])],1)])]],2),t("collapsible-block",{attrs:{label:"Show the data structure"}},[t("div",{staticClass:"language-json extra-class"},[t("pre",[t("code",{staticClass:"hljs language-json"},[s._v(s._s(s.incidentReports)+"\n")])])])]),t("p",[s._v("Or a more advanced example:")]),t("sample-card",{attrs:{lang:"html"}},[t("template",{slot:"code"},[t("pre",[t("code",{staticClass:"html"},[t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n    How high-budget movies score in the box office?\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("stacked-bar-chart")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("hide-empty-values")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"moviesUrl"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("label-field")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"movie"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":sort-by")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"sortKey"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":groups")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v("\"['Budget', 'Box Office']\"")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":relative")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"isRelative"')]),s._v(">")]),s._v("  \n    "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("template")]),s._v(" #"),t("span",{staticClass:"hljs-attr"},[s._v("header-right")]),s._v(">")]),s._v("    \n      "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"ml-auto d-flex border align-items-center p-0"')]),s._v(">")]),s._v("\n        "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"border-right"')]),s._v(">")]),s._v("\n          "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"isRelative"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-2"')]),s._v(">")]),s._v("\n            Relative\n          "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(">")]),s._v("\n        "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n        "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("label")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-2 d-flex align-items-center"')]),s._v(">")]),s._v("\n          Sort by\n          "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("b-form-select")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"sortKey"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":options")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"sortKeys"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("size")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"sm"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"w-auto ml-2"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("required")]),s._v(">")]),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("b-form-select")]),s._v(">")]),s._v("\n        "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("label")]),s._v(">")]),s._v("\n      "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n    "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("template")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("stacked-bar-chart")]),s._v(">")]),s._v("\n"),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[t("div",[t("div",{staticClass:"m-4"},[t("h4",[s._v(" How high-budget movies score in the box office? ")]),t("stacked-bar-chart",{staticClass:"my-4",attrs:{"hide-empty-values":"",data:s.moviesUrl,"label-field":"movie","sort-by":s.sortKey,groups:["Budget","Box Office"],relative:s.isRelative},scopedSlots:s._u([{key:"header-right",fn:function(){return[t("div",{staticClass:"ml-auto d-flex border align-items-center p-0"},[t("div",{staticClass:"border-right"},[t("b-form-checkbox",{staticClass:"m-2",model:{value:s.isRelative,callback:function(a){s.isRelative=a},expression:"isRelative"}},[s._v(" Relative ")])],1),t("label",{staticClass:"m-2 d-flex align-items-center"},[s._v(" Sort by "),t("b-form-select",{staticClass:"w-auto ml-2",attrs:{options:s.sortKeys,size:"sm",required:""},model:{value:s.sortKey,callback:function(a){s.sortKey=a},expression:"sortKey"}})],1)])]},proxy:!0}])})],1)])]],2),t("p",[s._v("Or with a fixed height:")]),t("sample-card",{attrs:{lang:"html"}},[t("template",{slot:"code"},[t("pre",[t("code",{staticClass:"html"},[t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("Leaks size"),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v("\n    Size of each leak in GB.\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("stacked-bar-chart")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"leakSizes"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"mb-4"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("hide-legend")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":fixed-height")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"400"')]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v(":x-axis-tick-format")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"humanReadableGb"')]),s._v(">")]),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("stacked-bar-chart")]),s._v(">")]),s._v("\n  "),t("span",{staticClass:"hljs-tag"},[s._v("<"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),t("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),t("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v("\n    Source: ICIJ\n  "),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v("\n"),t("span",{staticClass:"hljs-tag"},[s._v("</"),t("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[t("div",[t("div",{staticClass:"m-4"},[t("h4",[s._v("Leaks size")]),t("p",{staticClass:"text-muted"},[s._v(" Size of each leak in GB. ")]),t("stacked-bar-chart",{staticClass:"mb-4",attrs:{data:s.leakSizes,"hide-legend":"","fixed-height":400,"x-axis-tick-format":s.humanReadableGb}}),t("p",{staticClass:"text-muted small"},[s._v(" Source: ICIJ ")])],1)])]],2),t("api-table",{attrs:{path:"datavisualisations/StackedBarChart.vue"}})],1)},e=[],i={data:function(){return{incidentReports:[{label:"Medtronic PLC",injury:71444,death:1828},{label:"Abbott Laboratories",injury:40200,death:2816},{label:"Johnson & Johnson",injury:25863,death:104},{label:"Boston Scientific",injury:20509,death:725},{label:"Zimmer Biomet Holdings",injury:15733,death:146},{label:"Tandem Diabetes Care, Inc.",injury:13658,death:26},{label:"Stryker",injury:5102,death:90},{label:"Becton, Dickinson and Company",injury:3569,death:130},{label:"DexCom, Inc.",injury:1198,death:25},{label:"Philips",injury:450,death:268}],moviesUrl:"https://gist.githubusercontent.com/pirhoo/20ce1b795555210c926967a291f8a7ad/raw/13d972b7d2b98b174c33fff38aac2b7d69c85fa7/stacked-bars-movies.json",isRelative:!0,sortKeys:["movie","budget","box_office"],sortKey:["movie"],leakSizes:[{label:"Paradise Papers",value:1400},{label:"Panama Papers",value:2600},{label:"Swiss Leaks",value:3.3},{label:"LuxLeaks",value:4},{label:"Offshore Leaks",value:260}]}},methods:{humanReadableGb:function(s){return s>=1e3?"".concat(s/1e3,"TB"):"".concat(s,"GB")}}},n=i,v=t("2877"),c=Object(v["a"])(n,l,e,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=datavisualisation-stacked-bar-doc.c3b105f7.js.map