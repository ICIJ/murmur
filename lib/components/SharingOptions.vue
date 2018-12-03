<template>
  <div class="sharing-options" :style="style">
    <social-sharing v-bind="valuesFor('twitter')" inline-template>
      <network network="twitter" class="sharing-options__link">
        <fa :icon="['fab', 'twitter']" />
        <span class="sr-only">Share on Twitter</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('facebook')" inline-template>
      <network network="facebook" class="sharing-options__link">
        <fa :icon="['fab', 'facebook']" />
        <span class="sr-only">Share on Facebook</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('linkedin')" inline-template>
      <network network="linkedin" class="sharing-options__link">
        <fa :icon="['fab', 'linkedin']" />
        <span class="sr-only">Share on Linkedin</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('email')" inline-template>
      <network network="email" class="sharing-options__link">
        <fa icon="envelope" />
        <span class="sr-only">Share by email</span>
      </network>
    </social-sharing>
    <div class="sharing-options__link" v-show="!noEmbed">
      <a @click="showEmbedForm">
        <fa icon="code" />
        <span class="sr-only">Embed</span>
      </a>
    </div>
    <b-modal hide-footer ref="embedForm" title="Embed on your website" class="text-dark">
      <embed-form no-title no-preview :min-height="iframeMinHeight" :min-width="iframeMinWidth"></embed-form>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import SocialSharing from 'vue-social-sharing';
  import get from 'lodash/get'
  import reduce from 'lodash/reduce'

  import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
  import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
  import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
  import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'

  import EmbedForm from './EmbedForm.vue'
  import config from '../config'
  import IframeResizer from '../utils/iframe-resizer'

  import { library } from './Fa'
  /**
   * SharingOptions
   */
  export default {
    name: 'SharingOptions',
    components: {
      bModal,
      EmbedForm,
      SocialSharing,
      /** Prevent a bug with vue-docgen-api
       * @see https://github.com/vue-styleguidist/vue-docgen-api/issues/23
       */
      Fa: require('./Fa').default
    },
    beforeMount () {
      library.add(faCode, faEnvelope, faTwitter, faFacebook, faLinkedin)
      // Inject Fa components in child component
      SocialSharing.components.Fa = require('./Fa').default
    },
    props: {
      /**
       * URL to be shared.
       */
      url: {
        type: String,
        default: () => config.get('sharing-options.url', null) || IframeResizer.deletePymParams()
      },
      /**
       * Direction of the sharing options. Can be: <em>row</em>, <em>row-reverse</em>,
       * <em>column</em> or <em>column-reverse</em>.
       */
      direction: {
        default: 'row',
        validator (value) {
          return ['row', 'row-reverse', 'column', 'column-reverse'].indexOf(value) !== -1
        }
      },
      /**
       * Sharing contents wich can be genereic (<em>title</em>, <em>description</em>, etc)
       * or specific to a network (<em>twitter_title</em>, <em>facebook_description</em>, etc).
       */
      values: {
        type: Object,
        default: () => ({})
      },
      /**
       * The list of all the keys to automatlcy inject in each social button.
       */
      valuesKeys: {
        default: () => ['url', 'title', 'description', 'media', 'twitter-user'],
        type: Array
      },
      /**
       * Disable embed button.
       */
      noEmbed: {
        type: Boolean
      },
      /**
       * Minimum height of the iframe in the embed form.
       */
      iframeMinHeight: {
        type: Number
      },
      /**
       * Minimum width of the iframe in the embed form.
       */
      iframeMinWidth: {
        type: Number
      },
      /**
       * Prevent from reading default value from the <code>meta</code>.
       */
      noMeta: {
        type: Boolean
      }
    },
    methods: {
      showEmbedForm () {
        this.showShareOptions = false
        return this.$refs.embedForm.show()
      },
      valuesFor (network) {
        const values = Object.assign(this.metaValues, this.values)
        return reduce(this.valuesKeys, (res, key) => {
          res[key] = get(values, `${network}_${key}`, values[key])
          return res
        }, {})
      },
      defaultValueFor(key, metaSelector = null) {
        if (this.noMeta || !metaSelector) {
          return config.get(key)
        }
        return get(document.head.querySelector(metaSelector), 'content', config.get(key))
      }
    },
    computed: {
      style () {
        return {
          'flex-direction': this.direction
        }
      },
      metaValues () {
        return {
          'url': this.url,
          'title': this.defaultValueFor('sharing-options.title'),
          'description': this.defaultValueFor('sharing-options.description', 'meta[name="description]'),
          'facebook_title': this.defaultValueFor('sharing-options.facebook_title', 'meta[property="og:title"]'),
          'facebook_description': this.defaultValueFor('sharing-options.description', 'meta[property="og:description"]'),
          'facebook_media':  this.defaultValueFor('sharing-options.media', 'meta[property="og:image"]'),
          'facebook_url':  this.defaultValueFor('app.home', 'meta[property="og:url"]'),
          'twitter_media':  this.defaultValueFor('sharing-options.media', 'meta[name="twitter:image"]'),
          'twitter_twitter-user': this.defaultValueFor('sharing-options.twitter-user', 'meta[name="twitter:site"]')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/lib';
  @import '../styles/mixins';

  .sharing-options {
    display: flex;

    &__link {
      display: block;
      margin: $spacer / 4;
      background: black;
      height: 2.5em;
      line-height: 2.5em;
      width: 2.5em;
      text-align: center;
      font-size: 80%;
      border-radius: 50%;
      cursor: pointer;
      color: white;
      position: relative;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      & > a, & > button {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
