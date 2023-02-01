<script lang="ts">
import { clamp } from 'lodash'
import { defineComponent, PropType } from 'vue'
import { DeckTexture } from '@root/enums'

type TexturedDeckValue = DeckTexture | number

export default defineComponent({
  name: 'TexturedDeck',
  props: {
    /**
     * Name of the texture file ('silk', 'brick', 'rock', 'sand', 'crack', 'carbon')
     */
    value: {
      type: String as PropType<TexturedDeckValue>,
      default: DeckTexture.Brick
    },
    /**
     * CSS background-size property (cover, contain, auto, 50%, 50% auto, ...)
     */
    size: {
      type: String,
      default: 'cover'
    },
    /**
     * Tag/Component to use as root tag.
     */
    tag: {
      type: [String, Object],
      default: 'div'
    },
    /**
     * Etheir or note we should use the black version of the texture
     */
    black: {
      type: Boolean
    }
  },
  computed: {
    names (): DeckTexture[] {
      return Object.values(DeckTexture)
    },
    textureIndex (): number {
      if (isNaN(this.value)) {
        return clamp(this.names.indexOf(this.value), 0, this.names.length - 1)
      }
      return this.value
    },
    textureName (): string {
      return this.names[this.textureIndex]
    },
    filename (): string {
      if (this.black) {
        return `texture-${this.textureName}-black.jpg`
      }
      return `texture-${this.textureName}.jpg`
    },
    backgroundUrl (): string {
      return new URL(`/assets/${this.filename}`, this.backgroundBase).href
    },
    backgroundBase (): string {
      return this.$config.get('textured-deck.backgroundBase', window.location.origin)
    },
    backgroundSize (): string {
      return this.size
    },
    backgroundImage (): string {
      return `url("${this.backgroundUrl}")`
    },
    inheritedProps (): object {
      return { ...this.$attrs, ...this.$props, tag: undefined }
    }
  }
})
</script>

<template>
  <component :is="tag" :style="{ backgroundSize, backgroundImage }" v-bind="inheritedProps" class="textured-deck">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
  .textured-deck {
    background: #000 no-repeat center center;
    background-size: cover;
    color: #fff;
  }
</style>