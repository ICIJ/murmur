<script>
export default {
  name: 'TexturedDeck',
  props: {
    /**
     * Name of the texture file ('silk', 'brick', 'rock', 'sand', 'crack', 'carbon')
     */
    value: {
      type: [String, Number],
      default: 1
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
    names () {
      return ['silk', 'brick', 'rock', 'sand', 'crack', 'carbon']
    },
    textureIndex () {
      if (isNaN(this.value)) {
        return Math.max(1, this.names.indexOf(this.value) + 1)
      }
      return this.value
    },
    filename () {
      if (this.black) {
        return `${this.textureIndex}-black.jpg`
      }
      return `${this.textureIndex}.jpg`
    },
    url () {
      return require(`@assets/images/textures/${this.filename}`)
    },
    backgroundSize () {
      return this.size
    },
    backgroundImage () {
      return `url("${this.url}")`
    },
    inheritedProps () {
      return { ...this.$attrs, ...this.$props, tag: undefined }
    }
  }
}
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