<template>
  <span class="brand" :style="{ color, background }" :class="{ 'brand--no-border': noBorder }">
    <svg :width="size" :height="size" viewBox="0 0 136.445 136.46125" >
      <g transform="translate(468.2225,-561.27444)" style="fill: currentColor">
        <path d="m -445.71225,656.85431 0,-58.52 10.05075,0 0,58.52 -10.05075,0" />
        <path d="m -405.10388,617.86844 0,-4.539 c 0,-4.94388 -2.2705,-7.05125 -4.86425,-7.05125 -4.05075,0 -5.34912,2.10737 -5.34912,6.48437 l 0,29.6655 c 0,4.376 1.29837,6.48288 5.34912,6.48288 3.648,0 4.86425,-2.10688 4.86425,-5.916 l 0,-7.05125 10.05038,0 0,6.72662 c 0,8.267 -4.86338,14.99463 -14.91463,14.99463 -10.53662,0 -15.39987,-6.72763 -15.39987,-14.99463 l 0,-30.15 c 0,-8.2675 4.86325,-14.996 15.39987,-14.996 10.05125,0 14.91463,7.29438 14.91463,16.04825 l 0,4.29588 -10.05038,0" />
        <path d="m -384.27225,656.85431 0,-58.52 10.04925,0 0,58.52 -10.04925,0" />
        <path d="m -368.54813,648.91094 2.10788,0 c 3.89063,0 5.268,-1.621 5.268,-4.86175 l 0,-45.71488 10.04988,0 0,46.84863 c 0,7.457 -2.99813,12.482 -14.10263,12.482 l -3.32313,0 0,-8.754" />
      </g>
    </svg>
  </span>
</template>

<script>
/**
 * A component to create variations of ICIJ logo
 */
export default {
  name: 'Brand',
  props: {
    /**
     * Logo's letters color
     */
    color: {
      type: String,
      default: 'black',
      required: true
    },
    /**
     * Logo's background color
     */
    background: {
      type: String
    },
    /**
     * Disable logo's border
     */
    noBorder: {
      type: Boolean
    },
    /**
     * Logo's size
     */
    size: {
      type: [Number, String],
      default: '70px'
    }
  }
}
</script>

<style scoped lang="scss">
.brand {
  color: black;
  display: inline-block;
  
  svg {
    border: 1px solid currentColor;
  }

  &--no-border svg {
    border: 0;
  }
}
</style>
