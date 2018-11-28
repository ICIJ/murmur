export default [
  {
    props: [
      {
        name: '<code>no-title</code>',
        type: '<code>Boolean</code>',
        description: 'Hide the form title',
        default: '—',
      },
      {
        name: '<code>no-preview</code>',
        type: '<code>Boolean</code>',
        description: 'Hide the preview panel',
        default: '—',
      },
      {
        name: '<code>width</code>',
        type: '<code>Number</code>, <code>String<code>',
        default: '<code>100%</code>',
        description: 'Default width of the iframe code'
      },
      {
        name: '<code>height</code>',
        type: '<code>Number</code>',
        default: '<code>window.innerHeight<code>',
        description: 'Default height of the iframe code'
      },
      {
        name: '<code>min-width</code>',
        type: '<code>Number</code>',
        default: '<code>0<code>',
        description: 'Default minimal width of the iframe code (if extract from window\'s size)'
      },
      {
        name: '<code>min-height</code>',
        type: '<code>Number</code>',
        default: '<code>0<code>',
        description: 'Default minimal height of the iframe code (if extract from window\'s size)'
      },
      {
        name: '<code>url</code>',
        type: '<code>String</code>',
        default: '<code>window.location.href<code>',
        description: 'URL of the iframe code'
      }
    ],
    slots: [],
    events: [],
    methods: []
  }
]
