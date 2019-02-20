<script>
  import querystring from 'querystring'
  import reduce from 'lodash/reduce'
  import noop from 'lodash/noop'
  import get from 'lodash/get'

  // Popup instance and an interval holder
  export const $popup = {
    instance: null,
    interval: null,
    parent: typeof window !== 'undefined' ? window : null
  }

  // Prevent propagation when an event is fired through the given callback
  let preventDefault = callback => {
    return event => {
      event && event.preventDefault()
      callback()
    }
  }

  /**
   * @source https://github.com/bradvin/social-share-urls
   */
  export const networks = {
    email: {
      base: 'mailto:?',
      args: {
        subject: 'title',
        body: 'description'
      }
    },
    facebook: {
      base: 'https://www.facebook.com/sharer.php?',
      args: {
        u: 'url',
        title: 'title',
        description: 'description',
        hashtag: 'hashtags'
      }
    },
    linkedin: {
      base: 'https://www.linkedin.com/shareArticle?mini=true&',
      args: {
        url: 'url',
        title: 'title',
        summary: 'description',
        source: 'provider'
      }
    },
    twitter: {
      base: 'https://twitter.com/intent/tweet?',
      args: {
        url: 'url',
        text: 'title',
        via: 'user',
        hashtags: 'hashtags'
      }
    }
  }

  /**
   * SharingOptionsLink
   */
  export default {
    name: 'SharingOptionsLink',
    props: {
      network: {
        type: String,
        required: true,
        validator (val) {
          return Object.keys(networks).includes(val)
        }
      },
      url: {
        type: String
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      media: {
        type: String
      },
      user: {
        type: String
      },
      hashtags: {
        type: String
      },
      provider: {
        type: String
      }
    },
    data () {
      return {
        popup: {
          status: 'no',
          resizable: 'yes',
          toolbar: 'no',
          menubar: 'no',
          scrollbars: 'no',
          location: 'no',
          directories: 'no',
          width: 626,
          height: 436,
          top: 0,
          left: 0,
          screenY: 0,
          screenX: 0
        }
      };
    },
    render (h) {
      const click = this.hasPopup() ? preventDefault(this.click) : noop
      const href = this.href
      return h('a', { attrs: { href }, on: { click } }, this.$slots.default)
    },
    computed: {
      href () {
        return this.base + querystring.stringify(this.query)
      },
      base () {
        return get(networks, [this.network, 'base'], '')
      },
      args () {
        return get(networks, [this.network, 'args'], {})
      },
      query () {
        return reduce(this.args, (obj, prop, param) => {
          if (this.$props[prop]) {
            obj[param] = this.$props[prop]
          }
          return obj
        }, {})
      },
      popupParams () {
        return querystring.stringify(this.popup).split('&').join(',')
      }
    },
    methods: {
      click ()  {
        this.cleanExistingPopupInstance ()
        this.openPopup()
      },
      openPopup() {
        // Create the popup
        $popup.instance = $popup.parent.open(this.href, 'sharer', this.popupParams)
        $popup.instance.focus()
        // Watch for popup closing
        $popup.interval = setInterval(this.cleanExistingPopupInterval, 500)
      },
      cleanExistingPopupInstance  () {
        if ($popup.instance && $popup.interval) {
          clearInterval($popup.interval)
          $popup.interval = null
          $popup.instance.close()
        }
      },
      cleanExistingPopupInterval () {
        if ( $popup.instance && $popup.instance.closed ) {
          clearInterval($popup.interval)
          $popup.interval = null
          $popup.instance = null
        }
      },
      hasPopup () {
        return this.network !== 'email'
      }
    }
  }
</script>
