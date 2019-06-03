(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-generic-header-doc"],{1979:function(s,a){s.exports='<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"full-width card m-4"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">generic-header</span> <span class="hljs-attr">no-headroom</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"relative"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">generic-header</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">\n  <span class="hljs-keyword">import</span> { GenericFooter } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@/main\'</span>\n\n  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {\n    <span class="hljs-attr">components</span>: {\n      GenericFooter\n    }\n  }\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span>\n  .full-width {\n    overflow: auto;\n\n    .generic-header {\n      width: 100vw;\n      max-width: 1000px;\n    }\n  }\n<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>\n'},3497:function(s,a,n){"use strict";var e=n("fe36"),t=n.n(e);t.a},"8c22":function(s,a){s.exports={displayName:"ImddbHeader",description:"ImddbHeader",tags:{},props:{position:{description:"CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default).",tags:{},type:{name:"string"},required:"",defaultValue:{func:!1,value:"'fixed'"}},noHeadroom:{description:"Disable Headroom for hiding header until needed.",tags:{},type:{name:"boolean"},required:""},homeUrl:{description:"Target link of the ICIJ logo and project name.",tags:{},type:{name:"string"},required:"",defaultValue:{func:!0,value:"() => config.get('app.home')"}},brandOptions:{description:"Default options to pass to the brand component",tags:{},type:{name:"object"},required:"",defaultValue:{func:!1,value:"{}"}}},events:{},methods:[],slots:{brand:{description:"Redefines brand",bindings:{}}}}},e082:function(s,a,n){"use strict";n.r(a);var e=function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",[n("p",[s._v("A component to create header with generic features.")]),n("sample-card",{attrs:{title:"",description:"",component:s.sample,code:s.code}}),n("api-table",{attrs:{api:s.api}})],1)},t=[],l=n("ea9e"),p=n("6968"),r=n("8c22"),c=n.n(r),o=function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",{staticClass:"full-width card m-4"},[n("generic-header",{attrs:{"no-headroom":"",position:"relative"}})],1)},i=[],d=n("504c"),h={components:{GenericFooter:d["GenericFooter"]}},m=h,u=(n("3497"),n("2877")),g=Object(u["a"])(m,o,i,!1,null,null,null),j=g.exports,f=n("1979"),v=n.n(f),b={components:{SampleCard:p["a"],ApiTable:l["a"]},data:function(){return{sample:j,code:v.a,api:c.a}}},w=b,y=Object(u["a"])(w,e,t,!1,null,null,null);a["default"]=y.exports},fe36:function(s,a,n){}}]);
//# sourceMappingURL=components-generic-header-doc.6a93311b.js.map