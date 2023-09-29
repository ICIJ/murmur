<script lang="ts">
import { isFunction, isString } from 'lodash'
import * as d3 from 'd3'
import * as scaleFunctions from 'd3-scale'
import { defineComponent } from 'vue'

type ClassListLegend = { 'scale-legend--has-cursor': boolean }
// eslint-disable-next-line no-unused-vars
type ColorScaleFn = (v?: number) => string

type ColorScale = ColorScaleFn | string
// eslint-disable-next-line no-unused-vars
type WidthScaleFn = (x: number) => string

export default defineComponent({
  name: 'ScaleLegend',
  filters: {
    formatNumber: d3.format(',')
  },
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
      default: null
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
      type: [Function as unknown as ColorScaleFn, String],
      default: 'scaleLinear',
      validator(colorScale: ColorScale) {
        return isFunction(colorScale) || (colorScale as string) in scaleFunctions
      }
    },
    colorScaleEnd: {
      type: String,
      default() {
        const computedStyle = window.getComputedStyle(document.body)
        return computedStyle.getPropertyValue('--primary') || '#000'
      }
    },
    colorScaleStart: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      cursorWrapperOffset: 0,
      mounted: false
    }
  },
  computed: {
    classList(): ClassListLegend {
      return {
        'scale-legend--has-cursor': this.hasCursor
      }
    },
    cursorLeft(): string {
      const left = this.cursorLeftScale(this.cursorValue)
      return isNaN(left) ? '0%' : `${left}%`
    },
    colorScaleBaseCanvas(): HTMLCanvasElement | null {
      return d3.create('canvas').attr('width', this.width).attr('height', this.height).node()
    },
    colorScaleContext(): CanvasRenderingContext2D | null {
      return this.colorScaleBaseCanvas?.getContext('2d') ?? null
    },
    colorScaleBase64(): string | null {
      if (this.mounted) {
        return this.colorScaleBaseCanvas?.toDataURL() ?? null
      }
      return null
    },
    colorScaleWidthRange(): number[] {
      return d3.range(1, this.width + 1)
    },
    hasCursor(): boolean {
      return this.cursorValue != null // double equal also tests undefined
    },
    colorScaleFunction(): ColorScaleFn {
      if (isString(this.colorScale)) {
        // @ts-ignore
        const fn: () => any = scaleFunctions[this.colorScale]
        return fn().domain([this.min, this.max]).range([this.colorScaleStart, this.colorScaleEnd])
      }
      return this.colorScale
    },
    cursorLeftScale(): d3.ScaleLinear<number, number> {
      return d3.scaleLinear().domain([this.min, this.max]).range([0, 100]).interpolate(d3.interpolateRound)
    },
    widthScaleColor(): WidthScaleFn {
      return (x: number) => {
        const value = this.widthScale(x)
        return this.colorScaleFunction(value)
      }
    },
    widthScale(): d3.ScaleLinear<number, number> {
      return d3.scaleLinear().domain([0, this.width]).range([this.min, this.max])
    }
  },
  watch: {
    async cursorValue() {
      await this.$nextTick()
      this.setCursorWrapperOffset()
    }
  },
  async mounted() {
    await this.$nextTick()
    this.setCursorWrapperOffset()
    this.setColorScaleCanvas()
    this.mounted = true
  },
  methods: {
    setCursorWrapperOffset(): void {
      const cursor = this.$el.querySelector('.scale-legend__cursor')
      if (cursor) {
        const { x: cursorX, width: cursorWidth } = cursor.getBoundingClientRect()
        const { x: legendX, width: legendWidth } = this.$el.getBoundingClientRect()
        const left = legendX - cursorX - 6
        const right = legendX + legendWidth - (cursorX + cursorWidth) + 6
        this.cursorWrapperOffset = Math.max(0, left) || Math.min(0, right)
      } else {
        this.cursorWrapperOffset = 0
      }
    },
    setColorScaleCanvas(): void {
      if (!this.colorScaleContext) {
        return
      }
      for (const x of this.colorScaleWidthRange) {
        this.colorScaleContext.fillStyle = this.widthScaleColor(x)
        this.colorScaleContext.fillRect(x, 0, 1, this.height)
      }
    }
  }
})
</script>

<template>
  <div :class="classList" class="scale-legend">
    <div class="scale-legend__bound scale-legend__bound--min">
      <slot name="legend-cursor-min" v-bind="{ min }">
        {{ min | formatNumber }}
      </slot>
    </div>
    <img :height="height" :src="colorScaleBase64" :width="width" class="scale-legend__scale" />
    <div class="scale-legend__bound scale-legend__bound--max">
      <slot name="legend-cursor-max" v-bind="{ max }">
        {{ max | formatNumber }}
      </slot>
    </div>
    <div v-if="hasCursor" :style="{ left: cursorLeft }" class="scale-legend__cursor">
      <div :style="{ transform: `translateX(${cursorWrapperOffset}px)` }" class="scale-legend__cursor__wrapper">
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

  &__bound,
  &__cursor {
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
      content: '';
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
