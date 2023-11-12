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
    /**
     * Placement of the annotation. Can be: top, topleft, topright, right,<br />
     * righttop, rightbottom, bottom, bottomleft, bottomright, left, lefttop,
     * and leftbottom.
     */
    placement: {
      type: String,
      default: PLACEMENTS.RIGHT,
      validator: (placement) => values(PLACEMENTS).includes(placement)
    }
  },
  computed: {
    classList() {
      return {
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
    translateX() {
      if (this.isRight) {
        return this.parent.mapTransform.x
      }
      if (this.isLeft) {
        return this.parent.mapTransform.x - this.width * this.scale
      }
      return this.parent.mapTransform.x - this.width / 2  * this.scale
    },
    translateY() {
      if (this.isTop) {
        return this.parent.mapTransform.y - this.height  * this.scale
      }
      if (this.isBottom) {
        return this.parent.mapTransform.y
      }
      return this.parent.mapTransform.y - this.height / 2 * this.scale
    },
    scale() {
      return this.parent.mapTransform.k
    },
    transform() {
      return `translate(${this.translateX}, ${this.translateY}) scale(${this.scale})`
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
    }
  }
}
</script>

<template>
  <g class="choropleth-map-annotation" :class="classList">
    <foreignObject :x="x" :y="y" :transform="transform" :width="width" :height="height">
      <div class="choropleth-map-annotation__wrapper">
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
  color: $body-color;
  font-size: 1rem;
  line-height: 1;
  filter: drop-shadow(0 0 1px #fff);

  &__wrapper {
    height: 100%;
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