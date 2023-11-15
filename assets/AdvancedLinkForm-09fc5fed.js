const e={displayName:"AdvancedLinkForm",description:"A form with tabs to offer several copy formats to users.",tags:{},exportName:"default",props:[{name:"link",description:"The link to copy",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"title",description:"Title associated with the link",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"forms",description:"The forms to display",type:{name:"array"},defaultValue:{func:!1,value:"['raw', 'markdown', 'rich', 'html']"}},{name:"value",description:"Index of the selected tab",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"card",description:"Activate the card integration for the tabs",type:{name:"boolean"}},{name:"pills",description:"Renders the tabs with the appearance of pill buttons",type:{name:"boolean"}},{name:"small",description:"Makes the tabs and the panels smaller.",type:{name:"boolean"}},{name:"vertical",description:"Makes the tabs and the panels vertical.",type:{name:"boolean"}},{name:"activeNavItemClass",description:"CSS class (or classes) to apply to the currently active tab.",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"noFade",description:"When set to 'true', disables the fade animation on the tabs.",type:{name:"boolean"}}],events:[{name:"input"}],sourceFiles:["/home/dev/Repositories/murmur/lib/components/AdvancedLinkForm.vue"]};export{e as default};