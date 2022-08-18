<script>
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import { library, default as Fa } from './Fa'
import HapticCopy from './HapticCopy.vue'  

export default {
  components: { Fa, HapticCopy },
  name: 'SecretInput',
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    /**
     * If true the value is visible by default
     */
    visible: {
      type: Boolean
    },
    /**
     * Value of the input
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Size of the input form
     */
    size: {
      type: String,
      default: 'md'
    },
    /**
     * Bootstrap variant of the haptic copy button
     */
    hapticCopyVariant: {
      type: String,
      default: 'primary'
    }
  },
  beforeMount() {
    library.add(faEye, faEyeSlash)
  },
  data () {
    return {
      isVisible: this.visible
    }
  },
  watch: {
    visible (visible) {
      this.isVisible = visible
    }
  },
  computed: {
    inputType () {
      return this.isVisible ? 'text' : 'password'
    },
    togglerIcon () {
      return this.isVisible ? ['far', 'eye-slash'] : ['far', 'eye']
    },
    hapticCopyClassList () {
      return `btn-${this.hapticCopyVariant}`
    }
  },
  methods: {
    toggle () {
      this.isVisible = !this.isVisible
      /**
       * Emitted when the visibility of the input changes.
       * 
       * @event input
       * @type {Boolean}
       */
      this.$emit('input', this.isVisible)
    },
    selectInput () {
      this.$el.querySelector('.secret-input__input').select()
    }
  }
}
</script>

<template>
  <b-input-group :size="size" class="secret-input">
    <b-input-group-prepend>
      <b-button @click="toggle" variant="link" class="secret-input__toggler">
        <fa :icon="togglerIcon" />
      </b-button>
    </b-input-group-prepend>
    <b-form-input 
      class="text-monospace secret-input__input" 
      readonly
      @click="selectInput"
      :type="inputType"
      :value="value" />
    <b-input-group-append>
      <haptic-copy 
        class="secret-input__copy" 
        hide-label
        @success="selectInput"
        @error="selectInput"
        :class="hapticCopyClassList"
        :text="value" />
    </b-input-group-append>
  </b-input-group>
</template>

<style scoped lang="scss">
  @import '../styles/lib.scss';

  .secret-input {

    &__toggler {
      background: $input-disabled-bg;
      border: $input-border-width solid $input-border-color;
      border-right: 0;
    }
  }
</style>