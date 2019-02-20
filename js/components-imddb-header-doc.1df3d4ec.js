(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-imddb-header-doc"],{"026f":function(s,a){s.exports='<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"full-width"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">imddb-header</span> <span class="hljs-attr">no-headroom</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"relative"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"header"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"navbar"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar-nav mr-auto"</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">b-nav-dropdown</span> @<span class="hljs-attr">show</span>=<span class="hljs-string">"$root.$emit(\'bv::hide::popover\')"</span>&gt;</span>\n            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"button-content"</span>&gt;</span>\n              A long project name\n            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n            <span class="hljs-tag">&lt;<span class="hljs-name">b-dropdown-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, $index) in dropdownItems"</span>  <span class="hljs-attr">:key</span>=<span class="hljs-string">"$index"</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"item.href"</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">"{ active: !!item.active }"</span>&gt;</span>\n              {{ item.label }}\n            <span class="hljs-tag">&lt;/<span class="hljs-name">b-dropdown-item</span>&gt;</span>\n          <span class="hljs-tag">&lt;/<span class="hljs-name">b-nav-dropdown</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">imddb-header</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">\n  <span class="hljs-keyword">import</span> { ImddbHeader } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@/main\'</span>\n  <span class="hljs-keyword">import</span> bDropdownItem <span class="hljs-keyword">from</span> <span class="hljs-string">\'bootstrap-vue/es/components/dropdown/dropdown-item\'</span>\n  <span class="hljs-keyword">import</span> bNavDropdown <span class="hljs-keyword">from</span> <span class="hljs-string">\'bootstrap-vue/es/components/nav/nav-item-dropdown\'</span>\n\n  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {\n    <span class="hljs-attr">components</span>: {\n      ImddbHeader,\n      bDropdownItem,\n      bNavDropdown\n    },\n    data () {\n      <span class="hljs-keyword">return</span> {\n        <span class="hljs-attr">dropdownItems</span>: [\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'Lorem ipsum dolor sit amet, consectetur adipisicing elit\'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">"https://www.pirhoo.com"</span> },\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">"https://www.pirhoo.com"</span> },\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'Lorem ipsum dolor sit amet\'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">"https://www.pirhoo.com"</span> },\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'culpa qui officia deserunt mollit anim id est laborum\'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">"https://www.pirhoo.com"</span> },\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'Lorem dolor sit amet\'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">"https://www.pirhoo.com"</span> },\n        ]\n      }\n    },\n    mounted () {\n      <span class="hljs-comment">// Add languages after a first delay (like )</span>\n      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n        <span class="hljs-keyword">this</span>.$refs.header.setLanguages([\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'English\'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">\'/\'</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">true</span> },\n          { <span class="hljs-attr">label</span>: <span class="hljs-string">\'Français\'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">\'/\'</span> }\n        ])\n      }, <span class="hljs-number">500</span>)\n    }\n  }\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">\n  .full-width {\n    overflow: auto;\n\n    .imddb-header {\n      min-width: 990px;\n    }\n  }\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>\n'},"1a12":function(s,a,n){"use strict";var t=n("25f7"),e=n.n(t);e.a},"25f7":function(s,a,n){},"4f8d":function(s,a){s.exports={description:"ImddbHeader",methods:[],displayName:"ImddbHeader",props:{position:{type:{name:"string"},required:"",defaultValue:{value:'"fixed"',func:!1},tags:{},comment:"/**\n     * CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default).\n     */",description:"CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default)."},noHeadroom:{type:{name:"boolean"},required:"",tags:{},comment:"/**\n     * Disable Headroom for hiding header until needed.\n     */",description:"Disable Headroom for hiding header until needed."},project:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('project.name'); }",func:!0},tags:{},comment:"/**\n     * Project name, to display next to ICIJ logo\n     */",description:"Project name, to display next to ICIJ logo"},title:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('app.name'); }",func:!0},tags:{},comment:"/**\n     * App name, to display next to project name\n     */",description:"App name, to display next to project name"},dropdownItems:{type:{name:"array"},required:"",defaultValue:{value:"function() { return _config.default.get('imddb-header.dropdown.items'); }",func:!0},tags:{},comment:"/**\n     * An array of objects defining dropdown items. Each item defines a <em>label</em> and a <em>href</em>.\n     */",description:"An array of objects defining dropdown items. Each item defines a <em>label</em> and a <em>href</em>."},homeUrl:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('app.home'); }",func:!0},tags:{},comment:"/**\n     * Target link of the ICIJ logo and project name.\n     */",description:"Target link of the ICIJ logo and project name."}},comment:"/**\n * ImddbHeader\n */",tags:{},events:{},slots:{brand:{description:"Redefines brand"},navbar:{description:"Redefines the main navbar block (containing the dropdown)"}}}},ad67:function(s,a,n){"use strict";n.r(a);var t=function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",[n("p",[s._v("A component to create header with generic features.")]),n("sample-card",{attrs:{title:"",description:"",component:s.sample,code:s.code}}),n("api-table",{attrs:{api:s.api}})],1)},e=[],l=n("ea9e"),p=n("6968"),r=n("4f8d"),o=n.n(r),i=function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",{staticClass:"full-width"},[n("imddb-header",{ref:"header",attrs:{"no-headroom":"",position:"relative"}},[n("template",{slot:"navbar"},[n("ul",{staticClass:"navbar-nav mr-auto"},[n("b-nav-dropdown",{on:{show:function(a){return s.$root.$emit("bv::hide::popover")}}},[n("template",{slot:"button-content"},[s._v("\n            A long project name\n          ")]),s._l(s.dropdownItems,function(a,t){return n("b-dropdown-item",s._b({key:t,attrs:{href:a.href}},"b-dropdown-item",{active:!!a.active},!1),[s._v("\n            "+s._s(a.label)+"\n          ")])})],2)],1)])],2)],1)},c=[],d=n("504c"),m=n("0096"),h=n("485d"),j={components:{ImddbHeader:d["ImddbHeader"],bDropdownItem:m["a"],bNavDropdown:h["a"]},data:function(){return{dropdownItems:[{label:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",href:"https://www.pirhoo.com"},{label:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",href:"https://www.pirhoo.com"},{label:"Lorem ipsum dolor sit amet",href:"https://www.pirhoo.com"},{label:"culpa qui officia deserunt mollit anim id est laborum",href:"https://www.pirhoo.com"},{label:"Lorem dolor sit amet",href:"https://www.pirhoo.com"}]}},mounted:function(){var s=this;setTimeout(function(){s.$refs.header.setLanguages([{label:"English",href:"/",active:!0},{label:"Français",href:"/"}])},500)}},u=j,g=(n("1a12"),n("2877")),f=Object(g["a"])(u,i,c,!1,null,null,null),b=f.exports,w=n("026f"),v=n.n(w),y={components:{SampleCard:p["a"],ApiTable:l["a"]},data:function(){return{sample:b,code:v.a,api:o.a}}},I=y,k=Object(g["a"])(I,t,e,!1,null,null,null);a["default"]=k.exports}}]);
//# sourceMappingURL=components-imddb-header-doc.1df3d4ec.js.map