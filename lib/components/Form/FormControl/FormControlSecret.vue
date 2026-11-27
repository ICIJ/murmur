<script setup lang="ts">
import { computed, ref, useAttrs, type Component } from 'vue'
import { useI18n } from 'vue-i18n'
import HapticCopy from '@/components/HapticCopy/HapticCopy.vue'
import AppIcon from '@/components/App/AppIcon.vue'
import { SIZE, TogglerPosition } from '@/enums'
import IPhEye from '~icons/ph/eye'
import IPhEyeSlash from '~icons/ph/eye-slash'
import { resolveSize, type SizeWithMd } from '@/utils/size'

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
  size?: SizeWithMd
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
  /**
   * Side of the input where the toggler is drawn
   */
  togglerPosition?: TogglerPosition | `${TogglerPosition}`
}

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<FormControlSecretProps>(), {
  visible: false,
  value: '',
  size: SIZE.md,
  hapticCopyVariant: 'primary',
  noToggler: false,
  noHapticCopy: false,
  togglerPosition: TogglerPosition.left
})

const emit = defineEmits(['update:visible'])

const { t } = useI18n()
const attrs = useAttrs()
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

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

const fieldClassList = computed(() => {
  const modifier = `secret-input__field--toggler-${props.togglerPosition}`
  return { [modifier]: !props.noToggler }
})

const hasTogglerLeft = computed(() => {
  return !props.noToggler && props.togglerPosition === TogglerPosition.left
})
const hasTogglerRight = computed(() => {
  return !props.noToggler && props.togglerPosition === TogglerPosition.right
})

const resolvedSize = computed(() => resolveSize(props.size))

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
    :class="$attrs.class"
    :style="$attrs.style"
  >
    <div
      class="secret-input__field"
      :class="fieldClassList"
    >
      <b-button
        v-if="hasTogglerLeft"
        variant="link"
        class="secret-input__toggler"
        :aria-label="t('form-control-secret.toggler')"
        :aria-pressed="visible"
        @click="toggle"
      >
        <app-icon><component :is="togglerIcon" /></app-icon>
      </b-button>
      <b-form-input
        ref="secretInput"
        v-bind="inputAttrs"
        class="text-monospace secret-input__input"
        readonly
        :size="resolvedSize"
        :type="inputType"
        :model-value="value"
        @click="selectInput"
      />
      <b-button
        v-if="hasTogglerRight"
        variant="link"
        class="secret-input__toggler"
        :aria-label="t('form-control-secret.toggler')"
        :aria-pressed="visible"
        @click="toggle"
      >
        <app-icon><component :is="togglerIcon" /></app-icon>
      </b-button>
    </div>
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
  &__field {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;

    &:not(:last-child) .secret-input__input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .secret-input__input:focus {
      position: relative;
      z-index: 3;
    }

    &--toggler-left {
      .secret-input__toggler {
        left: 0;
      }

      .secret-input__input {
        padding-left: calc(#{$input-padding-x} * 2 + 1em);
      }
    }

    &--toggler-right {
      .secret-input__toggler {
        right: 0;
      }

      .secret-input__input {
        padding-right: calc(#{$input-padding-x} * 2 + 1em);
      }
    }
  }

  &__field &__toggler {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    border: 0;
    background: transparent;
  }
}
</style>
