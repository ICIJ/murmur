(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-selectable-dropdown-doc"],{"1bce":function(s,t,a){"use strict";a.r(t);var l=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",[a("p",[s._v("A component to create an interactive list.")]),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"country"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":items")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"allCountries"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(" @"),a("span",{staticClass:"hljs-attr"},[s._v("click")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v("\"country = 'Peru'\"")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"btn btn-outline-secondary mt-2 mx-2"')]),s._v(">")]),s._v("Choose Peru"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(" @"),a("span",{staticClass:"hljs-attr"},[s._v("click")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v("\"country = 'France'\"")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"btn btn-outline-secondary mt-2 mx-2"')]),s._v(">")]),s._v("Choose France"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[a("div",[a("div",{staticClass:"p-2 text-center"},[a("selectable-dropdown",{attrs:{items:s.allCountries},model:{value:s.country,callback:function(t){s.country=t},expression:"country"}}),a("button",{staticClass:"btn btn-outline-secondary mt-2 mx-2",on:{click:function(t){s.country="Peru"}}},[s._v("Choose Peru")]),a("button",{staticClass:"btn btn-outline-secondary mt-2 mx-2",on:{click:function(t){s.country="France"}}},[s._v("Choose France")])],1)])]],2),a("p",[s._v("With a serializer:")]),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("deactivate-keys")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":serializer")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"item => item.toUpperCase()"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":items")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"allCountries"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[a("div",[a("div",{staticClass:"p-2 text-center"},[a("selectable-dropdown",{attrs:{"deactivate-keys":"",serializer:function(s){return s.toUpperCase()},items:s.allCountries}})],1)])]],2),a("p",[s._v("With multiple values:")]),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("deactivate-keys")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"countries"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("multiple")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":items")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"allCountries"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"btn btn-outline-secondary mt-2 mx-2"')]),s._v(" @"),a("span",{staticClass:"hljs-attr"},[s._v("click")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"countries = twoCountries"')]),s._v(">")]),s._v("Choose two countries"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[a("div",[a("div",{staticClass:"p-2 text-center"},[a("selectable-dropdown",{attrs:{"deactivate-keys":"",multiple:"",items:s.allCountries},model:{value:s.countries,callback:function(t){s.countries=t},expression:"countries"}}),a("button",{staticClass:"btn btn-outline-secondary mt-2 mx-2",on:{click:function(t){s.countries=s.twoCountries}}},[s._v("Choose two countries")])],1)])]],2),a("p",[s._v("With a dynamic list:")]),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("deactivate-keys")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"countries"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("multiple")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":items")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"filteredCountries"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"btn btn-outline-secondary mt-2 mx-2"')]),s._v(" @"),a("span",{staticClass:"hljs-attr"},[s._v("click")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"filteredCountries = treeCountries"')]),s._v(">")]),s._v("\n    Tree countries\n  "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"btn btn-outline-secondary mt-2 mx-2"')]),s._v(" @"),a("span",{staticClass:"hljs-attr"},[s._v("click")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"filteredCountries = twoCountries"')]),s._v(">")]),s._v("\n    Two countries\n  "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("button")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[a("div",[a("div",{staticClass:"p-2 text-center"},[a("selectable-dropdown",{attrs:{"deactivate-keys":"",multiple:"",items:s.filteredCountries},model:{value:s.countries,callback:function(t){s.countries=t},expression:"countries"}}),a("button",{staticClass:"btn btn-outline-secondary mt-2 mx-2",on:{click:function(t){s.filteredCountries=s.treeCountries}}},[s._v(" Tree countries ")]),a("button",{staticClass:"btn btn-outline-secondary mt-2 mx-2",on:{click:function(t){s.filteredCountries=s.twoCountries}}},[s._v(" Two countries ")])],1)])]],2),s._m(0),a("p",[s._v("You can also use this component to build a list based from a collection of object:")]),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("deactivate-keys")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("multiple")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":items")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"countryCollection"')]),s._v(">")]),s._v("\n    "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("template")]),s._v(" #"),a("span",{staticClass:"hljs-attr"},[s._v("item-label")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"{ item }"')]),s._v(">")]),s._v("\n      "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-html")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"item.label"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(">")]),s._v("\n    "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("template")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[a("div",[a("div",{staticClass:"p-2 text-center"},[a("selectable-dropdown",{attrs:{"deactivate-keys":"",multiple:"",items:s.countryCollection},scopedSlots:s._u([{key:"item-label",fn:function(t){var l=t.item;return[a("span",{domProps:{innerHTML:s._s(l.label)}})]}}])})],1)])]],2),a("p",[s._v("Some lists are not trivial and comparisons are not easy. For instance a games with similar name:")]),s._m(1),s._m(2),a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-2 text-center"')]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("deactivate-keys")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("multiple")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":items")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"streetFighters"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"selectedGames"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":eq")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"(item, other) => item.uid === other.uid"')]),s._v(">")]),s._v("\n    "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("template")]),s._v(" #"),a("span",{staticClass:"hljs-attr"},[s._v("item-label")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"{ item }"')]),s._v(">")]),s._v("\n      "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-html")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"item.label"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(">")]),s._v(" ("),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-html")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"item.episode"')]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(">")]),s._v(")\n    "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("template")]),s._v(">")]),s._v("\n  "),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("selectable-dropdown")]),s._v(">")]),s._v("\n  Selected games: "),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-html")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v("\"selectedGames.map(g => g.uid).join(', ')\"")]),s._v(">")]),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("span")]),s._v(">")]),s._v("\n"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v("\n")])])]),[a("div",[a("div",{staticClass:"p-2 text-center"},[a("selectable-dropdown",{attrs:{"deactivate-keys":"",multiple:"",items:s.streetFighters,eq:function(s,t){return s.uid===t.uid}},scopedSlots:s._u([{key:"item-label",fn:function(t){var l=t.item;return[a("span",{domProps:{innerHTML:s._s(l.label)}}),s._v(" ("),a("span",{domProps:{innerHTML:s._s(l.episode)}}),s._v(") ")]}}]),model:{value:s.selectedGames,callback:function(t){s.selectedGames=t},expression:"selectedGames"}}),s._v(" Selected games: "),a("span",{domProps:{innerHTML:s._s(s.selectedGames.map((function(s){return s.uid})).join(", "))}})],1)])]],2),a("api-table",{attrs:{path:"components/SelectableDropdown.vue"}})],1)},n=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("h2",{attrs:{id:"collection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#collection"}},[s._v("#")]),s._v(" Collection")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"language-js extra-class"},[a("pre",[a("code",{staticClass:"hljs language-js"},[a("span",{staticClass:"hljs-keyword"},[s._v("const")]),s._v(" streetFighters = [\n  { "),a("span",{staticClass:"hljs-attr"},[s._v("label")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'Street Fighter'")]),s._v(", "),a("span",{staticClass:"hljs-attr"},[s._v("episode")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'I'")]),s._v(",   "),a("span",{staticClass:"hljs-attr"},[s._v("uid")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'sf1'")]),s._v(" },\n  { "),a("span",{staticClass:"hljs-attr"},[s._v("label")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'Street Fighter'")]),s._v(", "),a("span",{staticClass:"hljs-attr"},[s._v("episode")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'II'")]),s._v(",  "),a("span",{staticClass:"hljs-attr"},[s._v("uid")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'sf2'")]),s._v(" },\n  { "),a("span",{staticClass:"hljs-attr"},[s._v("label")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'Street Fighter'")]),s._v(", "),a("span",{staticClass:"hljs-attr"},[s._v("episode")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'III'")]),s._v(", "),a("span",{staticClass:"hljs-attr"},[s._v("uid")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'sf3'")]),s._v(" },\n  { "),a("span",{staticClass:"hljs-attr"},[s._v("label")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'Street Fighter'")]),s._v(", "),a("span",{staticClass:"hljs-attr"},[s._v("episode")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'IV'")]),s._v(",  "),a("span",{staticClass:"hljs-attr"},[s._v("uid")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'sf4'")]),s._v(" },\n  { "),a("span",{staticClass:"hljs-attr"},[s._v("label")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'Street Fighter'")]),s._v(", "),a("span",{staticClass:"hljs-attr"},[s._v("episode")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'V'")]),s._v(",   "),a("span",{staticClass:"hljs-attr"},[s._v("uid")]),s._v(": "),a("span",{staticClass:"hljs-string"},[s._v("'sf5'")]),s._v(" },\n]\n")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("You might want to display a list and prove uniqueness using the "),a("code",[s._v("uid")]),s._v(":")])}],e=(a("a15b"),{data:function(){return{country:"Peru",countries:[],filteredCountries:["Spain","Peru","France"],twoCountries:["Spain","France"],treeCountries:["Spain","Peru","France"],allCountries:["France","United States of America","Spain","Peru"],countryCollection:[{label:"Spain"},{label:"Peru"},{label:"France"}],selectedGames:[],streetFighters:[{label:"Street Fighter",episode:"I",uid:"sf1"},{label:"Street Fighter",episode:"II",uid:"sf2"},{label:"Street Fighter",episode:"III",uid:"sf3"},{label:"Street Fighter",episode:"IV",uid:"sf4"},{label:"Street Fighter",episode:"V",uid:"sf5"}]}},watch:{country:function(){console.log("Selected country:",this.country)},countries:function(){console.log("Selected countries:",this.countries.join(", "))}}}),i=e,v=a("2877"),c=Object(v["a"])(i,l,n,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=components-selectable-dropdown-doc.51219fbf.js.map