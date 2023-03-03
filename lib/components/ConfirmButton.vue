<template>
  <component
    :is="tag"
    :id="uniqComponentId"
    class="confirm-button"
    @click="toggleConfirmationTooltip"
  >
    <!-- @slot Main content of the button -->
    <slot>-</slot>
    <b-tooltip
      ref="confirmationTooltip"
      :target="uniqComponentId"
      triggers="blur"
      :placement="placement"
    >
      <div class="confirm-button__tooltip">
        <button
          v-if="!noCloseButton"
          class="confirm-button__tooltip__cancel btn btn-sm btn-link text-muted p-0 float-right"
          @click="cancel"
        >
          <fa icon="times" />
        </button>
        <p class="confirm-button__tooltip__label mb-2">
          {{ label }}
        </p>
        <p
          v-if="description"
          class="confirm-button__tooltip__description mb-2"
        >
          {{ description }}
        </p>
        <div class="confirm-button__tooltip__actions text-right">
          <button
            class="confirm-button__tooltip__actions__cancel btn btn-sm btn-link text-muted"
            @click="cancel"
          >
            {{ no }}
          </button>
          <button
            class="confirm-button__tooltip__actions__confirm btn btn-sm btn-link text-light font-weight-bold"
            @click="confirm"
          >
            {{ yes }}
          </button>
        </div>
      </div>
    </b-tooltip>
  </component>
</template>

<script lang="ts">
import noop from 'lodash/noop'
import uniqueId from 'lodash/uniqueId'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { BTooltip } from 'bootstrap-vue/esm/components/tooltip/tooltip'

import { library, default as Fa } from './Fa'
import { defineComponent, PropType } from 'vue'
import type Vue from 'vue'

import  { TooltipPlacement } from '@/enums'


/**
 * ConfirmButton
 */
export default defineComponent({
  
  name: 'ConfirmButton',
  components: {
    BTooltip,
    Fa
  },
  props: {
    /**
     * Confirmation message visible in the tooltip upon user's click
     */
    label: {
      type: String,
      default: 'Are you sure?'
    },
    /**
     * A description text to show under the confirmation label
     */
    description: {
      type: String,
      default: null
    },
    /**
     * Disable the closing button
     */
    noCloseButton: {
      type: Boolean
    },
    /**
     * The confirmation callback
     */
    confirmed: {
      type: Function,
      default: noop
    },
    /**
     * The cancellation callback
     */
    cancelled: {
      type: Function,
      default: noop
    },
    /**
     * Label for 'Yes' button
     */
    yes: {
      type: String,
      default: 'Yes'
    },
    /**
     * Label for 'No' button
     */
    no: {
      type: String,
      default: 'No'
    },
    /**
     * Tooltip position
     */
    placement: {
      type: String as PropType<TooltipPlacement>,
      default: TooltipPlacement.Top
    },
    /**
     * HTML tag to render this component to.
     */
    tag: {
      type: String,
      default: 'button'
    }
  },
  data () {
    return {
      showTooltip: false,
      uniqComponentId: uniqueId('murmur-confirm-button-')
    }
  },
  watch: {
    showTooltip (value: boolean) {
      (this.$refs.confirmationTooltip as Vue).$emit(value ? 'open' : 'close')
    }
  },
  beforeMount () {
    library.add(faTimes)
  },
  methods: {
    toggleConfirmationTooltip () : void {
      if ( !this.showTooltip ) {
        this.$root.$emit('bv::hide::tooltip')
      }
      this.showTooltip = !this.showTooltip
      /**
       * Emitted when the confirmation is toggled.
       * @event toggled
       * @param Boolean True if the button is shown.
       */
      this.$root.$emit('toggled', this.showTooltip)
    },
    cancel (): void  {
      (this.$refs.confirmationTooltip as Vue).$emit('close')
      this.cancelled()
      /**
       * Emitted when the confirmation is cancelled.
       * @event cancelled
       */
      this.$root.$emit('cancelled')
    },
    confirm () : void  {
      this.showTooltip = false
      this.confirmed()
      /**
       * Emitted when the confirmation is confirmed.
       * @event confirmed
       */
      this.$root.$emit('confirmed')
    }
  }
}
)
</script>

<style lang="scss">
  @import '../styles/lib';

  .confirm-button {

    &__tooltip {
      min-width: calc(#{$tooltip-max-width} - #{$tooltip-padding-x * 2});
      text-align: left;

      &__label, &__cancel {
        font-weight: bold;
        font-size: 1.2em;
      }

      &__actions {
        margin-bottom: $tooltip-padding-x - $tooltip-padding-y;

        &__confirm, &__cancel {
          text-transform: uppercase;
        }
      }
    }
  }
</style>
