<template>
  <button class="btn haptic-copy" @click.stop="copy">
    <!-- @slot Main content of the button (including the icon) -->
    <slot>
      <fa icon="clipboard" class="haptic-copy__icon" />
      <span :class="{ 'sr-only': hideLabel }" class="ml-1 haptic-copy__label">
        {{ label || $t('haptic-copy.label') }}
      </span>
    </slot>
    <b-tooltip ref="tooltip" :target="() => $el" :triggers="[]">
      {{ tooltipContent }}
    </b-tooltip>
  </button>
</template>

<script>
  import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard'
  import { copyText, copyHtml } from '@/utils/clipboard'
  import { BTooltip } from 'bootstrap-vue/esm/components/tooltip/tooltip'
  import noop from 'lodash/noop'
  import i18n from '@/i18n'
  import Promise from 'promise-polyfill'

  import { library } from './Fa'

  export default {
    i18n,
    name: 'HapticCopy',
    props: {
      /**
       * Text to copy to the clipboard
       */
      text: {
        type: String
      },
      /**
       * Plain text to use as an alternative text for HTML copy (uses `text` by default)
       */
      plain: {
        type: String
      },
      /**
       * Hide the button label (still visible for screen reader)
       */
      hideLabel: {
        type: Boolean
      },
      /**
       * Button label
       */
      label: {
        type: String
      },
      /**
       * Delay after which we hide the tooltip
       */
      tooltipHideDelay: {
        type: Number,
        default: 2000
      },
      /**
       * Copy HTML content
       */
      html: {
        type: Boolean
      }
    },
    data () {
      return {
        succeed: false,
        tooltipContent: '',
        tooltipTimeout: null
      }
    },
    methods: {
      copyTextOrHtml () {
        return this.html ? this.copyHtml() : this.copyText()
      },
      copyText () {
        return copyText(this.text, this.$el)
      },
      copyHtml () {
        return copyHtml(this.text, this.plain || this.text)
      },
      async copy () {
        try {
          /**
           * Emitted when an attempt to copy text is made
           *
           * @event attempt
           */
          this.$emit('attempt')
          // Use clipboard.js internally
          await this.copyTextOrHtml()
          // Then option the tooltip in case of success
          await this.openTooltip('haptic-copy.tooltip.succeed')
          /**
          * Emitted when the text has been copied successfully
          *
          * @event success
          */
          this.$emit('success')
        } catch (error) {
          await this.openTooltip('haptic-copy.tooltip.failed')
          /**
          * Emitted when the text couldn't be copied
          *
          * @event error
          */
          this.$emit('error', error)
        }
        // And close the tooltip after a short delay
        this.nextTimeout(this.closeTooltip, this.tooltipHideDelay)
      },
      openTooltip (msg = 'haptic-copy.tooltip.succeed') {
        this.tooltipContent = this.$te(msg) ? this.$t(msg) : msg
        return this.$nextTick().then(() => this.$refs.tooltip && this.$refs.tooltip.$emit('open'))
      },
      closeTooltip () {
        this.$refs.tooltip && this.$refs.tooltip.$emit('close')
        // Clear the tooltip after a short delay
        return this.$nextTick().then(() => this.tooltipContent = '', 1000)
      },
      nextTimeout (fn = noop, delay = 0) {
        clearTimeout(this.tooltipTimeout)
        return new Promise(resolve => {
          this.tooltipTimeout = setTimeout(resolve, delay)
        }).finally(this.$nextTick).then(fn)
      }
    },
    components: {
      BTooltip,
      /** Prevent a bug with vue-docgen-api
       * @see https://github.com/vue-styleguidist/vue-docgen-api/issues/23
       */
      Fa: require('./Fa').default
    },
    beforeMount () {
      library.add(faClipboard)
    }
  }
</script>
