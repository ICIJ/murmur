(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["content-placeholder"],{"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,n){var r=n("52a7"),i=n("4630"),o=n("6821"),a=n("6a99"),c=n("69a8"),s=n("c69a"),l=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?l:function(t,e){if(t=o(t),e=a(e,!0),s)try{return l(t,e)}catch(n){}if(c(t,e))return i(!r.f.call(t,e),t[e])}},"214f":function(t,e,n){"use strict";var r=n("32e9"),i=n("2aba"),o=n("79e5"),a=n("be13"),c=n("2b4c");t.exports=function(t,e,n){var s=c(t),l=n(a,s,""[t]),u=l[0],f=l[1];o(function(){var e={};return e[s]=function(){return 7},7!=""[t](e)})&&(i(String.prototype,t,u),r(RegExp.prototype,s,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},"28a5":function(t,e,n){n("214f")("split",2,function(t,e,r){"use strict";var i=n("aae3"),o=r,a=[].push,c="split",s="length",l="lastIndex";if("c"=="abbc"[c](/(b)*/)[1]||4!="test"[c](/(?:)/,-1)[s]||2!="ab"[c](/(?:ab)*/)[s]||4!="."[c](/(.?)(.?)/)[s]||"."[c](/()()/)[s]>1||""[c](/.?/)[s]){var u=void 0===/()??/.exec("")[1];r=function(t,e){var n=String(this);if(void 0===t&&0===e)return[];if(!i(t))return o.call(n,t,e);var r,c,f,p,d,h=[],b=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,v=void 0===e?4294967295:e>>>0,x=new RegExp(t.source,b+"g");u||(r=new RegExp("^"+x.source+"$(?!\\s)",b));while(c=x.exec(n)){if(f=c.index+c[0][s],f>g&&(h.push(n.slice(g,c.index)),!u&&c[s]>1&&c[0].replace(r,function(){for(d=1;d<arguments[s]-2;d++)void 0===arguments[d]&&(c[d]=void 0)}),c[s]>1&&c.index<n[s]&&a.apply(h,c.slice(1)),p=c[0][s],g=f,h[s]>=v))break;x[l]===c.index&&x[l]++}return g===n[s]?!p&&x.test("")||h.push(""):h.push(n.slice(g)),h[s]>v?h.slice(0,v):h}}else"0"[c](void 0,0)[s]&&(r=function(t,e){return void 0===t&&0===e?[]:o.call(this,t,e)});return[function(n,i){var o=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,o,i):r.call(String(o),n,i)},r]})},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"5dbc":function(t,e,n){var r=n("d3f4"),i=n("8b97").set;t.exports=function(t,e,n){var o,a=e.constructor;return a!==n&&"function"==typeof a&&(o=a.prototype)!==n.prototype&&r(o)&&i&&i(t,o),t}},"6b54":function(t,e,n){"use strict";n("3846");var r=n("cb7c"),i=n("0bfb"),o=n("9e1e"),a="toString",c=/./[a],s=function(t){n("2aba")(RegExp.prototype,a,t,!0)};n("79e5")(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?s(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):c.name!=a&&s(function(){return c.call(this)})},"79ec":function(t,e,n){"use strict";var r=n("ebaa"),i=n.n(r);i.a},"8b97":function(t,e,n){var r=n("d3f4"),i=n("cb7c"),o=function(t,e){if(i(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:o}},9093:function(t,e,n){var r=n("ce10"),i=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},aa77:function(t,e,n){var r=n("5ca1"),i=n("be13"),o=n("79e5"),a=n("fdef"),c="["+a+"]",s="​",l=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),f=function(t,e,n){var i={},c=o(function(){return!!a[t]()||s[t]()!=s}),l=i[t]=c?e(p):a[t];n&&(i[n]=l),r(r.P+r.F*c,"String",i)},p=f.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},aae3:function(t,e,n){var r=n("d3f4"),i=n("2d95"),o=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==i(t))}},ac6a:function(t,e,n){for(var r=n("cadf"),i=n("0d58"),o=n("2aba"),a=n("7726"),c=n("32e9"),s=n("84f2"),l=n("2b4c"),u=l("iterator"),f=l("toStringTag"),p=s.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=i(d),b=0;b<h.length;b++){var g,v=h[b],x=d[v],y=a[v],_=y&&y.prototype;if(_&&(_[u]||c(_,u,p),_[f]||c(_,f,v),s[v]=p,x))for(g in r)_[g]||o(_,g,r[g],!0)}},ad57:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-placeholder"},[n("div",{staticClass:"content-placeholder__wrapper",style:{backgroundSize:t.size}},t._l(t.formattedRows,function(e,r){return n("div",{key:r,staticClass:"content-placeholder__wrapper__row",style:{height:e.height}},t._l(e.boxes,function(e,r){return n("div",{key:r,style:e.style},[e.subClass?n("div",{class:e.subClass}):t._e()])}))}))])}],o=(n("cadf"),n("551c"),n("097d"),n("ac6a"),n("28a5"),n("c5f6"),n("6b54"),[{height:"1em",boxes:[[0,"50%"],["5%","30%"],["5%","10%"]]}]);function a(t){return Number(t).toString()===t.toString()}function c(t){var e=["px","%","em","rem"],n=!1;return e.forEach(function(e){Number(t.split(e)[0])&&""===t.split(e)[1]&&2===t.split(e).length&&(n=!0)}),n}function s(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"box",i=[];return 0!==t&&(a(t)?i.push({style:"flex-grow: ".concat(t,"; flex-shrink: 0; flex-basis: 0;"),subClass:r}):c(t)&&i.push({style:"flex-grow: 0; flex-shrink: 0; flex-basis: ".concat(t,";"),subClass:r})),a(e)?i.push({style:"flex-grow: ".concat(e,"; flex-shrink: 0; flex-basis: 0;")}):c(e)&&i.push({style:"flex-grow: 0; flex-shrink: 0; flex-basis: ".concat(e,";")}),n&&i.push({style:"flex-grow: 1; flex-shrink: 0; flex-basis: 0;",subClass:r}),i}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"box",n=[];return t.forEach(function(t){var r=[],i={};i.height=t.height,t.boxes.forEach(function(n,i){var o=i===t.boxes.length-1;r=r.concat(s(n[0],n[1],o,e))}),i.boxes=r,n.push(i)}),n}var u={props:{rows:{type:Array,required:!1},size:{type:String,default:"250%"}},computed:{formattedRows:function(){return l(this.rows,"content-placeholder__wrapper__row__box")}}},f=u,p=(n("79ec"),n("2877")),d=Object(p["a"])(f,r,i,!1,null,"e47c0bfc",null);d.options.__file="ContentPlaceholder.vue";e["a"]=d.exports},c5f6:function(t,e,n){"use strict";var r=n("7726"),i=n("69a8"),o=n("2d95"),a=n("5dbc"),c=n("6a99"),s=n("79e5"),l=n("9093").f,u=n("11e9").f,f=n("86cc").f,p=n("aa77").trim,d="Number",h=r[d],b=h,g=h.prototype,v=o(n("2aeb")(g))==d,x="trim"in String.prototype,y=function(t){var e=c(t,!1);if("string"==typeof e&&e.length>2){e=x?e.trim():p(e,3);var n,r,i,o=e.charCodeAt(0);if(43===o||45===o){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+e}for(var a,s=e.slice(2),l=0,u=s.length;l<u;l++)if(a=s.charCodeAt(l),a<48||a>i)return NaN;return parseInt(s,r)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(v?s(function(){g.valueOf.call(n)}):o(n)!=d)?a(new b(y(e)),n,h):y(e)};for(var _,m=n("9e1e")?l(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;m.length>S;S++)i(b,_=m[S])&&!i(h,_)&&f(h,_,u(b,_));h.prototype=g,g.constructor=h,n("2aba")(r,d,h)}},ebaa:function(t,e,n){},ecb4:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h3",{attrs:{id:"section-contentplaceholder"}},[t._v("Content Placeholder")]),n("p",{staticClass:"mb-2"},[t._v("\n    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n  ")]),n("div",{staticClass:"card card-block card-xs"},[n("content-placeholder",{staticClass:"m-2"}),n("content-placeholder",{staticClass:"m-2"}),n("content-placeholder",{staticClass:"m-2"}),n("content-placeholder",{staticClass:"m-2"})],1)])},i=[],o=n("ad57"),a={components:{ContentPlaceholder:o["a"]}},c=a,s=n("2877"),l=Object(s["a"])(c,r,i,!1,null,null,null);l.options.__file="doc.vue";e["default"]=l.exports},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=content-placeholder.17a7ce01.js.map