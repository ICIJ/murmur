<template>
  <button class="btn" @click="copyText" :id="btnUniqueId">
    <!-- @slot Main content of the button (including the icon) -->
    <slot>
      <fa icon="clipboard" />
      <span :class="{ 'sr-only': hideLabel }" class="ml-1">
        {{ label || $t('haptic-copy.label') }}
      </span>
    </slot>
    <b-tooltip ref="tooltip" :target="btnUniqueId" :triggers="[]">
      {{ tooltipContent }}
    </b-tooltip>
  </button>
</template>

<script>
  import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard'
  import { copyText } from '@/utils/clipboard'
  import uniqueId from 'lodash/uniqueId'
  import noop from 'lodash/noop'
  import i18n from '@/i18n'

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
      copyText () {
        return copyText(this.text, this.$el).finally(() => {
          return this.$nextTick(() => {
            this.openTooltip()
            /**
             * Success event.
             *
             * @event success
             */
            this.$emit('success')
            this.nextTimeout(this.closeTooltip, this.tooltipHideDelay)
          })
        })
      },
      openTooltip () {
        this.tooltipContent = this.$t('haptic-copy.tooltip.succeed')
        this.$nextTick(() => this.$refs.tooltip.$emit('open'))
      },
      closeTooltip () {
        this.$refs.tooltip.$emit('close')
        // Clear the tooltip after a short delay
        this.nextTimeout(() => this.tooltipContent = '', 1000)
      },
      nextTimeout (fn = noop, delay = 0) {
        clearTimeout(this.tooltipTimeout)
        this.tooltipTimeout = setTimeout(() => this.$nextTick(fn), delay)
      }
    },
    computed: {
      btnUniqueId () {
        return uniqueId('haptic-copy-btn-')
      }
    },
    components: {
      /** Prevent a bug with vue-docgen-api
       * @see https://github.com/vue-styleguidist/vue-docgen-api/issues/23
       */
      Fa: require('./Fa').default
    },
    beforeMount() {
      library.add(faClipboard)
    }
  }
</script>
