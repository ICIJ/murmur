<style lang="scss" scoped>
  @import '../styles/lib';

  .embed-form {
    font-size: 0.9rem;
    overflow: auto;

    .custom-control.btn {
      .custom-control-label:before, .custom-control-label:after {
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &__heading {
      font-size: 1.1em;
      text-transform: uppercase;
    }

    &__code {
      height: 80px;
    }

    &__preview {
      border-left: 1px $gray-400 dashed;
    }
  }
</style>

<template>
  <div class="embed-form">
    <div class="container-fluid">
      <h4 class="embed-form__heading" v-if="!noTitle">
        {{ $t('embed-form.heading') }}
      </h4>
      <div class="row">
        <div class="col">
          <p>
            {{ $t('embed-form.introduction') }}
          </p>
          <textarea class="form-control embed-form__code mb-2" readonly @click="selectCode" :value="embedCode()"></textarea>

          <label class="custom-control custom-checkbox btn btn-sm float-left">
            <input type="checkbox" class="custom-control-input" v-model="responsiveCheck">
            <span class="custom-control-label font-weight-bold">
              {{ $t('embed-form.responsive-optin') }}
            </span>
          </label>

          <div class="text-right">
            <haptic-copy class="btn-link btn-sm text-uppercase font-weight-bold" :text="embedCode()" @attempt="selectCode()" :label="$t('embed-form.copy')" />
          </div>
        </div>
        <div class="col-7 d-none d-lg-block embed-form__preview" v-if="!noPreview">
          <span v-html="embedCode(false)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import i18n from '@root/i18n'
  import HapticCopy from './HapticCopy'
  import IframeResizer from '@root/utils/iframe-resizer'
  import Fa from './Fa'

  /**
   * Embed Form
   */
  export default {
    i18n,
    name: 'EmbedForm',
    data () {
      return {
        responsiveCheck: false
      }
    },
    components: {
      HapticCopy,
      Fa
    },
    props: {
      /**
       * Hide the form title
       */
      noTitle: {
        type: Boolean
      },
      /**
       * Hide the preview panel
       */
      noPreview: {
        type: Boolean
      },
      /**
       * Default width of the iframe code
       */
      width: {
        type: [Number, String],
        default: '100%'
      },
      /**
       * Default height of the iframe code
       */
      height: {
        type: Number,
        default: () => (window.innerHeight)
      },
      /**
       * Default minimal width of the iframe code (if extract from window\'s size)
       */
      minWidth: {
        type: Number,
        default: 0
      },
      /**
       * Default minimal height of the iframe code (if extract from window\'s size)
       */
      minHeight: {
        type: Number,
        default: 0
      },
      /**
       * URL of the iframe code
       */
      url: {
        type: String
      }
    },
    methods: {
      iframeCodeFor (url = this.currentUrl, width, height) {
        return `<iframe width="${width}" height="${height}" src="${IframeResizer.deletePymParams(url)}" frameborder="0" allowfullscreen></iframe>`
      },
      pymCodeFor (url = this.currentUrl) {
        return IframeResizer.template(url)
      },
      selectCode () {
        this.$el.querySelector('.embed-form__code').select()
      },
      embedCode (withPym = this.responsiveCheck) {
        const width = isNaN(this.width) ? this.width : Math.max(this.width, this.minWidth)
        const height = Math.max(this.height, this.minHeight)
        return withPym ? this.pymCodeFor(this.currentUrl) : this.iframeCodeFor(this.currentUrl, width, height)
      }
    },
    computed: {
      currentUrl () {
        return this.url || window.location.href
      }
    }
  }
</script>
