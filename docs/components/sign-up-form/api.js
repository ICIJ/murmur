export default [
    {
      props: [
        {
          name: '<code>action</code>',
          type: '<code>String</code>',
          default: "<code>config.get('signup-form.action')</code>",
          description: 'Mailchimp URL to send the data to.'
        },
        {
          name: '<code>no-label</code>',
          type: '<code>Boolean</code>',
          description: 'Disable the main label.'
        },
        {
          name: '<code>horizontal</code>',
          type: '<code>Boolean</code>',
          description: 'Horizontal layout of the form.'
        },
        {
          name: '<code>tracker</code>',
          type: '<code>String</code>',
          default: "<code>config.get('signup-form.tracker')</code>",
          description: 'Mailchimp tracker tag to identify the origin.'
        }
      ],
      slots: [],
      events: [],
      methods: []
    }
]
