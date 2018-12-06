(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-sign-up-form-doc"],{"0afc":function(n,t){n.exports='<template>\n  <div class="m-4">\n    <div class="card card-body card-xs mx-auto mb-4">\n      <sign-up-form></sign-up-form>\n    </div>\n    <div class="card card-body card-xs mx-auto">\n      <sign-up-form horizontal></sign-up-form>\n    </div>\n  </div>\n</template>\n\n<script>\n  import { SignUpForm } from \'@/main\'\n\n  export default {\n    components: {\n      SignUpForm\n    }\n  }\n<\/script>\n'},6334:function(n,t,a){"use strict";a.r(t);var e=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",[a("sample-card",{attrs:{component:n.sample,code:n.code}}),a("api-table",{attrs:{api:n.api}})],1)},o=[],i=a("ea9e"),r=a("6968"),s=a("6a89"),c=a.n(s),l=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"m-4"},[a("div",{staticClass:"card card-body card-xs mx-auto mb-4"},[a("sign-up-form")],1),a("div",{staticClass:"card card-body card-xs mx-auto"},[a("sign-up-form",{attrs:{horizontal:""}})],1)])},m=[],p=(a("cadf"),a("551c"),a("097d"),a("504c")),d={components:{SignUpForm:p["SignUpForm"]}},u=d,f=a("2877"),g=Object(f["a"])(u,l,m,!1,null,null,null);g.options.__file="sample.vue";var b=g.exports,h=a("0afc"),v=a.n(h),x={components:{SampleCard:r["a"],ApiTable:i["a"]},data:function(){return{sample:b,code:v.a,api:c.a}}},y=x,_=Object(f["a"])(y,e,o,!1,null,null,null);_.options.__file="doc.vue";t["default"]=_.exports},"6a89":function(n,t){n.exports={description:"SignUpForm",methods:[],displayName:"SignUpForm",props:{action:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('signup-form.action'); }",func:!0},tags:{},comment:"/**\n     * Mailchimp URL to send the data to.\n     */",description:"Mailchimp URL to send the data to."},noLabel:{type:{name:"boolean"},required:"",tags:{},comment:"/**\n     * Disable the main label.\n     */",description:"Disable the main label."},horizontal:{type:{name:"boolean"},required:"",tags:{},comment:"/**\n     * Horizontal layout of the form.\n     */",description:"Horizontal layout of the form."},tracker:{type:{name:"string"},required:"",defaultValue:{value:"function() { return _config.default.get('signup-form.tracker'); }",func:!0},tags:{},comment:"/**\n     * Mailchimp tracker tag to identify the origin.\n     */",description:"Mailchimp tracker tag to identify the origin."}},comment:"/**\n * SignUpForm\n */",tags:{},events:{},slots:{}}}}]);
//# sourceMappingURL=components-sign-up-form-doc.6775489b.js.map