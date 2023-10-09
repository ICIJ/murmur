const e={exportName:"default",displayName:"ChoroplethMap",description:"",tags:{},props:[{name:"data",mixin:{name:"chart",path:"../mixins/chart.js"},description:"A data collection for the chart. Can be a data object or an URL.",type:{name:"array|string|object"},defaultValue:{func:!0,value:"() => []"}},{name:"dataUrlType",mixin:{name:"chart",path:"../mixins/chart.js"},description:"Format of the data to load.",type:{name:"string"},defaultValue:{func:!1,value:"'json'"},values:["json","csv","tsv"]},{name:"chartHeightRatio",mixin:{name:"chart",path:"../mixins/chart.js"},description:"When applicable, default chart's height ratio",type:{name:"number"}},{name:"socialMode",mixin:{name:"chart",path:"../mixins/chart.js"},description:"If true, the chart will be display on social mode",type:{name:"boolean"}},{name:"socialModeRatio",mixin:{name:"chart",path:"../mixins/chart.js"},description:"Ratio to use in social mode",type:{name:"number"},defaultValue:{func:!1,value:"5 / 4"}},{name:"hatchEmpty",type:{name:"boolean"}},{name:"hideLegend",type:{name:"boolean"}},{name:"featureColorScale",type:{name:"func"},defaultValue:{func:!1,value:"null"}},{name:"max",type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"min",type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"clickable",type:{name:"boolean"}},{name:"topojsonObjects",type:{name:"string"},defaultValue:{func:!1,value:"'countries1'"}},{name:"topojsonObjectsPath",type:{name:"string|array"},defaultValue:{func:!1,value:"'id'"}},{name:"topojsonUrl",type:{name:"string"},defaultValue:{func:!0,value:"() => config.get('map.topojson.world-countries-sans-antarctica')"}},{name:"transitionDuration",type:{name:"number"},defaultValue:{func:!1,value:"750"}},{name:"zoomable",type:{name:"boolean"}},{name:"zoomMin",type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"zoomMax",type:{name:"number"},defaultValue:{func:!1,value:"8"}}],events:[{name:"resized",mixin:{name:"chart",path:"../mixins/chart.js"}},{name:"loaded",mixin:{name:"chart",path:"../mixins/chart.js"},type:{names:["undefined"]}},{name:"click",description:"A click on a feature",type:{names:["undefined"]},properties:[{type:{names:["mixed"]},name:"Clicked",description:"feature"}],tags:[{title:"param",type:{name:"mixed"},name:"Clicked",description:"feature"}]},{name:"zoomed",description:"A zoom on a feature ended",type:{names:["undefined"]},properties:[{type:{names:["mixed"]},name:"Zoomed",description:"feature"}],tags:[{title:"param",type:{name:"mixed"},name:"Zoomed",description:"feature"}]},{name:"reset",description:"The zomm on the map was reset to its initial <slot ate></slot>"}],slots:[{name:"legend-cursor",scoped:!0,bindings:[{name:"value",title:"binding"},{name:"identifier",title:"binding"}]}]};export{e as default};
