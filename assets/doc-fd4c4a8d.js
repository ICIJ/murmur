import{n as t,I as e,B as o,a as r,S as c,A as h}from"./main-a83c2354.js";const i={components:{ImddbHeader:e,BDropdownItem:o,BNavItemDropdown:r},data(){return{dropdownItems:[{label:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",href:"https://www.pirhoo.com"},{label:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",href:"https://www.pirhoo.com"},{label:"Lorem ipsum dolor sit amet",href:"https://www.pirhoo.com"},{label:"culpa qui officia deserunt mollit anim id est laborum",href:"https://www.pirhoo.com"},{label:"Lorem dolor sit amet",href:"https://www.pirhoo.com"}]}},mounted(){setTimeout(()=>{this.$refs.header.setLanguages([{label:"English",href:"/",active:!0},{label:"Français",href:"/"}])},500)}};var m=function(){var s=this,a=s._self._c;return a("div",{staticClass:"full-width"},[a("imddb-header",{ref:"header",attrs:{"no-headroom":"",position:"relative"}},[a("template",{slot:"navbar"},[a("ul",{staticClass:"navbar-nav mr-auto"},[a("b-nav-item-dropdown",{on:{show:function(n){return s.$root.$emit("bv::hide::popover")}}},[a("template",{slot:"button-content"},[s._v(" A long project name ")]),s._l(s.dropdownItems,function(n,p){return a("b-dropdown-item",s._b({key:p,attrs:{href:n.href}},"b-dropdown-item",{active:!!n.active},!1),[s._v(" "+s._s(n.label)+" ")])})],2)],1)])],2)],1)},j=[],d=t(i,m,j,!1,null,null,null,null);const u=d.exports,g=`<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;full-width&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">imddb-header</span> <span class="hljs-attr">no-headroom</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;relative&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;navbar&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;navbar-nav mr-auto&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">b-nav-item-dropdown</span> @<span class="hljs-attr">show</span>=<span class="hljs-string">&quot;$root.$emit(&#x27;bv::hide::popover&#x27;)&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;button-content&quot;</span>&gt;</span>
              A long project name
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">b-dropdown-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, $index) in dropdownItems&quot;</span>  <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;$index&quot;</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">&quot;item.href&quot;</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">&quot;{ active: !!item.active }&quot;</span>&gt;</span>
              {{ item.label }}
            <span class="hljs-tag">&lt;/<span class="hljs-name">b-dropdown-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">b-nav-item-dropdown</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">imddb-header</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ImddbHeader</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@lib/main&#x27;</span>
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">BDropdownItem</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;bootstrap-vue/esm/components/dropdown/dropdown-item&#x27;</span>
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">BNavItemDropdown</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;bootstrap-vue/esm/components/nav/nav-item-dropdown&#x27;</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
      <span class="hljs-title class_">ImddbHeader</span>,
      <span class="hljs-title class_">BDropdownItem</span>,
      <span class="hljs-title class_">BNavItemDropdown</span>
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">dropdownItems</span>: [
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Lorem ipsum dolor sit amet, consectetur adipisicing elit&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&quot;https://www.pirhoo.com&quot;</span> },
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris &#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&quot;https://www.pirhoo.com&quot;</span> },
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Lorem ipsum dolor sit amet&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&quot;https://www.pirhoo.com&quot;</span> },
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;culpa qui officia deserunt mollit anim id est laborum&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&quot;https://www.pirhoo.com&quot;</span> },
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Lorem dolor sit amet&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&quot;https://www.pirhoo.com&quot;</span> },
        ]
      }
    },
    mounted () {
      <span class="hljs-comment">// Add languages after a first delay (like )</span>
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">$refs</span>.<span class="hljs-property">header</span>.<span class="hljs-title function_">setLanguages</span>([
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;English&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">true</span> },
          { <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Français&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;/&#x27;</span> }
        ])
      }, <span class="hljs-number">500</span>)
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;scss&quot;</span>&gt;</span><span class="language-css">
  <span class="hljs-selector-class">.full-width</span> {
    <span class="hljs-attribute">overflow</span>: auto;

    <span class="hljs-selector-class">.imddb-header</span> {
      <span class="hljs-attribute">min-width</span>: <span class="hljs-number">990px</span>;
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
`,w={components:{SampleCard:c,ApiTable:h},data(){return{sample:u,code:g}}};var b=function(){var s=this,a=s._self._c;return a("div",{staticClass:"markdown-body"},[a("p",[s._v("A component to create header with generic features.")]),a("p",[a("sample-card",{attrs:{title:"",description:"",component:s.sample,code:s.code}})],1),a("api-table",{attrs:{path:"components/ImddbHeader.vue"}})],1)},f=[],v=t(w,b,f,!1,null,null,null,null);const q=v.exports;export{q as default};
