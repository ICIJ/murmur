export default [
  {
    props: [
      {
        name: '<code>url</code>',
        type: '<code>String</code>',
        default: "<code>config.get('sharing-options.url', null)</code>",
        description: 'URL to be shared.'
      },
      {
        name: '<code>direction</code>',
        default: '<code>row</code>',
        description: 'Direction of the sharing options. Can be: <em>row</em>, <em>row-reverse</em>, <em>column</em> or <em>column-reverse</em>.'
      },
      {
        name: '<code>values</code>',
        type: '<code>Object</code>',
        default: '<code>{}</code>',
        description: 'Sharing contents wich can be genereic (<em>title</em>, <em>description</em>, etc) or specific to a network (<em>twitter_title</em>, <em>facebook_description</em>, etc).'
      },
      {
        name: '<code>values-keys</code>',
        default: "<code>['url', 'title', 'description', 'media', 'twitter-user']</code>",
        type: '<code>Array</code>',
        description: 'The list of all the keys to automatlcy inject in each social button.'
      },
      {
        name: '<code>no-embed</code>',
        type: '<code>Boolean</code>',
        default: '—',
        description: 'Disable embed button.'
      },
      {
        name: '<code>iframe-min-height</code>',
        type: '<code>Number</code>',
        default: '—',
        description: 'Minimum height of the iframe in the embed form.'
      },
      {
        name: '<code>iframe-min-width</code>',
        type: '<code>Number</code>',
        default: '—',
        description: 'Minimum width of the iframe in the embed form.'
      },
      {
        name: '<code>no-meta</code>',
        type: '<code>Boolean</code>',
        default: '—',
        description: 'Prevent from reading default value from the <code>meta</code>.'
      }
    ],
    slots: [],
    events: [],
    methods: []
  }
]
