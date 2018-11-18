<template>
  <div class="sharing-options" :style="style">
    <social-sharing v-bind="valuesFor('twitter')" :url="url" inline-template>
      <network network="twitter" class="sharing-options__link">
        <i class="fab fa-twitter"></i>
        <span class="sr-only">Share on Twitter</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('facebook')" :url="url" inline-template>
      <network network="facebook" class="sharing-options__link">
        <i class="fab fa-facebook"></i>
        <span class="sr-only">Share on Facebook</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('linkedin')" :url="url" inline-template>
      <network network="linkedin" class="sharing-options__link">
        <i class="fab fa-linkedin"></i>
        <span class="sr-only">Share on Linkedin</span>
      </network>
    </social-sharing>
    <social-sharing v-bind="valuesFor('email')" :url="url" inline-template>
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

  import EmbedForm from './EmbedForm.vue'
  import config from '../config'
  import IframeResizer from '../utils/iframe-resizer'

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
        default: () => ({
          'title': config.get('sharing-options.title'),
          'description': config.get('sharing-options.description'),
          'media': config.get('sharing-options.media'),
          'twitter-user': config.get('sharing-options.twitter-user'),
        }),
        type: Object
      },
      valuesKeys: {
        default: () => ['title', 'description', 'media', 'twitter-user'],
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
      }
    },
    methods: {
      showEmbedForm () {
        this.showShareOptions = false
        return this.$refs.embedForm.show()
      },
      valuesFor (network) {
        return reduce(this.valuesKeys, (values, key) => {
          values[key] = get(this.values, `${network}.${key}`, this.values[key])
          return values
        }, {})
      }
    },
    computed: {
      style () {
        return {
          'flex-direction': this.direction
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
