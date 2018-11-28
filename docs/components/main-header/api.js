export default [
  {
    props: [
      {
        name: '<code>position</code>',
        type: '<code>String</code>',
        default: '<code>fixed</code>',
        description: 'CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default).'
      },
      {
        name: '<code>no-headroom</code>',
        type: '<code>Boolean</code>',
        default: '—',
        description: 'Disable Headroom for hiding header until needed.'
      },
      {
        name: '<code>project</code>',
        type: '<code>String</code>',
        default: "<code>config.get('project.name')</code>",
        description: 'Project name, to display next to ICIJ logo'
      },
      {
        name: '<code>title</code>',
        type: '<code>String</code>',
        default: "<code>config.get('app.name')</code>",
        description: 'Project name, to display next to project name'
      },
      {
        name: '<code>dropdown-items</code>',
        type: '<code>Array</code>',
        default: "<code>config.get('main-header.dropdown.items')</code>",
        description: 'An array of objects defining dropdown items. Each item defines a <em>label</em> and a <em>href</em>.'
      },
      {
        name: '<code>home-url</code>',
        type: '<code>String</code>',
        default: "<code>config.get('app.home')</code>",
        description: 'Target link of the ICIJ logo and project name.'
      }
    ],
    slots: [],
    events: [],
    methods: []
  }
]
