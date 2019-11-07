(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["getting-started-custom-bootstrap-doc"],{"9d0c":function(s,a,n){"use strict";n.r(a);var l=function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",[s._m(0),s._m(1),n("p",[s._v("Here are all the variables defined in "),n("repository-link",{attrs:{path:"lib/styles/variables.scss"}},[s._v("lib/styles/variables.scss")]),s._v(":")],1),n("pre",{staticClass:"bg-dark p-3"},[n("code",{domProps:{innerHTML:s._s(s.rawVariables)}})])])},e=[function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("p",[s._v("This guide comes with a set of pre-configured SCSS variables that can be used in\nconjunction with Boostrap. It is "),n("strong",[s._v("not mandatory")]),s._v(" to uses a custom build of Boostrap\nwith these variables. Yet some components might have a better display with this configuration.")])},function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",{staticClass:"language-scss extra-class"},[n("pre",[n("code",{staticClass:"hljs language-scss"},[n("span",{staticClass:"hljs-comment"},[s._v("// You can easily override every variables")]),s._v("\n"),n("span",{staticClass:"hljs-variable"},[s._v("$link-color")]),s._v(": "),n("span",{staticClass:"hljs-number"},[s._v("#c10448")]),s._v(";\n\n"),n("span",{staticClass:"hljs-comment"},[s._v("// Then, simply import the variables before you import Bootstrap sources")]),s._v("\n@"),n("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" "),n("span",{staticClass:"hljs-string"},[s._v("'@icij/murmur/lib/styles/variables.scss'")]),s._v(";\n@"),n("span",{staticClass:"hljs-keyword"},[s._v("import")]),s._v(" "),n("span",{staticClass:"hljs-string"},[s._v("'node_modules/bootstrap/scss/bootstrap'")]),s._v(";\n")])])])}],p=n("ec63"),r=n.n(p),t={data:function(){return{rawVariables:r.a}}},c=t,i=n("2877"),b=Object(i["a"])(c,l,e,!1,null,null,null);a["default"]=b.exports},ec63:function(s,a){s.exports='<span class="hljs-variable">$tradewind</span>: <span class="hljs-number">#68beb0</span> !default;\n<span class="hljs-variable">$cuttysark</span>: <span class="hljs-number">#50676b</span> !default;\n<span class="hljs-variable">$blumine</span>: <span class="hljs-number">#195172</span> !default;\n<span class="hljs-variable">$mercury</span>: <span class="hljs-number">#e5e5e5</span> !default;\n<span class="hljs-variable">$copper</span>: <span class="hljs-number">#a57a36</span> !default;\n<span class="hljs-variable">$bostonblue</span>: <span class="hljs-number">#3b98ab</span> !default;\n<span class="hljs-variable">$punch</span>:<span class="hljs-number">#A83324</span> !default;\n\n<span class="hljs-variable">$selective-yellow</span>: <span class="hljs-number">#f8b700</span> !default;\n<span class="hljs-variable">$saddle-red</span>: <span class="hljs-number">#852308</span> !default;\n\n<span class="hljs-variable">$primary</span>: <span class="hljs-variable">$saddle-red</span> !default;\n<span class="hljs-variable">$secondary</span>: <span class="hljs-number">#f0f0f0</span> !default;\n<span class="hljs-variable">$tertiary</span>: <span class="hljs-number">#852308</span> !default;\n<span class="hljs-variable">$success</span>: <span class="hljs-number">#28a745</span> !default;\n<span class="hljs-variable">$info</span>: <span class="hljs-variable">$bostonblue</span> !default;\n<span class="hljs-variable">$warning</span>: <span class="hljs-number">#fff0c7</span> !default;\n<span class="hljs-variable">$danger</span>: <span class="hljs-variable">$punch</span> !default;\n<span class="hljs-variable">$light</span>: <span class="hljs-number">#ebebeb</span> !default;\n<span class="hljs-variable">$dark</span>: <span class="hljs-number">#333</span> !default;\n\n<span class="hljs-variable">$event-bg</span>: <span class="hljs-number">#fde7d6</span> !default;\n<span class="hljs-variable">$event-emphasis</span>: <span class="hljs-number">#ab4e3c</span> !default;\n\n<span class="hljs-variable">$device-bg</span>: <span class="hljs-number">#d7eef2</span> !default;\n<span class="hljs-variable">$device-emphasis</span>: <span class="hljs-number">#195172</span> !default;\n\n<span class="hljs-variable">$manufacturer-bg</span>: <span class="hljs-number">#ded2c2</span> !default;\n<span class="hljs-variable">$manufacturer-emphasis</span>: <span class="hljs-number">#806147</span> !default;\n\n<span class="hljs-variable">$home-overview-bg</span>: <span class="hljs-number">#b0dde0</span> !default;\n\n<span class="hljs-variable">$callout-button-bg</span>: <span class="hljs-variable">$dark</span> !default;\n<span class="hljs-variable">$callout-button-color</span>: <span class="hljs-number">#fff</span> !default;\n<span class="hljs-variable">$callout-button-emphasis</span>: <span class="hljs-variable">$copper</span> !default;\n\n<span class="hljs-variable">$border-level-selected</span>: <span class="hljs-number">#c10448</span>;\n\n<span class="hljs-variable">$theme-colors</span>: () !default;\n<span class="hljs-variable">$theme-colors</span>: map-merge((\n  selective-yellow: <span class="hljs-variable">$selective-yellow</span>,\n  saddle-red: <span class="hljs-variable">$saddle-red</span>\n), <span class="hljs-variable">$theme-colors</span>);\n\n<span class="hljs-variable">$body-bg</span>: <span class="hljs-number">#fff</span> !default;\n<span class="hljs-variable">$jumbotron-bg</span>: <span class="hljs-variable">$mercury</span> !default;\n<span class="hljs-variable">$component-active-bg</span>: <span class="hljs-variable">$secondary</span> !default;\n<span class="hljs-variable">$component-active-color</span>: white;\n\n<span class="hljs-variable">$input-focus-border-color</span>: darken(<span class="hljs-variable">$component-active-bg</span>, <span class="hljs-number">20</span>) !default;\n<span class="hljs-variable">$input-box-shadow</span>: none !default;\n<span class="hljs-variable">$btn-box-shadow</span>: none !default;\n\n<span class="hljs-variable">$table-dark-bg</span>: darken(<span class="hljs-variable">$cuttysark</span>, <span class="hljs-number">20%</span>) !default;\n<span class="hljs-variable">$table-dark-border-color</span>: lighten(<span class="hljs-variable">$table-dark-bg</span>, <span class="hljs-number">7.5</span>) !default;\n\n<span class="hljs-variable">$enable-rounded</span>: false !default;\n<span class="hljs-variable">$enable-shadows</span>: true !default;\n<span class="hljs-variable">$enable-gradients</span>: false !default;\n\n<span class="hljs-variable">$font-family-sans-serif</span>: <span class="hljs-string">"Lato"</span>, -apple-system, BlinkMacSystemFont, <span class="hljs-string">"Segoe UI"</span>, Roboto, <span class="hljs-string">"Helvetica Neue"</span>, Arial, sans-serif !default;\n<span class="hljs-variable">$font-family-serif</span>: <span class="hljs-string">"Merriweather"</span>, Georgia, <span class="hljs-string">"Times New Roman"</span>, Times, serif !default;\n\n<span class="hljs-variable">$headings-font-family</span>: <span class="hljs-string">"Fira Sans"</span>, <span class="hljs-variable">$font-family-serif</span> !default;\n<span class="hljs-variable">$headings-font-weight</span>: <span class="hljs-number">700</span> !default;\n<span class="hljs-variable">$text-muted</span>: <span class="hljs-number">#717171</span> !default;\n\n<span class="hljs-variable">$fade-bg</span>: <span class="hljs-number">#ebe6e3</span> !default;\n<span class="hljs-variable">$list-group-bg</span>: transparent !default;\n\n<span class="hljs-variable">$input-focus-border-color</span>: <span class="hljs-variable">$secondary</span> !default;\n<span class="hljs-variable">$input-bg</span>: <span class="hljs-number">#f8f8f8</span> !default;\n<span class="hljs-variable">$input-focus-bg</span>: <span class="hljs-number">#fff</span> !default;\n\n<span class="hljs-variable">$form-check-input-gutter</span>: <span class="hljs-number">1.5rem</span> !default;\n\n<span class="hljs-variable">$popover-body-padding-y</span>: <span class="hljs-number">0</span> !default;\n<span class="hljs-variable">$popover-body-padding-x</span>: <span class="hljs-number">0</span> !default;\n<span class="hljs-variable">$popover-max-width</span>: <span class="hljs-number">300px</span> !default;\n\n<span class="hljs-variable">$popover-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">30px</span> -<span class="hljs-number">5px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.15</span>) !default;\n<span class="hljs-variable">$dropdown-box-shadow</span>: <span class="hljs-variable">$popover-box-shadow</span> !default;\n<span class="hljs-variable">$dropdown-min-width</span>: <span class="hljs-number">14rem</span>;\n\n<span class="hljs-variable">$modal-backdrop-bg</span>: <span class="hljs-number">#fff</span> !default;\n<span class="hljs-variable">$modal-lg</span>: <span class="hljs-number">990px</span> !default;\n<span class="hljs-variable">$modal-content-box-shadow-xs</span>: <span class="hljs-variable">$popover-box-shadow</span> !default;\n<span class="hljs-variable">$modal-content-box-shadow-sm-up</span>: <span class="hljs-variable">$popover-box-shadow</span> !default;\n\n<span class="hljs-variable">$tooltip-max-width</span>: <span class="hljs-number">260px</span> !default;\n<span class="hljs-variable">$tooltip-opacity</span>: <span class="hljs-number">1</span> !default;\n\n<span class="hljs-comment">// Bootstrap variables and functions must be available everywhere</span>\n@<span class="hljs-keyword">import</span> <span class="hljs-string">\'node_modules/bootstrap/scss/_functions.scss\'</span>;\n@<span class="hljs-keyword">import</span> <span class="hljs-string">\'node_modules/bootstrap/scss/_variables.scss\'</span>;\n'}}]);
//# sourceMappingURL=getting-started-custom-bootstrap-doc.481a612e.js.map