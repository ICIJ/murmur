<script>
import { values } from 'lodash'
import { geoDistance } from 'd3-geo'

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
    color: {
      type: String
    },
    dropShadow: {
      type: String
    },
    geoDistanceThreshold: {
      type: Number,
      // The Earth's circumference can be divided into 360 degrees, or 2π radians.
      // Therefore, 1.57 radians is approximately a quarter of π (since π≈3.14), which corresponds to
      // a quarter of the Earth's circumference.
      default: 1.57
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
    center() {
      return [this.longitude, this.latitude]
    },
    projection() {
      return this.parent.rotatingMapProjection
    },
    position() {
      const [x, y] = this.projection(this.center)
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
        '--color': this.color,
        '--drop-shadow': this.dropShadow,
        '--scale': this.scale ? null : 1 / this.mapK,
        '--transform-origin': this.wrapperTransformOrigin
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
    },
    isVisible() {
      try {
        const { width, height } = this.parent.mapRect
        const mapCenter = this.projection.invert([width / 2, height / 2])
        return geoDistance(this.center, mapCenter) <= this.geoDistanceThreshold
      } catch (_) {
        return true
      }
    }
  }
}
</script>

<template>
  <g class="choropleth-map-annotation" :class="classList">
    <foreignObject :x="x" :y="y" :transform="transform" :width="width" :height="height">
      <div class="choropleth-map-annotation__wrapper" :style="wrapperStyle" v-show="isVisible">
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
  --color: #{$body-color};
  --drop-shadow: 0 0 1px #fff;
  --scale: 1;
  --transform-origin: 'center center';

  pointer-events: none;
  font-size: 1rem;
  line-height: 1;

  &__wrapper {
    color: var(--color);
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    transform: scale(var(--scale));
    transform-origin: var(--transform-origin);
    filter: drop-shadow(var(--drop-shadow));

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
