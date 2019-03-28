<template>
  <component :is="tag" class="confirm-button" @click="toggleConfirmationTooltip">
    <!-- @slot Main content of the button -->
    <slot>-</slot>
    <b-tooltip ref="confirmationTooltip" :target="() => $el" :triggers="[]" :show.sync="showTooltip" :placement="placement">
      <div class="confirm-button__tooltip">
        <button class="confirm-button__tooltip__cancel btn btn-sm btn-link text-muted p-0 float-right" v-if="!noCloseButton" @click="cancel">
          <fa icon="times" />
        </button>
        <p class="confirm-button__tooltip__label mb-2">
          {{ label }}
        </p>
        <p class="confirm-button__tooltip__description mb-2" v-if="description">
          {{ description }}
        </p>
        <div class="confirm-button__tooltip__actions text-right">
          <button class="confirm-button__tooltip__actions__cancel btn btn-sm btn-link text-muted" @click="cancel">
            {{ no }}
          </button>
          <button class="confirm-button__tooltip__actions__confirm btn btn-sm btn-link text-light font-weight-bold" @click="confirm">
            {{ yes }}
          </button>
        </div>
      </div>
    </b-tooltip>
  </component>
</template>

<script>
import noop from 'lodash/noop'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip'

import { library } from './Fa'

/**
 * ConfirmButton
 */
export default {
  name: 'ConfirmButton',
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
      type: String
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
      type: String,
      default: 'top'
    },
    /**
     * HTML tag to render this component to.
     */
    tag: {
      type: String,
      default: 'button'
    }
  },
  components: {
    bTooltip,
    /** Prevent a bug with vue-docgen-api
     * @see https://github.com/vue-styleguidist/vue-docgen-api/issues/23
     */
    Fa: require('./Fa').default
  },
  data () {
    return {
      showTooltip: false
    }
  },
  methods: {
    toggleConfirmationTooltip () {
      if ( !this.showTooltip ) {
        this.$root.$emit('bv::hide::tooltip')
      }
      this.showTooltip = !this.showTooltip
    },
    cancel () {
      this.$refs.confirmationTooltip.$emit('close')
      this.cancelled()
    },
    confirm () {
      this.showTooltip = false
      this.confirmed()
    }
  },
  beforeMount () {
    library.add(faTimes)
  }
}
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
