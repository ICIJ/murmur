import{n as l}from"./main-0ff1ec8d.js";const i={data(){return{socialMode:!1,incidentReportsUrl:"https://gist.githubusercontent.com/pirhoo/4055e8d1ee3016805eaf1d2feabdd895/raw/a3d2ba8e9d19fcd9fc659dab50ec075248178238/stacked-colums-incidents.json",incidentReportsGroups:["Deaths","Injuries","Malfunctions"],icijStaff:[{city:"Washington DC",developers:1,journalists:6,devops:1,finance:1},{city:"Paris ",developers:5,journalists:1,devops:0,finance:0},{city:"Madrid ",developers:1,journalists:0,devops:4,finance:0},{city:"New York City",developers:0,journalists:3,devops:0,finance:1},{city:"Syndey",developers:0,journalists:2,devops:0,finance:1}],leaksSize:[{leak:"Offshore Leaks (2013)",size:260},{leak:"Panama Papers (2016)",size:2.6*1e3},{leak:"Paradise Papers (2017)",size:1.4*1e3}]}},methods:{humanReadableGb(t){return t>=1e3?`${t/1e3}TB`:`${t}GB`}}};var c=function(){var s=this,a=s._self._c;return a("div",{staticClass:"markdown-body"},[a("p",[s._v("Component do draw dead simple stacked column charts.")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
    Breast implant companies buried evidence of injuries for years
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v(`
    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("stacked-column-chart")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"incidentReportsUrl"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v(":groups")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"incidentReportsGroups"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("y-axis-tick-format")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('",.0f"')]),s._v(" />")]),s._v(`  
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v(`
    Source: U.S. Food and Drug Administration, ICIJ analysis
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"m-4"},[a("h4",[s._v(" Breast implant companies buried evidence of injuries for years ")]),a("p",{staticClass:"text-muted"},[s._v(" Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared. ")]),a("stacked-column-chart",{staticClass:"my-4",attrs:{data:s.incidentReportsUrl,groups:s.incidentReportsGroups,"y-axis-tick-format":",.0f"}}),a("p",{staticClass:"text-muted small"},[s._v(" Source: U.S. Food and Drug Administration, ICIJ analysis ")])],1)])],1),a("p",[s._v("Or without direct-labeling:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"d-flex align-items-baseline"')]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
      Breast implant companies buried evidence of injuries for years
    `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
    `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-nowrap ml-4"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("switch")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("v-model")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"socialMode"')]),s._v(">")]),s._v(`
      Social mode
    `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("b-form-checkbox")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v(`
    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("stacked-column-chart")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":social-mode")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"socialMode"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("no-direct-labeling")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"incidentReportsUrl"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("y-axis-tick-format")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('",.0f"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(" />")]),s._v(`  
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v(`
    Source: U.S. Food and Drug Administration, ICIJ analysis
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"m-4"},[a("div",{staticClass:"d-flex align-items-baseline"},[a("h4",[s._v(" Breast implant companies buried evidence of injuries for years ")]),a("b-form-checkbox",{staticClass:"text-nowrap ml-4",attrs:{switch:""},model:{value:s.socialMode,callback:function(n){s.socialMode=n},expression:"socialMode"}},[s._v(" Social mode ")])],1),a("p",{staticClass:"text-muted"},[s._v(" Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared. ")]),a("stacked-column-chart",{staticClass:"my-4",attrs:{"social-mode":s.socialMode,data:s.incidentReportsUrl,"y-axis-tick-format":",.0f","no-direct-labeling":""}}),a("p",{staticClass:"text-muted small"},[s._v(" Source: U.S. Food and Drug Administration, ICIJ analysis ")])],1)])],1),a("collapsible-block",{attrs:{label:"Show the data structure"}},[a("pre",[a("code",{staticClass:"hljs language-json"},[a("span",{staticClass:"hljs-punctuation"},[s._v("[")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2008")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("0")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("300")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("49")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2009")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("138")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("37")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2010")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("3")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("109")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("44")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2011")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("1")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("141")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("29")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2012")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("0")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("175")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("32")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2013")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("4")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("130")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("40")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2014")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("6")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("122")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("33")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2015")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("1")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("163")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("29")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2016")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("5")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("304")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("28")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2017")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("8")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2082")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("48")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("{")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"date"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("2018")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"death"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("7")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"injury"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("5185")]),a("span",{staticClass:"hljs-punctuation"},[s._v(",")]),s._v(`
      `),a("span",{staticClass:"hljs-attr"},[s._v('"malfunction"')]),a("span",{staticClass:"hljs-punctuation"},[s._v(":")]),a("span",{staticClass:"hljs-number"},[s._v("86")]),s._v(`
   `),a("span",{staticClass:"hljs-punctuation"},[s._v("}")]),s._v(`
`),a("span",{staticClass:"hljs-punctuation"},[s._v("]")]),s._v(`
`)])])]),a("p",[s._v("You can also set the maximum value and use a different field for column's label:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
    ICIJ Staff by office
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v("As of April 2021. This list is more or less accurate."),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("stacked-column-chart")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"icijStaff"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v(":max-value")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"10"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("no-tooltips")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("labelField")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"city"')]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("hide-empty-values")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(" />")]),s._v(`  
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"m-4"},[a("h4",[s._v(" ICIJ Staff by office ")]),a("p",{staticClass:"text-muted"},[s._v("As of April 2021. This list is more or less accurate.")]),a("stacked-column-chart",{staticClass:"my-4",attrs:{data:s.icijStaff,"max-value":10,labelfield:"city","no-tooltips":"","hide-empty-values":""}})],1)])],1),a("collapsible-block",{attrs:{label:"Show the data structure",json:s.icijStaff}}),a("p",[s._v("It also work with single-value groups:")]),a("div",{staticClass:"d-flex flex-column-reverse"},[a("sample-card",{attrs:{lang:"html"}},[a("template",{slot:"code"},[a("pre",[a("code",{staticClass:"html"},[a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"m-4"')]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v("Leaks size"),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("h4")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted"')]),s._v(">")]),s._v(`
    Size of ICIJ's leak.
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("stacked-column-chart")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v(":data")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"leaksSize"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v(":y-axis-tick-format")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"humanReadableGb"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v(":max-value")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"3000"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("label-field")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"leak"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"my-4"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("bar-max-width")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"50%"')]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("hide-legend")]),s._v(`
    `),a("span",{staticClass:"hljs-attr"},[s._v("no-tooltips")]),s._v(" />")]),s._v(`
  `),a("span",{staticClass:"hljs-tag"},[s._v("<"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(" "),a("span",{staticClass:"hljs-attr"},[s._v("class")]),s._v("="),a("span",{staticClass:"hljs-string"},[s._v('"text-muted small"')]),s._v(">")]),s._v(`
    Source: ICIJ
  `),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("p")]),s._v(">")]),s._v(`
`),a("span",{staticClass:"hljs-tag"},[s._v("</"),a("span",{staticClass:"hljs-name"},[s._v("div")]),s._v(">")]),s._v(`
`)])])])],2),a("div",{staticClass:"border bg-light"},[a("div",{staticClass:"m-4"},[a("h4",[s._v("Leaks size")]),a("p",{staticClass:"text-muted"},[s._v(" Size of ICIJ's leak. ")]),a("stacked-column-chart",{staticClass:"my-4",attrs:{data:s.leaksSize,"y-axis-tick-format":s.humanReadableGb,"max-value":3e3,"label-field":"leak","bar-max-width":"50%","hide-legend":"","no-tooltips":""}}),a("p",{staticClass:"text-muted small"},[s._v(" Source: ICIJ ")])],1)])],1),a("collapsible-block",{attrs:{label:"Show the data structure",json:s.leaksSize}}),a("api-table",{attrs:{path:"datavisualisations/StackedColumnChart.vue"}})],1)},v=[],_=l(i,c,v,!1,null,null,null,null);const e=_.exports;export{e as default};