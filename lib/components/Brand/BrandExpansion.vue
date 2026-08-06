<template>
  <span
    class="brand-expansion"
    :style="style"
    :class="{
      'brand-expansion--dark': dark,
      'brand-expansion--animated': animated
    }"
  >
    <component
      :is="modeComponent"
      :width="width"
      :height="height"
    />
  </span>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'

import BrandExpansionShort from './BrandExpansionShort.vue'
import BrandExpansionMedium from './BrandExpansionMedium.vue'
import BrandExpansionLong from './BrandExpansionLong.vue'
import { BrandMode } from '@/enums'
import { useBrandExpansion } from '@/composables/useBrandExpansion'

const MODE_COMPONENTS = {
  [BrandMode.Short]: BrandExpansionShort,
  [BrandMode.Medium]: BrandExpansionMedium,
  [BrandMode.Long]: BrandExpansionLong
}

/**
 * A component to create variations of ICIJ logo with text
 */
defineOptions({
  name: 'BrandExpansion'
})

export interface BrandExpansionProps {
  /**
   * Add a balancing effect to the globe
   */
  animated?: boolean
  /**
   * Monochromatic logo's color
   */
  color?: string
  /**
   * Logo's background color
   */
  background?: string
  /**
   * Logo's size
   */
  size?: number | string
  /**
   * Brand mode ("short", "medium", "long")
   */
  mode?: BrandMode
  /**
   * Reverse color of the main text to white if no `color` is given
   */
  dark?: boolean
  /**
   * If true, it resizes the brand as the display downsize.
   * If false, the brand keep the same size.
   */
  responsive?: boolean
}

const props = withDefaults(defineProps<BrandExpansionProps>(), {
  animated: false,
  color: undefined,
  background: undefined,
  size: '70px',
  mode: BrandMode.Short,
  dark: false,
  responsive: false
})

const { width, height, style } = useBrandExpansion({
  size: toRef(props, 'size'),
  mode: toRef(props, 'mode'),
  color: computed(() => props.color ?? null),
  background: computed(() => props.background ?? null),
  responsive: toRef(props, 'responsive')
})

const modeComponent = computed(() => MODE_COMPONENTS[props.mode])
</script>

<style scoped lang="scss">
@keyframes balancing-plate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(7deg);
  }
  50% {
    transform: rotate(-7deg);
  }
  75% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes balancing-globe {
  0% {
    transform: rotate(0deg);
  }
  35% {
    transform: rotate(7deg);
  }
  65% {
    transform: rotate(-7deg);
  }
  85% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.brand-expansion {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // The SVG markup is rendered by a child component
  // (BrandExpansionShort/Medium/Long.vue), so these selectors need :deep()
  // to pierce past that component's own scoped-style boundary.
  :deep(svg) {
    .triangle,
    .globe,
    .secondary-text {
      fill: var(--monochrome-color, #f00);
    }

    .plate {
      fill: var(--monochrome-color, #999);
    }

    .main-text {
      fill: var(--monochrome-color, #000);
    }
  }

  &--dark :deep(svg) .main-text {
    fill: var(--monochrome-color, #fff);
  }

  &--animated :deep(svg) {
    .plate {
      animation: balancing-plate 5s infinite cubic-bezier(0.37, 0, 0.63, 1);
    }
    .globe {
      animation: balancing-globe 5s infinite cubic-bezier(0.37, 0, 0.63, 1);
    }

    .plate,
    .globe {
      transform: rotate(0deg);
      transform-origin: bottom center;
      transform-box: fill-box;
    }
  }
}
</style>
