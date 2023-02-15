import{n,G as t,S as e,A as p}from"./main-a83c2354.js";const c={components:{GenericFooter:t}};var r=function(){var a=this,s=a._self._c;return s("div",{staticClass:"full-width card m-4"},[s("generic-header",{attrs:{"no-headroom":"",position:"relative"}})],1)},o=[],h=n(c,r,o,!1,null,null,null,null);const i=h.exports,j=`<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;full-width card m-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">generic-header</span> <span class="hljs-attr">no-headroom</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;relative&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">generic-header</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">GenericFooter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@lib/main&#x27;</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
      <span class="hljs-title class_">GenericFooter</span>
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;scss&quot;</span>&gt;</span><span class="language-css">
  <span class="hljs-selector-class">.full-width</span> {
    <span class="hljs-attribute">overflow</span>: auto;

    <span class="hljs-selector-class">.generic-header</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
      <span class="hljs-attribute">max-width</span>: <span class="hljs-number">1000px</span>;
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
`,m={components:{SampleCard:e,ApiTable:p},data(){return{sample:i,code:j}}};var d=function(){var a=this,s=a._self._c;return s("div",{staticClass:"markdown-body"},[s("p",[a._v("A component to create header with generic features.")]),s("p",[s("sample-card",{attrs:{title:"",description:"",component:a.sample,code:a.code}})],1),s("api-table",{attrs:{path:"components/GenericHeader.vue"}})],1)},u=[],_=n(m,d,u,!1,null,null,null,null);const v=_.exports;export{v as default};
