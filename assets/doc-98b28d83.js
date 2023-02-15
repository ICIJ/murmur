import{n as l}from"./main-a83c2354.js";const e=`<span class="hljs-variable">$white</span>:    <span class="hljs-number">#fff</span> !default;
<span class="hljs-variable">$gray-100</span>: <span class="hljs-number">#f8f8f8</span> !default;
<span class="hljs-variable">$gray-200</span>: <span class="hljs-number">#e9e9e9</span> !default;
<span class="hljs-variable">$gray-300</span>: <span class="hljs-number">#dedede</span> !default;
<span class="hljs-variable">$gray-400</span>: <span class="hljs-number">#cccccc</span> !default; <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$gray-500</span>: <span class="hljs-number">#999999</span> !default; <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$gray-600</span>: <span class="hljs-number">#696969</span> !default; <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$gray-700</span>: <span class="hljs-number">#494949</span> !default;
<span class="hljs-variable">$gray-800</span>: <span class="hljs-number">#3c3c3c</span> !default; <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$gray-900</span>: <span class="hljs-number">#212121</span> !default;
<span class="hljs-variable">$black</span>:    <span class="hljs-number">#000</span> !default;

<span class="hljs-variable">$primary</span>: <span class="hljs-number">#ff0000</span> !default;  <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$secondary</span>: <span class="hljs-variable">$gray-500</span> !default;
<span class="hljs-variable">$danger</span>: <span class="hljs-number">#8B0707</span> !default; <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$success</span>: <span class="hljs-number">#46EC4E</span> !default;
<span class="hljs-variable">$info</span>: <span class="hljs-number">#0000FF</span> !default;
<span class="hljs-variable">$warning</span>: <span class="hljs-number">#FFBA00</span> !default;
<span class="hljs-variable">$light</span>: <span class="hljs-variable">$gray-200</span> !default;
<span class="hljs-variable">$dark</span>: <span class="hljs-number">#000</span> !default;

<span class="hljs-variable">$brand-grays</span>: () !default;
<span class="hljs-variable">$brand-grays</span>: <span class="hljs-built_in">map-merge</span>(
  (
    <span class="hljs-string">&quot;gray-lighter&quot;</span>: <span class="hljs-variable">$gray-400</span>,
    <span class="hljs-string">&quot;gray-light&quot;</span>:   <span class="hljs-variable">$gray-500</span>,
    <span class="hljs-string">&quot;gray-dark&quot;</span>:    <span class="hljs-variable">$gray-600</span>,
    <span class="hljs-string">&quot;gray-darker&quot;</span>:  <span class="hljs-variable">$gray-800</span>
  ), 
  <span class="hljs-variable">$brand-grays</span>
);

<span class="hljs-variable">$body-bg</span>: <span class="hljs-variable">$white</span> !default;   <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$body-color</span>: <span class="hljs-variable">$black</span> !default;  <span class="hljs-comment">// Brand color</span>
<span class="hljs-variable">$text-muted</span>: <span class="hljs-variable">$gray-500</span> !default;

<span class="hljs-variable">$component-active-bg</span>: <span class="hljs-variable">$primary</span> !default;
<span class="hljs-variable">$component-active-color</span>: <span class="hljs-variable">$white</span>;

<span class="hljs-variable">$table-dark-bg</span>: <span class="hljs-variable">$gray-800</span> !default;
<span class="hljs-variable">$table-dark-border-color</span>: <span class="hljs-variable">$gray-600</span> !default;

<span class="hljs-variable">$enable-rounded</span>: false !default;
<span class="hljs-variable">$enable-shadows</span>: true !default;
<span class="hljs-variable">$enable-gradients</span>: false !default;

<span class="hljs-variable">$font-family-sans-serif</span>: <span class="hljs-string">&quot;Poppins&quot;</span>, -apple-system, BlinkMacSystemFont, <span class="hljs-string">&quot;Segoe UI&quot;</span>, Roboto, <span class="hljs-string">&quot;Helvetica Neue&quot;</span>, Arial, sans-serif !default;
<span class="hljs-variable">$font-family-serif</span>: <span class="hljs-string">&quot;Merriweather&quot;</span>, Georgia, <span class="hljs-string">&quot;Times New Roman&quot;</span>, Times, serif !default;

<span class="hljs-variable">$headings-font-family</span>: <span class="hljs-variable">$font-family-sans-serif</span> !default;
<span class="hljs-variable">$headings-font-weight</span>: <span class="hljs-number">700</span> !default;

<span class="hljs-variable">$jumbotron-bg</span>: <span class="hljs-variable">$gray-200</span> !default;
<span class="hljs-variable">$jumbotron-font-family</span>: <span class="hljs-string">&quot;Anton&quot;</span>, <span class="hljs-variable">$font-family-sans-serif</span> !default;
<span class="hljs-variable">$jumbotron-font-weight</span>: <span class="hljs-number">400</span> !default;

<span class="hljs-variable">$fade-bg</span>: <span class="hljs-variable">$gray-400</span> !default;
<span class="hljs-variable">$list-group-bg</span>: transparent !default;

<span class="hljs-variable">$input-focus-border-color</span>: <span class="hljs-variable">$secondary</span> !default;
<span class="hljs-variable">$input-bg</span>: <span class="hljs-variable">$gray-100</span> !default;
<span class="hljs-variable">$input-focus-bg</span>: <span class="hljs-variable">$white</span> !default;
<span class="hljs-variable">$input-box-shadow</span>: none !default;

<span class="hljs-variable">$btn-box-shadow</span>: none !default;
<span class="hljs-variable">$btn-font-family</span>: <span class="hljs-variable">$font-family-sans-serif</span>;

<span class="hljs-variable">$form-check-input-gutter</span>: <span class="hljs-number">1.5rem</span> !default;

<span class="hljs-variable">$popover-body-padding-y</span>: <span class="hljs-number">0</span> !default;
<span class="hljs-variable">$popover-body-padding-x</span>: <span class="hljs-number">0</span> !default;
<span class="hljs-variable">$popover-max-width</span>: <span class="hljs-number">300px</span> !default;

<span class="hljs-variable">$popover-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">30px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-variable">$black</span>, <span class="hljs-number">0.15</span>) !default;
<span class="hljs-variable">$dropdown-box-shadow</span>: <span class="hljs-variable">$popover-box-shadow</span> !default;
<span class="hljs-variable">$dropdown-min-width</span>: <span class="hljs-number">14rem</span>;

<span class="hljs-variable">$modal-backdrop-bg</span>: <span class="hljs-variable">$white</span> !default;
<span class="hljs-variable">$modal-lg</span>: <span class="hljs-number">990px</span> !default;
<span class="hljs-variable">$modal-content-box-shadow-xs</span>: <span class="hljs-variable">$popover-box-shadow</span> !default;
<span class="hljs-variable">$modal-content-box-shadow-sm-up</span>: <span class="hljs-variable">$popover-box-shadow</span> !default;

<span class="hljs-variable">$tooltip-max-width</span>: <span class="hljs-number">260px</span> !default;
<span class="hljs-variable">$tooltip-opacity</span>: <span class="hljs-number">1</span> !default;

<span class="hljs-variable">$alert-border-width</span>: <span class="hljs-number">0</span>;

<span class="hljs-comment">// Bootstrap variables and functions must be available everywhere</span>
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;node_modules/bootstrap/scss/_functions.scss&#x27;</span>;
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;node_modules/bootstrap/scss/_variables.scss&#x27;</span>;

<span class="hljs-comment">// Get theses variables to make them available in the doc</span>
<span class="hljs-variable">$theme-colors</span>: none !default;
<span class="hljs-variable">$font-family-monospace</span>: none !default;`,p={data(){return{rawVariables:e}}};var r=function(){var a=this,n=a._self._c;return n("div",{staticClass:"markdown-body"},[a._m(0),a._m(1),n("p",[a._v("Here are all the variables defined in "),n("repository-link",{attrs:{path:"lib/styles/variables.scss"}},[a._v("lib/styles/variables.scss")]),a._v(":")],1),n("pre",{staticClass:"bg-dark p-3"},[n("code",{domProps:{innerHTML:a._s(a.rawVariables)}})])])},t=[function(){var s=this,a=s._self._c;return a("p",[s._v("This guide comes with a set of pre-configured SCSS variables that can be used in conjunction with Boostrap. It is "),a("strong",[s._v("not mandatory")]),s._v(" to uses a custom build of Boostrap with these variables. Yet some components might have a better display with this configuration.")])},function(){var s=this,a=s._self._c;return a("pre",[a("code",{staticClass:"hljs language-scss"},[a("span",{staticClass:"hljs-comment"},[s._v("// You can easily override every variables")]),s._v(`
`),a("span",{staticClass:"hljs-variable"},[s._v("$link-color")]),s._v(": "),a("span",{staticClass:"hljs-number"},[s._v("#c10448")]),s._v(`;

`),a("span",{staticClass:"hljs-comment"},[s._v("// Then, simply import the variables before you import Bootstrap sources")]),s._v(`
`),a("span",{staticClass:"hljs-keyword"},[s._v("@import")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v("'@icij/murmur/lib/styles/variables.scss'")]),s._v(`;
`),a("span",{staticClass:"hljs-keyword"},[s._v("@import")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v("'node_modules/bootstrap/scss/bootstrap'")]),s._v(`;
`),a("span",{staticClass:"hljs-comment"},[s._v("// Optional but recommended: Bootstrap Vue CSS additions")]),s._v(`
`),a("span",{staticClass:"hljs-keyword"},[s._v("@import")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v("'node_modules/bootstrap-vue/dist/bootstrap-vue.css'")]),s._v(`;
`)])])}],c=l(p,r,t,!1,null,null,null,null);const i=c.exports;export{i as default};
