export default [
    {
        props: [
            {
              name: '<code>title</code>',
              type: '<code>String</code>',
              description: 'Title to display next to ICIJ logo.',
              default: "<code>config.get('project.name')</code>"
            },
            {
              name: '<code>lead</code>',
              description: 'Lead sentence to display next to the title.',
              type: '<code>String</code>',
              default: ''
            },
            {
              name: '<code>iframe-min-height</code>',
              description: 'Minimum height for the iframe generated in the embed form.',
              type: '<code>Number</code>',
            },
            {
              name: '<code>iframe-min-width</code>',
              description: 'Minimum width for the iframe generated in the embed form.',
              type: '<code>Number</code>',
            },
            {
              name: '<code>home-url</code>',
              description: 'Target of the ICIJ logo and title links.',
              type: '<code>String</code>',
              default: "<code>config.get('app.home')</code>"
            },
            {
              name: '<code>sharing-options-values</code>',
              description: 'Sharing option values to bind to the sharing-options component on the bottom-right corner.',
              type: '<code>Object</code>',
              default: '<code>{}</code>'
            }
        ],
        slots: [],
        events: [],
        methods: []
    }
]
