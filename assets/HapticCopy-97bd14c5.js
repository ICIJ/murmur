const t={displayName:"HapticCopy",exportName:"default",description:"",tags:{},props:[{name:"text",description:"Text to copy to the clipboard",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"plain",description:"Plain text to use as an alternative text for HTML copy (uses `text` by default)",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"hideLabel",description:"Hide the button label (still visible for screen reader)",type:{name:"boolean"}},{name:"label",description:"Button label",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"tooltipHideDelay",description:"Delay after which we hide the tooltip",type:{name:"number"},defaultValue:{func:!1,value:"2000"}},{name:"tooltipPlacement",description:`Placement of the tooltip. Can be: top, topleft, topright, right,<br />
righttop, rightbottom, bottom, bottomleft, bottomright, left, lefttop,
and leftbottom.`,type:{name:"string"},defaultValue:{func:!1,value:"'top'"},values:["top","topleft","topright","right","righttop","rightbottom","bottom","bottomleft","bottomright","left","lefttop","leftbottom"]},{name:"html",description:"Copy HTML content",type:{name:"boolean"}},{name:"noTooltip",description:"Deactivate haptic tooltip display",type:{name:"boolean"}}],events:[{name:"attempt",description:"Emitted when an attempt to copy text is made"},{name:"success",description:"Emitted when the text has been copied successfully"},{name:"error",description:"Emitted when the text couldn't be copied",type:{names:["undefined"]}}],slots:[{name:"default",description:"Main content of the button (including the icon)"}],sourceFiles:["/home/dev/Repositories/murmur/lib/components/HapticCopy.vue"]};export{t as default};