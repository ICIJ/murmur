<script>
import { isFunction, isString } from 'lodash'
import * as d3 from 'd3'
import * as scaleFunctions from 'd3-scale'

export default {
  name: 'ScaleLegend',
  props: {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 16
    },
    cursorValue: {
      type: Number,
      defaut: null
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    colorScale: {
      type: [Function, String],
      default: 'scaleLinear',
      validator (colorScale) {
        return isFunction(colorScale) || colorScale in scaleFunctions
      }
    },
    colorScaleEnd: {
      type: String,
      default () {
        const computedStyle = window.getComputedStyle(document.body)
        return computedStyle.getPropertyValue('--primary') || '#000'
      }
    },
    colorScaleStart: {
      type: String,
      default: '#fff'
    }
  },
  filters: {
    formatNumber: d3.format(',')
  },
  data () {
    return {
      cursorWrapperOffset: 0
    }
  },
  async mounted () {
    await this.$nextTick()
    this.setCursorWrapperOffset()
  },
  watch: {
    async cursorValue () {
      await this.$nextTick()
      this.setCursorWrapperOffset()
    }
  },
  methods: {
    setCursorWrapperOffset () {
      const cursor = this.$el.querySelector('.scale-legend__cursor')
      if (cursor) {
        const { x: cursorX, width: cursorWidth } = cursor.getBoundingClientRect()
        const { x: legendX, width: legendWidth } = this.$el.getBoundingClientRect()
        const left = legendX - cursorX - 6
        const right = (legendX + legendWidth) - (cursorX + cursorWidth) + 6
        this.cursorWrapperOffset = Math.max(0, left) || Math.min(0, right)
      } else {
        this.cursorWrapperOffset = 0
      }
    }
  },
  computed: {
    classList () {
      return {
        'scale-legend--has-cursor': this.hasCursor
      }
    },
    cursorLeft () {
      const left = this.cursorLeftScale(this.cursorValue)
      return isNaN(left) ? '0%' : `${left}%`
    },
    colorScaleBaseCanvas () {
      return d3.create('canvas')
        .attr('width', this.width)
        .attr('height', this.height)
        .node()
    },
    colorScaleContext () {
      return this.colorScaleBaseCanvas.getContext('2d')
    },
    colorScaleCanvas () {
      for (const x of this.colorScaleWidthRange) {
        const value = this.widthScale(x)
        this.colorScaleContext.fillStyle = this.colorScaleFunction(value)
        this.colorScaleContext.fillRect(x, 0, 1, this.height)
      }
      return this.colorScaleBaseCanvas
    },
    colorScaleBase64 () {
      return this.colorScaleCanvas.toDataURL()
    },
    colorScaleWidthRange () {
      return d3.range(1, this.width + 1)
    },
    hasCursor () {
      return ![null, undefined].includes(this.cursorValue)
    },
    colorScaleFunction () {
      if (isString(this.colorScale)) {
        return scaleFunctions[this.colorScale]()
          .domain([this.min, this.max])
          .range([this.colorScaleStart, this.colorScaleEnd])
      }
      return this.colorScale
    },
    cursorLeftScale () {
      return this.colorScaleFunction.copy().range([0, 100])
    },
    widthScale () {
      return this.colorScaleFunction.copy().range([1, this.width]).invert
    }
  }
}
</script>

<template>
  <div class="scale-legend" :class="classList">
    <div class="scale-legend__bound scale-legend__bound--min">
      <slot name="legend-cursor-min" v-bind="{ min }">
        {{ min | formatNumber }}
      </slot>
    </div>
    <img
      :height="height"
      :src="colorScaleBase64"
      :width="width"
      class="scale-legend__scale" />
    <div class="scale-legend__bound scale-legend__bound--max">
      <slot name="legend-cursor-max" v-bind="{ max }">
        {{ max | formatNumber }}
      </slot>
    </div>
    <div class="scale-legend__cursor" :style="{ left: cursorLeft }" v-if="hasCursor">
      <div class="scale-legend__cursor__wrapper" :style="{ transform: `translateX(${cursorWrapperOffset}px)` }">
        <slot name="cursor" v-bind="{ value: cursorValue }">
          {{ cursorValue | formatNumber }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/lib';

.scale-legend {
  position: relative;
  display: inline-block;

  &__bound, &__cursor {
    position: absolute;
    bottom: 100%;
    font-size: 0.8rem;

    &--min {
      left: 0;
    }

    &--max {
      right: 0;
    }
  }

  .choropleth-map--has-cursor &__bound {
    color: $text-muted;
    opacity: 0.6;
  }

  &__cursor {
    font-weight: bold;
    transform: translateX(-50%);
    left: 50%;

    &:after {
      content: "";
      border: 5px solid transparent;
      border-top-color: var(--dark, currentColor);
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
    }
  }
}
</style>
