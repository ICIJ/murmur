<template>
  <button
    class="btn haptic-copy"
    @click.stop="copy"
    @mouseleave="closeTooltip"
  >
    <!-- @slot Main content of the button (including the icon) -->
    <slot>
      <font-awesome-layers>
        <transition name="spin">
          <fa
            v-if="!tooltipTimeout"
            icon="clipboard"
            class="haptic-copy__icon"
          />
        </transition>
        <transition name="spin">
          <fa
            v-if="tooltipTimeout"
            icon="clipboard-check"
            class="haptic-copy__icon"
          />
        </transition>
      </font-awesome-layers>
      <span
        :class="{ 'sr-only': hideLabel }"
        class="ml-1 haptic-copy__label"
      >
        {{ label || $t('haptic-copy.label') }}
      </span>
    </slot>
    <b-tooltip
      v-if="!noTooltip && mounted && $el"
      ref="tooltip"
      noninteractive
      :placement="tooltipPlacement"
      :target="() => $el"
      :triggers="[]"
      :container="tooltipContainer"
    >
      {{ tooltipContent }}
    </b-tooltip>
  </button>
</template>

<script>
  import { FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
  import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard'
  import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons/faClipboardCheck'
  import { copyText, copyHtml } from '@lib/utils/clipboard'
  import { BTooltip } from 'bootstrap-vue/esm/components/tooltip/tooltip'
  import noop from 'lodash/noop'
  import i18n from '@lib/i18n'

  import { library, default as Fa } from './Fa'

  const TOOLTIPS_PLACEMENTS = [
    'top',
    'topleft',
    'topright',
    'right',
    'righttop',
    'rightbottom',
    'bottom',
    'bottomleft',
    'bottomright',
    'left',
    'lefttop',
    'leftbottom'
  ]

  export default {
    i18n,
    name: 'HapticCopy',
    components: {
      BTooltip,
      FontAwesomeLayers,
      Fa
    },
    props: {
      /**
       * Text to copy to the clipboard
       */
      text: {
        type: String,
        default: null
      },
      /**
       * Plain text to use as an alternative text for HTML copy (uses `text` by default)
       */
      plain: {
        type: String,
        default: null
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
        type: String,
        default: null
      },
      /**
       * Delay after which we hide the tooltip
       */
      tooltipHideDelay: {
        type: Number,
        default: 2000
      },
      /**
       * Placement of the tooltip. Can be: top, topleft, topright, right,<br />
       * righttop, rightbottom, bottom, bottomleft, bottomright, left, lefttop,
       * and leftbottom.
       */
      tooltipPlacement: {
        type: String,
        default: 'top',
        validator: placement => TOOLTIPS_PLACEMENTS.includes(placement)
      },
      /**
       * Copy HTML content
       */
      html: {
        type: Boolean
      },
      /**
       * Deactivate haptic tooltip display
       */
      noTooltip: {
        type: Boolean
      }
    },
    data () {
      return {
        mounted: false,
        succeed: false,
        tooltipContent: '',
        tooltipTimeout: null
      }
    },
    computed: {
      tooltipContainer () {
        // By default we append the tooltip in the root container using its
        // id (if any) because BootstrapVue doesn't like HTMLElement for some
        // reasons.
        if (this.mounted && 'id' in this.$root.$el) {
          return `#${this.$root.$el.id}`
        }
        return null
      }
    },
    beforeMount () {
      library.add(faClipboard)
      library.add(faClipboardCheck)
    },
    mounted () {
      this.$nextTick(() => this.mounted = true)
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
      async openTooltip (msg = 'haptic-copy.tooltip.succeed') {
        this.tooltipContent = this.$te(msg) ? this.$t(msg) : msg
        this.$root.$emit('bv::hide::tooltip')
        await this.$nextTick()
        this.$refs.tooltip && this.$refs.tooltip.$emit('open')
      },
      async closeTooltip () {
        this.$refs.tooltip && this.$refs.tooltip.$emit('close')
        // Clear the tooltip after a short delay
        await this.$nextTick()
        this.tooltipContent = ''
        this.tooltipTimeout = null
      },
      nextTimeout (fn = noop, delay = 0) {
        clearTimeout(this.tooltipTimeout)
        return new Promise(resolve => {
          this.tooltipTimeout = setTimeout(resolve, delay)
        }).finally(this.$nextTick).then(fn)
      }
    }
  }
</script>

<style lang="scss">
  .haptic-copy {

    &__icon {

      &.spin-enter-active,
      &.spin-leave-active {
        transition: all .2s;
      }

      &.spin-enter {
        transform: rotate(-180deg);
        opacity: 0;
      }

      &.spin-leave-to {
        transform: rotate(180deg);
        opacity: 0;
      }
    }
  }
</style>
