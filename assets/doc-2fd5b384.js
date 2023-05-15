import{n}from"./main-0ff1ec8d.js";const l={data(){return{dataUrl:"https://gist.githubusercontent.com/pirhoo/a2cdb6de5e3e816c0e9d80226806a688/raw/da3fdf3488d6bd68c6cfd9b89943b750ac65fd33/line-approvals.json",socialMode:!1}}};var i=function(){var s=this,a=s._self._c;return a("div",{staticClass:"markdown-body"},[a("p",[s._v("Component do draw dead simple line charts.")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"p-4"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"d-flex align-items-baseline"')]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
      High-risk devices are being approved faster in the US    
    `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-nowrap ml-4"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("switch")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"socialMode"')]),s._v(">")]),s._v(`
      Social mode
    `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v(`
    The average time that it takes the Food and Drug Administration to review and approve a device through its pre-market approval process has dropped by more than 200 days since 1996.
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("line-chart")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"dataUrl"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":social-mode")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"socialMode"')]),s._v(" />")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v(`
    Note: This chart shows the time, in days, between an application being received by the FDA and the device being approved. Source: U.S. Food and Drug Administration, ICIJ and AP analysis
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"p-4"},[a("div",{staticClass:"d-flex align-items-baseline"},[a("h4",[s._v(" High-risk devices are being approved faster in the US ")]),a("b-form-checkbox",{staticClass:"text-nowrap ml-4",attrs:{switch:""},model:{value:s.socialMode,callback:function(t){s.socialMode=t},expression:"socialMode"}},[s._v(" Social mode ")])],1),a("p",{staticClass:"text-muted"},[s._v(" The average time that it takes the Food and Drug Administration to review and approve a device through its pre-market approval process has dropped by more than 200 days since 1996. ")]),a("line-chart",{staticClass:"my-4",attrs:{data:s.dataUrl,"social-mode":s.socialMode}}),a("p",{staticClass:"text-muted small"},[s._v(" Note: This chart shows the time, in days, between an application being received by the FDA and the device being approved. Source: U.S. Food and Drug Administration, ICIJ and AP analysis ")])],1)])],1),a("collapsible-block",{attrs:{label:"Show the data structure"}},[a("pre",[a("code",{staticClass:"hljs language-json"},[a("span",{staticClass:"hljs-punctuation"},[s._v("[")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"1995"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("284.1733871")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"1996"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("262.2768595")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"1997"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("196.8200456")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"1998"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("162.8752475")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"1999"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("136.9506399")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2000"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("124.3350877")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2001"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("125.4939024")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2002"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("122.1694656")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2003"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("111.5")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2004"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("127.8108974")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2005"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("96.66352624")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2006"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("94.98603352")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2007"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("104.7544803")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2008"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("100.3127517")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2009"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("96.34450402")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2010"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("85.1799458")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2011"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("96.70278777")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2012"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("88.19991705")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2013"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("79.83682187")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2014"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("78.45282258")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2015"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("84.64591978")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2016"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("79.61724542")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2017"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("68.62495399")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-string"},[s._v('"2018"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v('"value"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),s._v(" "),a("span",{staticClass:"hljs-number"},[s._v("67.30243261")]),s._v(`
  `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),s._v(`
`),a("span",{staticClass:"hljs-punctuation"},[s._v("]")]),s._v(`
`)])])]),a("api-table",{attrs:{path:"datavisualisations/ColumnChart.vue"}})],1)},v=[],c=n(l,i,v,!1,null,null,null,null);const u=c.exports;export{u as default};