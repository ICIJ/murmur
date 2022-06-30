<script>
export default {
  name: 'TexturedDeck',
  props: {
    /**
     * Name of the texture file (1, 2, 3, 4, 5, 6)
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
    }
  },
  computed: {
    url () {
      return require(`@assets/images/textures/${this.value}.jpg`)
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