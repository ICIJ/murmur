(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-main-header-doc"],{"40a4":function(e,n){e.exports={description:"MainHeader",methods:[],displayName:"MainHeader",props:{position:{type:{name:"string"},required:"",defaultValue:{value:'"fixed"',func:!1},tags:{},comment:"/**\n     * CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default).\n     */",description:"CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default)."},noHeadroom:{type:{name:"boolean"},required:"",tags:{},comment:"/**\n     * Disable Headroom for hiding header until needed.\n     */",description:"Disable Headroom for hiding header until needed."},project:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('project.name'); }",func:!0},tags:{},comment:"/**\n     * Project name, to display next to ICIJ logo\n     */",description:"Project name, to display next to ICIJ logo"},title:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('app.name'); }",func:!0},tags:{},comment:"/**\n     * App name, to display next to project name\n     */",description:"App name, to display next to project name"},dropdownItems:{type:{name:"array"},required:"",defaultValue:{value:"function() { return _config.default.get('main-header.dropdown.items'); }",func:!0},tags:{},comment:"/**\n     * An array of objects defining dropdown items. Each item defines a <em>label</em> and a <em>href</em>.\n     */",description:"An array of objects defining dropdown items. Each item defines a <em>label</em> and a <em>href</em>."},homeUrl:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('app.home'); }",func:!0},tags:{},comment:"/**\n     * Target link of the ICIJ logo and project name.\n     */",description:"Target link of the ICIJ logo and project name."}},comment:"/**\n * MainHeader\n */",tags:{},events:{},slots:{brand:{description:"Redefines brand"},navbar:{description:"Redefines the main navbar block (containing the dropdown)"}}}},"988a":function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("p",{staticClass:"text-muted"},[e._v("A component to create header with generic features.")]),t("sample-card",{attrs:{title:"",description:"",component:e.sample,code:e.code}}),t("api-table",{attrs:{api:e.api}})],1)},a=[],r=(t("cadf"),t("551c"),t("097d"),t("ea9e")),i=t("6968"),m=t("40a4"),d=t.n(m),p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("main-header",{attrs:{"no-headroom":"",position:"relative"}},[t("template",{slot:"navbar"},[t("ul",{staticClass:"navbar-nav mr-auto"},[t("b-nav-dropdown",{on:{show:function(n){e.$root.$emit("bv::hide::popover")}}},[t("template",{slot:"button-content"},[e._v("\n          A long project name\n        ")]),e._l(e.dropdownItems,function(n,o){return t("b-dropdown-item",e._b({key:o,attrs:{href:n.href}},"b-dropdown-item",{active:!!n.active},!1),[e._v("\n          "+e._s(n.label)+"\n        ")])})],2)],1)])],2)},l=[],s=t("504c"),c=t("0096"),u=t("485d"),f={components:{MainHeader:s["MainHeader"],bDropdownItem:c["a"],bNavDropdown:u["a"]},data:function(){return{dropdownItems:[{label:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",href:"https://www.pirhoo.com"},{label:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",href:"https://www.pirhoo.com"},{label:"Lorem ipsum dolor sit amet",href:"https://www.pirhoo.com"},{label:"culpa qui officia deserunt mollit anim id est laborum",href:"https://www.pirhoo.com"},{label:"Lorem dolor sit amet",href:"https://www.pirhoo.com"}]}}},h=f,b=t("2877"),w=Object(b["a"])(h,p,l,!1,null,null,null);w.options.__file="sample.vue";var v=w.exports,g=t("cb50"),_=t.n(g),x={components:{SampleCard:i["a"],ApiTable:r["a"]},data:function(){return{sample:v,code:_.a,api:d.a}}},y=x,I=Object(b["a"])(y,o,a,!1,null,null,null);I.options.__file="doc.vue";n["default"]=I.exports},cb50:function(e,n){e.exports='<template>\n  <main-header no-headroom position="relative">\n    <template slot="navbar">\n      <ul class="navbar-nav mr-auto">\n        <b-nav-dropdown @show="$root.$emit(\'bv::hide::popover\')">\n          <template slot="button-content">\n            A long project name\n          </template>\n          <b-dropdown-item v-for="(item, $index) in dropdownItems"  :key="$index" :href="item.href" v-bind="{ active: !!item.active }">\n            {{ item.label }}\n          </b-dropdown-item>\n        </b-nav-dropdown>\n      </ul>\n    </template>\n  </main-header>\n</template>\n\n\n\n<script>\n  import { MainHeader } from \'@/main\'\n  import bDropdownItem from \'bootstrap-vue/es/components/dropdown/dropdown-item\'\n  import bNavDropdown from \'bootstrap-vue/es/components/nav/nav-item-dropdown\'\n\n  export default {\n    components: {\n      MainHeader,\n      bDropdownItem,\n      bNavDropdown\n    },\n    data () {\n      return {\n        dropdownItems: [\n          { label: \'Lorem ipsum dolor sit amet, consectetur adipisicing elit\', href: "https://www.pirhoo.com" },\n          { label: \'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \', href: "https://www.pirhoo.com" },\n          { label: \'Lorem ipsum dolor sit amet\', href: "https://www.pirhoo.com" },\n          { label: \'culpa qui officia deserunt mollit anim id est laborum\', href: "https://www.pirhoo.com" },\n          { label: \'Lorem dolor sit amet\', href: "https://www.pirhoo.com" },\n        ]\n      }\n    }\n  }\n<\/script>\n'}}]);
//# sourceMappingURL=components-main-header-doc.7fb03288.js.map