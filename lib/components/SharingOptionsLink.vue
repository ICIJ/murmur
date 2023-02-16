<script>
  import querystring from 'querystring-es3'
  import reduce from 'lodash/reduce'
  import noop from 'lodash/noop'
  import get from 'lodash/get'

  import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
  import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
  import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
  import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'

  import Fa from './Fa'

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
      icon: faEnvelope,
      args: {
        subject: 'title',
        body: 'description'
      }
    },
    facebook: {
      base: 'https://www.facebook.com/sharer.php?',
      icon: faFacebook,
      args: {
        u: 'url',
        title: 'title',
        description: 'description',
        hashtag: 'hashtags'
      }
    },
    linkedin: {
      base: 'https://www.linkedin.com/sharing/share-offsite/?',
      icon: faLinkedin,
      args: {
        url: 'url',
        title: 'title',
        summary: 'description'
      }
    },
    twitter: {
      base: 'https://twitter.com/intent/tweet?',
      icon: faTwitter,
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
    components: {
      Fa
    },
    props: {
      /**
       * Root element type
       */
      tag: {
        type: String,
        default: 'a'
      },
      /**
       * Social network to use
       */
      network: {
        type: String,
        required: true,
        validator (val) {
          return Object.keys(networks).includes(val)
        }
      },
      /**
       * Disable icon
       */
      noIcon: {
        type: Boolean
      },
      /**
       * Shared URL
       */
      url: {
        type: String
      },
      /**
       * Shared text
       */
      title: {
        type: String
      },
      /**
       * Shared description
       */
      description: {
        type: String
      },
      /**
       * Shared image
       */
      media: {
        type: String
      },
      /**
       * Twitter user
       */
      user: {
        type: String
      },
      /**
       * Shared hashtags
       */
      hashtags: {
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
      icon () {
        return  get(networks, [this.network, 'icon'], null)
      },
      query () {
        return reduce(this.args, (obj, prop, param) => {
          if (this.$props[prop]) {
            obj[param] = this.$props[prop]
          }
          return obj
        }, {})
      },
      name () {
        return get(networks, [this.network, 'name'], this.network)
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
      renderIcon (h) {
        if (!this.noIcon) {
          return h('fa', { props: { icon: this.icon } })
        }
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
    },
    render (h) {
      const click = this.hasPopup() ? preventDefault(this.click) : noop
      const href = this.href
      return h(this.tag, { attrs: { href }, on: { click } }, this.$slots.default || [
        this.renderIcon(h),
        h('span', { class: 'sr-only' }, this.name)
      ])
    }
  }
</script>
