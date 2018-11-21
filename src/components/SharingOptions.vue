<template>
  <div class="sharing-options" :style="style">
    <social-sharing v-bind="valuesFor('twitter')" inline-template>
      <network network="twitter" class="sharing-options__link">
        <i class="fab fa-twitter"></i>
        <span class="sr-only">Share on Twitter</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('facebook')" inline-template>
      <network network="facebook" class="sharing-options__link">
        <i class="fab fa-facebook"></i>
        <span class="sr-only">Share on Facebook</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('linkedin')" inline-template>
      <network network="linkedin" class="sharing-options__link">
        <i class="fab fa-linkedin"></i>
        <span class="sr-only">Share on Linkedin</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('email')" inline-template>
      <network network="email" class="sharing-options__link">
        <i class="fas fa-envelope"></i>
        <span class="sr-only">Share by email</span>
      </network>
    </social-sharing>
    <div class="sharing-options__link" v-show="!noEmbed">
      <a @click="showEmbedForm">
        <i class="fas fa-code"></i>
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

  import { library } from '@/components/FontAwesomeIcon'
  library.add(faCode, faEnvelope, faTwitter, faFacebook, faLinkedin)

  export default {
    name: 'SharingOptions',
    components: {
      bModal,
      EmbedForm,
      SocialSharing
    },
    props: {
      url: {
        type: String,
        default: () => config.get('sharing-options.url', null) || IframeResizer.deletePymParams()
      },
      direction: {
        default: 'row',
        validator (value) {
          return ['row', 'row-reverse', 'column', 'column-reverse'].indexOf(value) !== -1
        }
      },
      values: {
        type: Object,
        default: () => ({})
      },
      valuesKeys: {
        default: () => ['url', 'title', 'description', 'media', 'twitter-user'],
        type: Array
      },
      noEmbed: {
        type: Boolean
      },
      iframeMinHeight: {
        type: Number
      },
      iframeMinWidth: {
        type: Number
      },
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
