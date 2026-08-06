<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import HapticCopy from '@/components/HapticCopy/HapticCopy.vue'
import AppIcon from '@/components/App/AppIcon.vue'
import { Size } from 'bootstrap-vue-next'
import { SIZE } from '@/enums'
import IPhEye from '~icons/ph/eye'
import IPhEyeSlash from '~icons/ph/eye-slash'

// bootstrap-vue-next's own Size type only covers 'sm' | 'lg' (the classes it
// applies); 'md' is our sentinel for "no size class" and never forwarded to bootstrap-vue-next components.
type FormControlSecretSize = Size | SIZE.md

export interface FormControlSecretProps {
  /**
   * If true the value is visible by default
   */
  visible?: boolean
  /**
   * Value of the input
   */
  value?: string | number
  /**
   * Size of the input form
   */
  size?: FormControlSecretSize
  /**
   * Bootstrap variant of the haptic copy button
   */
  hapticCopyVariant?: string
  /**
   * Hide toggler button
   */
  noToggler?: boolean
  /**
   * Hide haptic copy button
   */
  noHapticCopy?: boolean
}

const props = withDefaults(defineProps<FormControlSecretProps>(), {
  visible: false,
  value: '',
  size: SIZE.md,
  hapticCopyVariant: 'primary',
  noToggler: false,
  noHapticCopy: false
})

const emit = defineEmits(['update:visible'])

const secretInput = ref<HTMLInputElement | null>(null)
const inputType = computed(() => {
  return props.visible ? 'text' : 'password'
})
const togglerIcon = computed((): Component => {
  return props.visible ? IPhEyeSlash : IPhEye
})
const hapticCopyClassList = computed(() => {
  return `btn-${props.hapticCopyVariant}`
})

// bootstrap-vue-next's `size` prop doesn't accept our 'md' sentinel.
const resolvedSize = computed((): Size | undefined => {
  return props.size === SIZE.md ? undefined : props.size
})

function toggle() {
  /**
   * Emitted when the visibility of the input changes.
   *
   * @event update:visible
   * @type {Boolean}
   */
  emit('update:visible', !props.visible)
}
function selectInput() {
  if (props.visible) {
    secretInput.value?.select()
  }
}
</script>

<template>
  <b-input-group
    :size="resolvedSize"
    class="secret-input"
  >
    <b-button
      v-if="!noToggler"
      variant="link"
      class="secret-input__toggler"
      @click="toggle"
    >
      <app-icon><component :is="togglerIcon" /></app-icon>
    </b-button>
    <b-form-input
      ref="secretInput"
      class="text-monospace secret-input__input"
      readonly
      :type="inputType"
      :model-value="value"
      @click="selectInput"
    />
    <haptic-copy
      v-if="!noHapticCopy"
      class="secret-input__copy"
      hide-label
      :class="hapticCopyClassList"
      :text="value"
      @success="selectInput"
      @error="selectInput"
    />
  </b-input-group>
</template>

<style scoped lang="scss">

.secret-input {
  &__toggler {
    background: $input-disabled-bg;
    border: $input-border-width solid $input-border-color;
    border-right: 0;
  }
}
</style>
