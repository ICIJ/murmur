<template>
  <div class="embed-form">
    <div class="container-fluid">
      <h4
        v-if="!noTitle"
        class="embed-form__heading"
      >
        {{ $t('embed-form.heading') }}
      </h4>
      <div class="row">
        <div class="col">
          <p>
            {{ $t('embed-form.introduction') }}
          </p>
          <textarea
            class="form-control embed-form__code mb-2"
            readonly
            :value="embedCode()"
            @click="selectCode"
          />

          <label class="custom-control custom-checkbox btn btn-sm float-left">
            <input
              v-model="responsiveCheck"
              type="checkbox"
              class="custom-control-input"
            >
            <span class="custom-control-label font-weight-bold">
              {{ $t('embed-form.responsive-optin') }}
            </span>
          </label>

          <div class="text-right">
            <haptic-copy
              class="btn-link btn-sm text-uppercase font-weight-bold"
              :text="embedCode()"
              :label="$t('embed-form.copy').toString()"
              @attempt="selectCode()"
            />
          </div>
        </div>
        <div
          v-if="!noPreview"
          class="col-7 d-none d-lg-block embed-form__preview"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="embedCode(false)" />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import i18n from '@/i18n'
  import HapticCopy from '@/components/HapticCopy.vue'
  import IframeResizer from '@/utils/iframe-resizer'
  import { defineComponent } from 'vue'
  interface ComponentInterface {
    currentUrl: string,
    responsiveCheck:string,
    width:string,
    minWidth:number
    height:number,
    minHeight:number,
    iframeCodeFor:Function,
    pymCodeFor:Function,
}
  /**
   * Embed Form
   */
  export default defineComponent({
    i18n,
    name: 'EmbedForm',
    components: {
      HapticCopy
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
        type: String,
        default: null
      }
    },
    data () {
      return {
        responsiveCheck: false
      }
    },
    computed: {
      currentUrl () {
        return this.url || window.location.href
      }
    },
    methods: {
      iframeCodeFor (this:ComponentInterface,url = this.currentUrl, width:string, height:string) {
        return `<iframe width="${width}" height="${height}" src="${IframeResizer.deletePymParams(url)}" frameborder="0" allowfullscreen></iframe>`
      },
      pymCodeFor (this:ComponentInterface, url = this.currentUrl):string {
        return IframeResizer.template(url)
      },
      selectCode ():void {
        (this.$el.querySelector('.embed-form__code') as HTMLTextAreaElement)?.select()
      },
      embedCode (this:ComponentInterface,withPym = this.responsiveCheck ) :string{
        const width = typeof this.width == "string" ? this.width : Math.max(this.width, this.minWidth).toString()
        const height = Math.max(this.height, this.minHeight).toString()
        return withPym ? this.pymCodeFor(this.currentUrl) : this.iframeCodeFor(this.currentUrl, width, height)
      }
    }
  })
</script>

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
