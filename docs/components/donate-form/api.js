export default [
  {
    props: [
      {
        name: '<code>no-title</code>',
        type: '<code>Boolean</code>',
        description: 'Title of the form.',
        default: '—'
      },
      {
        name: '<code>introduction</code>',
        type: '<code>String</code>',
        default: "<code>config.get('donate-form.introduction')</code>",
        description: 'Description of the form (bellow the title).'
      }
    ],
    slots: [
      {
        name: 'introduction',
        description: 'Description of the form (bellow the title).',
        default: '—'
      }
    ],
    events: [],
    methods: []
  }
]
