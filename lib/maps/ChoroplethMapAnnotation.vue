<script>
import { values } from 'lodash'

const PLACEMENTS = {
  TOP: 'top',
  TOPLEFT: 'topleft',
  TOPRIGHT: 'topright',
  RIGHT: 'right',
  RIGHTTOP: 'righttop',
  RIGHTBOTTOM: 'rightbottom',
  BOTTOM: 'bottom',
  BOTTOMLEFT: 'bottomleft',
  BOTTOMRIGHT: 'bottomright',
  LEFT: 'left',
  LEFTTOP: 'lefttop',
  LEFTBOTTOM: 'leftbottom'
}

export default {
  name: 'ChoroplethMapAnnotation',
  inject: ['parent'],
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      default: 150
    },
    width: {
      type: Number,
      default: 150
    },
    scale: {
      type: Boolean
    },
    /**
     * Placement of the annotation. Can be: top, topleft, topright, right,<br />
     * righttop, rightbottom, bottom, bottomleft, bottomright, left, lefttop,
     * and leftbottom.
     */
    placement: {
      type: String,
      default: null,
      validator: (p) => p === null || values(PLACEMENTS).includes(p)
    }
  },
  computed: {
    classList() {
      return {
        'choropleth-map-annotation--center': this.isCenter,
        'choropleth-map-annotation--right': this.isRight,
        'choropleth-map-annotation--left': this.isLeft,
        'choropleth-map-annotation--top': this.isTop,
        'choropleth-map-annotation--bottom': this.isBottom
      }
    },
    position() {
      const [x, y] = this.parent.mapProjection([this.longitude, this.latitude])
      return { x, y }
    },
    mapK() {
      return this.parent.mapTransform.k
    },
    translateX() {
      if (this.isRight) {
        return 0
      }
      if (this.isLeft) {
        return 0 - this.width
      }
      return 0 - (this.width) / 2
    },
    translateY() {
      if (this.isTop) {
        return 0 - this.height
      }
      if (this.isBottom) {
        return 0
      }
      return 0 - (this.height) / 2
    },
    transform() {
      return `translate(${this.translateX}, ${this.translateY})`
    },
    x() {
      return this.position.x
    },
    y() {
      return this.position.y
    },
    isRight() {
      return [
        PLACEMENTS.RIGHT,
        PLACEMENTS.RIGHTBOTTOM,
        PLACEMENTS.RIGHTTOP,
        PLACEMENTS.BOTTOMRIGHT,
        PLACEMENTS.TOPRIGHT
      ].includes(this.placement)
    },
    isLeft() {
      return [
        PLACEMENTS.LEFT,
        PLACEMENTS.LEFTBOTTOM,
        PLACEMENTS.LEFTTOP,
        PLACEMENTS.BOTTOMLEFT,
        PLACEMENTS.TOPLEFT
      ].includes(this.placement)
    },
    isTop() {
      return [
        PLACEMENTS.TOP,
        PLACEMENTS.TOPLEFT,
        PLACEMENTS.TOPRIGHT,
        PLACEMENTS.LEFTTOP,
        PLACEMENTS.RIGHTTOP
      ].includes(this.placement)
    },
    isBottom() {
      return [
        PLACEMENTS.BOTTOM,
        PLACEMENTS.BOTTOMLEFT,
        PLACEMENTS.BOTTOMRIGHT,
        PLACEMENTS.LEFTBOTTOM,
        PLACEMENTS.RIGHTBOTTOM
      ].includes(this.placement)
    },
    isCenter() {
      return !this.isLeft && !this.isRight && !this.isTop && !this.isBottom
    },
    wrapperStyle() {
      return { 
        transform: this.scale ? null : `scale(${1 / this.mapK})`,
        transformOrigin: this.wrapperTransformOrigin
      }
    },
    wrapperTransformOrigin() {
      return `${this.wrapperTransformOriginX} ${this.wrapperTransformOriginY}`
    },
    wrapperTransformOriginX() {
      if (this.isRight) {
        return 'left'
      } else if (this.isLeft) {
        return 'right'
      }
      return 'center'
    },
    wrapperTransformOriginY() {
      if (this.isTop) {
        return 'bottom'
      } else if (this.isBottom) {
        return 'top'
      }
      return 'center'
    }
  }
}
</script>

<template>
  <g class="choropleth-map-annotation" :class="classList">
    <foreignObject :x="x" :y="y" :transform="transform" :width="width" :height="height">
      <div class="choropleth-map-annotation__wrapper" :style="wrapperStyle">
        <div class="choropleth-map-annotation__wrapper__content">
          <slot />
        </div>
      </div>
    </foreignObject>
  </g>
</template>

<style scoped lang="scss">
@import '../styles/lib';

.choropleth-map-annotation {
  pointer-events: none;
  color: $body-color;
  font-size: 1rem;
  line-height: 1;
  filter: drop-shadow(0 0 1px #fff);

  &__wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;

    .choropleth-map-annotation--right & {
      justify-content: start;
      text-align: left;
    }

    .choropleth-map-annotation--left & {
      justify-content: end;
      text-align: right;
    }

    .choropleth-map-annotation--top & {
      align-items: end;
    }

    .choropleth-map-annotation--bottom & {
      align-items: start;
    }
  }
}
</style>
