<template>
  <div class="column-chart" :style="{ '--column-color': columnColor, '--column-highlight-color': columnHighlightColor }" :class="{ 'column-chart--has-highlights': dataHasHighlights, 'column-chart--social-mode': socialMode  }">
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <g class="column-chart__axis column-chart__axis--x" :style="{ transform: `translate(0, ${padded.height}px)` }" v-if="!noXAxis"></g>
        <g class="column-chart__axis column-chart__axis--y" :style="{ transform: `translate(${padded.left}px, 0)` }" v-if="!noYAxis"></g>
      </g>
      <g class="column-chart__columns" :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <rect v-for="(bar, index) in bars"
            :key="index"
            :class="{ 'column-chart__columns__item--highlight': bar.datum.highlight }"
            class="column-chart__columns__item"
            :width="bar.width"
            :height="bar.height"
            :x="bar.x"
            :y="bar.y"
            @mouseover="shownTooltip = index"
            @mouseleave="shownTooltip = -1"></rect>
      </g>
      <g class="column-chart__tooltips" :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }" v-if="!noTooltips">
        <foreignObject :width="maxTooltipWidth" :height="maxTooltipHeight" v-for="(bar, index) in bars" :key="index" :transform="barTooltipTransform(bar)">
          <transition name="fade">
            <div class="column-chart__tooltips__item" :class="barTooltipClasses(bar, index)" v-if="index === shownTooltip">
              <div class="column-chart__tooltips__item__wrapper" xmlns="http://www.w3.org/1999/xhtml">
                <slot name="tooltip" v-bind="bar">
                  <h6 class="column-chart__tooltips__item__wrapper__heading mb-0">
                    {{ bar.datum[timeseriesKey] | d3Formatter(xAxisTickFormat) }}
                  </h6>
                  <div class="column-chart__tooltips__item__wrapper__value">
                    {{ bar.datum[seriesName] | d3Formatter(yAxisTickFormat) }}
                  </div>
                </slot>
              </div>
            </div>
          </transition>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import identity from 'lodash/identity'
import sortBy from 'lodash/sortBy'
import chart from '../mixins/chart'

export default {
  name: 'ColumnChart',
  mixins: [chart],
  props: {
    /**
     * Color of each column (uses the CSS variable --column-color by default)
     */
    columnColor: {
      type: String
    },
    /**
     * Color of each highlighted column (uses the CSS variable --column-color by default)
     */
    columnHighlightColor: {
      type: String
    },
    /**
     * Enforce the height of the chart (regardless of the width or the social mode)
     */
    fixedHeight: {
      type: Number,
      default: null
    },
    /**
     * Enforce a width for each column's label
     */
    fixedLabelWidth: {
      type: Number
    },
    /**
     * Name of the series (to get the value from in the data collection objects)
     */
    seriesName: {
      type: String,
      default: 'value'
    },
    /**
     * Function to apply to format x axis ticks
     */
    xAxisTickFormat: {
      type: [Function, String],
      default: identity
    },
    /**
     * Function to apply to format y axis ticks
     */
    yAxisTickFormat: {
      type: [Function, String],
      default: identity
    },
    /**
     * Number of y axis ticks
     */
    yAxisTicks: {
      type: Number,
      default: 5
    },
    /**
     * Sort columns by one or several keys.
     */
    sortBy: {
      type: [Array, String],
      default: null
    },
    /**
     * Key to use for timeseries
     */
    timeseriesKey: {
      type: String,
      default: 'date'
    },
    /**
     * Set max value instead of extracting it from the data.
     */
    maxValue: {
      type: Number,
      default: null
    },
    /**
     * Set the maximum width of a tooltip
     */
    maxTooltipWidth: {
      type: Number,
      default: 200
    },
    /**
     * Set the maximum height of a tooltip
     */
    maxTooltipHeight: {
      type: Number,
      default: 200
    },
    /**
     * Hide bar tooltips
     */
    noTooltips: {
      type: Boolean
    },
    /**
     * Hide x axis
     */
    noXAxis: {
      type: Boolean
    },
    /**
     * Hide y axis
     */
    noYAxis: {
      type: Boolean
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
    sortedData () {
      if (!this.loadedData) {
        return []
      }
      return !this.sortBy ? this.loadedData : sortBy(this.sortedData, this.sortBy)
    },
    labelWidth () {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.column-chart__axis--y .tick text'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    labelHeight () {
      const selector = '.column-chart__axis--y .tick text'
      const defaultHeight = 10
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    bucketHeight () {
      const selector = '.column-chart__axis--x .tick text'
      const defaultHeight = 10
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    margin () {
      return {
        left: this.noYAxis ? 0 : this.labelWidth + 10,
        right: 0,
        top: this.labelHeight / 2,
        bottom: this.noXAxis ? 0 : this.bucketHeight + 10
      }
    },
    padded () {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return { width, height }
    },
    scale () {
      const x = d3.scaleBand()
        .domain(this.sortedData.map(d => d[this.timeseriesKey]))
        .range([0, this.padded.width])
        .padding(.35)

      const maxValue = this.maxValue || d3.max(this.sortedData, d => d[this.seriesName])

      const y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([this.padded.height, 0])

      return { x, y }
    },
    bars () {
      return this.sortedData.map(datum => {
        return {
          datum,
          width: Math.abs(this.scale.x.bandwidth()),
          height: Math.abs(this.padded.height - this.scale.y(datum[this.seriesName])),
          x: this.scale.x(datum[this.timeseriesKey]),
          y: this.scale.y(datum[this.seriesName]),
        }
      });
    },
    discreteKeys () {
      if (!this.loadedData) {
        return []
      }
      return without(keys(this.loadedData[0]), this.timeseriesKey)
    }
  },
  mounted () {
    this.$on('resized', this.setSizes)
    this.setSizes()
  },
  watch: {
    width () {
      this.setup()
    },
    socialMode () {
      this.setup()
    },
    loadedData () {
      this.setup()
    },
    mounted () {
      this.setup()
    }
  },
  methods: {
    setup () {
      this.initialize()
      this.update()
    },
    setSizes() {
      this.width = this.$el.offsetWidth
      this.height = this.fixedHeight !== null ? this.fixedHeight : this.$el.offsetWidth * this.baseHeightRatio
    },
    initialize() {
      d3.axisLeft().scale(this.scale.y)
      d3.axisBottom().scale(this.scale.x)
    },
    update() {
      d3.select(this.$el).select(".column-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
          .tickFormat(d => this.$options.filters.d3Formatter(d, this.xAxisTickFormat))
        ).select(".domain").remove()

      d3.select(this.$el).select(".column-chart__axis--y")
        .call(d3.axisLeft(this.scale.y)
          .tickFormat(d => this.$options.filters.d3Formatter(d, this.yAxisTickFormat))
          .ticks(this.yAxisTicks)
        ).selectAll(".tick line").attr("x2", this.padded.width)
    },
    barTooltipTransform ({ x = 0, y = 0, width = 0 } = {}) {
      const flipX = x > this.padded.width / 2
      const flipY = y < this.padded.height / 2
      const tooltipX = x + (flipX ? -this.maxTooltipWidth : width)
      const tooltipY = y + (flipY ? 0 : -this.maxTooltipHeight)
      return `translate(${tooltipX}, ${tooltipY})`
    },
    barTooltipClasses ({ x = 0, y = 0 } = {}, index = 0) {
      const flipX = x > this.padded.width / 2
      const flipY = y < this.padded.height / 2
      return {
        'column-chart__tooltips__item--flip-x': flipX,
        'column-chart__tooltips__item--flip-y': flipY
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/lib';

  .column-chart {

    &--has-highlights &__columns__item:not(&__columns__item--highlight):not(:hover) {
      opacity: 0.7;
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


      &__item {
        display: flex;
        text-align: center;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        height: 100%;
        position: relative;

        &.fade-enter-active, &.fade-leave-active {
          transition: $transition-fade;
        }

        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }

        &--flip-x {
          justify-content: flex-end;
        }

        &--flip-y {
          align-items: flex-start;
        }

        &:after {
          content: "";
          border: ($tooltip-arrow-width / 2) solid transparent;
          position: absolute;
          transform: translateX(1px);
        }

        &--flip-x:after {
          border-left-color: rgba($tooltip-bg, $tooltip-opacity);
          transform: translateX(-1px);
        }

        &:not(&--flip-x):after {
          border-right-color: rgba($tooltip-bg, $tooltip-opacity);
        }

        &--flip-y {
          align-items: flex-start;
        }

        &--flip-y:after {
          border-top-color: rgba($tooltip-bg, $tooltip-opacity);
        }

        &:not(&--flip-y):after {
          border-bottom-color: rgba($tooltip-bg, $tooltip-opacity);
        }

        &__wrapper {
          background: rgba($tooltip-bg, $tooltip-opacity);
          color: $tooltip-color;
          margin: 0 $tooltip-arrow-width;
          padding: .2rem .4rem;
        }
      }
    }
  }
</style>
