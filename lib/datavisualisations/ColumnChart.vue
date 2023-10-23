<template>
  <div
    class="column-chart"
    :style="{ '--column-color': columnColor, '--column-highlight-color': columnHighlightColor }"
    :class="{
      'column-chart--has-highlights': dataHasHighlights,
      'column-chart--hover': hover,
      'column-chart--stripped': stripped,
      'column-chart--social-mode': socialMode
    }"
  >
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <g
          v-if="!noXAxis"
          class="column-chart__axis column-chart__axis--x"
          :style="{ transform: `translate(0, ${padded.height}px)` }"
        />
        <g v-if="!noYAxis" class="column-chart__axis column-chart__axis--y" />
      </g>
      <g class="column-chart__columns" :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <g
          v-for="(bar, index) in bars"
          :key="index"
          class="column-chart__columns__item"
          :class="{ 'column-chart__columns__item--highlight': highlighted(bar.datum) }"
          :style="{ transform: `translate(${bar.x}px, 0px)` }"
          @click="select(bar)"
          @mouseover="shownTooltip = index"
          @mouseleave="shownTooltip = -1"
        >
          <rect class="column-chart__columns__item__placeholder" :width="bar.width" :height="padded.height" />
          <rect class="column-chart__columns__item__bar" :width="bar.width" :height="bar.height" :y="bar.y" />
        </g>
      </g>
    </svg>
    <div v-if="!noTooltips" class="column-chart__tooltips">
      <div v-for="(bar, index) in bars" :key="index">
        <div class="column-chart__tooltips__item" :style="barTooltipStyle(bar)">
          <transition name="fade">
            <div v-if="shownTooltip === index" class="column-chart__tooltips__item__wrapper">
              <slot name="tooltip" v-bind="bar">
                <h6 class="column-chart__tooltips__item__wrapper__heading mb-0">
                  {{ bar.datum[timeseriesKey] | d3Formatter(xAxisTickFormat) }}
                </h6>
                <div class="column-chart__tooltips__item__wrapper__value">
                  {{ bar.datum[seriesName] | d3Formatter(yAxisTickFormat) }}
                </div>
              </slot>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { iteratee, identity, sortBy } from 'lodash'
import * as d3 from 'd3'

import chart from '../mixins/chart'

export default defineComponent({
  name: 'ColumnChart',
  mixins: [chart],
  props: {
    /**
     * Color of each column (uses the CSS variable --column-color by default)
     */
    columnColor: {
      type: String as PropType<string>,
      default: null
    },
    /**
     * Color of each highlighted column (uses the CSS variable --column-color by default)
     */
    columnHighlightColor: {
      type: String as PropType<string>,
      default: null
    },
    /**
     * Enforce the height of the chart (regardless of the width or the social mode)
     */
    fixedHeight: {
      type: Number as PropType<number>,
      default: null
    },
    /**
     * Enforce a width for each column's label
     */
    fixedLabelWidth: {
      type: Number as PropType<number>,
      default: null
    },
    /**
     * Name of the series (to get the value from in the data collection objects)
     */
    seriesName: {
      type: String as PropType<string>,
      default: 'value'
    },
    /**
     * Hide x axis ticks when no enough space
     */
    xAxisTickCollapse: {
      type: Boolean as PropType<boolean> as PropType<boolean>,
      default: false
    },
    /**
     * Function to apply to format x axis ticks
     */
    xAxisTickFormat: {
      type: [Function, String] as PropType<Function | string>,
      default: identity
    },
    /**
     * Definition of x axis ticks
     */
    xAxisTicks: {
      type: Array as PropType<string[] | null>,
      default: null
    },
    /**
     * Function to apply to format y axis ticks
     */
    yAxisTickFormat: {
      type: [Function, String] as PropType<Function | string>,
      default: identity
    },
    /**
     * Definition of y axis ticks
     */
    yAxisTicks: {
      type: [Number, Object] as PropType<number | object>,
      default: 5
    },
    /**
     * Sort columns by one or several keys.
     */
    sortBy: {
      type: [Array, String] as PropType<string | string[]>,
      default: null
    },
    /**
     * Key to use for timeseries
     */
    timeseriesKey: {
      type: String as PropType<string>,
      default: 'date'
    },
    /**
     * Set max value instead of extracting it from the data.
     */
    maxValue: {
      type: Number as PropType<number>,
      default: null
    },
    /**
     * Hide bar tooltips
     */
    noTooltips: {
      type: Boolean as PropType<boolean>
    },
    /**
     * Hide x axis
     */
    noXAxis: {
      type: Boolean as PropType<boolean>
    },
    /**
     * Hide y axis
     */
    noYAxis: {
      type: Boolean as PropType<boolean>
    },
    /**
     * Bar padding as a portion of each bar width
     */
    barPadding: {
      type: Number as PropType<number>,
      default: 0.35
    },
    /**
     * Bar margin in pixel
     */
    barMargin: {
      type: Number as PropType<number>,
      default: 0
    },
    /**
     * A list of highlighted key
     */
    highlights: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    /**
     * Show a "placeholder" behind every bar
     */
    stripped: {
      type: Boolean as PropType<boolean>
    },
    /**
     * Show a "placeholder" behind every bar on hover
     */
    hover: {
      type: Boolean as PropType<boolean>
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      shownTooltip: -1
    }
  },
  computed: {
    sortedData(): any[] {
      if (!this.loadedData) {
        return []
      }
      return !this.sortBy ? this.loadedData : sortBy(this.sortedData, this.sortBy)
    },
    labelWidth(): number {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.column-chart__axis--y .tick text'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    labelHeight(): number {
      if (this.noYAxis) {
        return 0
      }
      const selector = '.column-chart__axis--y .tick text'
      const defaultHeight = 10
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    bucketHeight(): number {
      if (this.noXAxis) {
        return 0
      }
      const selector = '.column-chart__axis--x .tick text'
      const defaultHeight = 10
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    bucketWidth(): number {
      const selector = '.column-chart__axis--x .tick text'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    margin(): { left: number; right: number; top: number; bottom: number } {
      return {
        left: this.noYAxis ? 0 : this.labelWidth + 10,
        right: 0,
        top: this.labelHeight / 2,
        bottom: this.noXAxis ? 0 : this.bucketHeight + 10
      }
    },
    padded(): { width: number; height: number } {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return { width, height }
    },
    scaleX(): d3.ScaleBand<string> {
      return d3
        .scaleBand()
        .domain(this.sortedData.map(iteratee(this.timeseriesKey)))
        .range([0, this.padded.width])
        .padding(this.barPadding)
    },
    scaleY(): d3.ScaleLinear<number, number> {
      const maxValue = this.maxValue ?? d3.max(this.sortedData, iteratee(this.seriesName))
      return d3.scaleLinear().domain([0, maxValue]).range([this.padded.height, 0])
    },
    bars(): any[] {
      return this.sortedData.map((datum: any) => {
        return {
          datum,
          width: Math.max(1, Math.abs(this.scaleX.bandwidth()) - this.barMargin),
          height: Math.abs(this.padded.height - this.scaleY(datum[this.seriesName])),
          x: (this.scaleX(datum[this.timeseriesKey]) ?? 0) + this.barMargin / 2,
          y: this.scaleY(datum[this.seriesName]) ?? 0
        }
      })
    },
    xAxisHiddenTicks(): number {
      if (!this.xAxisTickCollapse) {
        return 0
      }

      const hiddenTicks = d3.range(1, this.sortedData.length).find((mod) => {
        const bucketWidth = this.bucketWidth * 1.5
        return this.width / (bucketWidth / mod) >= this.sortedData.length
      })

      return hiddenTicks ?? this.sortedData.length
    },
    xAxisTickValues(): string[] {
      // Etheir use the explicit `xAxisTicks` prop or use the data
      const ticks = this.xAxisTicks ?? this.sortedData.map(iteratee(this.timeseriesKey))
      // Then filter out ticks according to `this.xAxisHiddenTicks`
      return ticks.map((tick, i) => {
        return (i + 1) % this.xAxisHiddenTicks ? null : tick
      })
    },
    xAxis(): d3.Axis<string> {
      return d3
        .axisBottom(this.scaleX)
        .tickFormat((d) => this.$options.filters?.d3Formatter(d, this.xAxisTickFormat))
        .tickValues(this.xAxisTickValues)
    },
    yAxis(): d3.Axis<d3.NumberValue> {
      return d3
        .axisLeft(this.scaleY)
        .tickFormat((d) => this.$options.filters?.d3Formatter(d, this.yAxisTickFormat))
        .ticks(this.yAxisTicks)
    }
  },
  watch: {
    width() {
      this.setup()
    },
    fixedHeight() {
      this.setSizes()
    },
    socialMode() {
      this.setup()
    },
    loadedData() {
      this.setup()
    },
    mounted() {
      this.setup()
    }
  },
  mounted() {
    this.$on('resized', this.setSizes)
    this.setSizes()
  },
  methods: {
    setup() {
      this.update()
    },
    setSizes() {
      this.width = (this.$el as HTMLElement)?.offsetWidth ?? 0
      this.height = this.fixedHeight !== null ? this.fixedHeight : this.width * this.baseHeightRatio
      this.update()
    },
    select({ datum }: { datum: any }) {
      /**
       * Fired when a column is selected
       * @event click
       * @param Mixed New step value.
       */
      this.$emit('select', datum)
    },
    update() {
      if (!this.$el) {
        return
      }

      d3.select(this.$el)
        .select('.column-chart__axis--x')
        .call(this.xAxis as any)
        .select('.domain')
        .remove()

      d3.select(this.$el)
        .select('.column-chart__axis--y')
        .call(this.yAxis as any)
        .selectAll('.tick line')
        .attr('x2', this.padded.width)
    },
    barTooltipStyle(bar: object) {
      const top = `${bar.y + this.margin.top}px`
      const left = `${bar.x + bar.width / 2 + this.margin.left}px`
      return { top, left }
    },
    highlighted(datum: any): boolean {
      return datum.highlight || this.highlights.includes(datum[this.timeseriesKey])
    }
  }
})
</script>

<style lang="scss">
@import '../styles/lib';

.column-chart {
  --highlight-opacity: 0.7;
  --placeholder-opacity: 0.1;

  position: relative;

  &--has-highlights &__columns__item:not(&__columns__item--highlight):not(:hover) {
    opacity: var(--highlight-opacity);
    filter: grayscale(30%);
  }

  text {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    fill: currentColor;
  }

  &__columns__item {
    fill: var(--column-color, var(--dark, $dark));

    &--highlight {
      fill: var(--column-highlight-color, var(--primary, $primary));
    }

    &__placeholder {
      opacity: 0;

      .column-chart--stripped &,
      .column-chart--hover .column-chart__columns__item:hover & {
        opacity: var(--placeholder-opacity);
      }
    }
  }

  &__axis {
    .domain {
      display: none;
    }

    .tick line {
      stroke: $border-color;
    }

    &--x .tick line {
      display: none;
    }
  }

  &__tooltips {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;

    &__item {
      display: inline-flex;
      text-align: center;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-start;
      position: absolute;
      transform: translate(-50%, -100%);
      margin-top: -0.5 * $tooltip-arrow-width;

      &__wrapper {
        max-width: $tooltip-max-width;
        background: rgba($tooltip-bg, $tooltip-opacity);
        border-radius: $tooltip-border-radius;
        color: $tooltip-color;
        margin: 0;
        padding: $tooltip-padding-y $tooltip-padding-x;

        &.fade-enter-active,
        &.fade-leave-active {
          transition: $transition-fade;
        }

        &.fade-enter,
        &.fade-leave-to {
          opacity: 0;
        }

        &:after {
          content: '';
          border: ($tooltip-arrow-width * 0.5) solid transparent;
          border-top-color: rgba($tooltip-bg, $tooltip-opacity);
          transform: translateX(-50%);
          position: absolute;
          left: 50%;
          top: 100%;
        }
      }
    }
  }
}
</style>
