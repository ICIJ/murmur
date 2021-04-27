<template>
  <div class="column-chart" :style="{ '--column-color': columnColor, '--column-highlight-color': columnHighlightColor }" :class="{ 'column-chart--has-highlights': dataHasHighlights, 'column-chart--social-mode': socialMode  }">
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <g class="column-chart__axis column-chart__axis--x" :style="{ transform: `translate(0, ${padded.height}px)` }"></g>
        <g class="column-chart__axis column-chart__axis--y" :style="{ transform: `translate(${padded.left}px, 0)` }"></g>
      </g>
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }" class="column-chart__columns">
        <rect v-for="(bar, i) in bars"
            :key="i"
            :class="{ 'column-chart__columns__item--highlight': bar.highlight }"
            class="column-chart__columns__item"
            :width="bar.width"
            :height="bar.height"
            :x="bar.x"
            :y="bar.y"></rect>
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
    }
  },
  data() {
    return {
      width: 0,
      height: 0
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
        left: this.labelWidth + 10,
        right: 0,
        top: this.labelHeight / 2,
        bottom: this.bucketHeight + 10
      }
    },
    padded () {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return { width, height }
    },
    scale () {
      const x = d3.scaleBand()
        .domain(this.sortedData.map(d => d[[this.timeseriesKey]]))
        .range([0, this.padded.width])
        .padding(.35)

      const maxValue = this.maxValue || d3.max(this.sortedData, d => d[this.seriesName])

      const y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([this.padded.height, 0])

      return { x, y }
    },
    bars () {
      return this.sortedData.map(d => {
        return {
          width: Math.abs(this.scale.x.bandwidth()),
          height: Math.abs(this.padded.height - this.scale.y(d[this.seriesName])),
          highlight: d.highlight,
          x: this.scale.x(d[this.timeseriesKey]),
          y: this.scale.y(d[this.seriesName])
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
    window.addEventListener('resize', this.setSizes)
    this.setSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setSizes)
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
  }
</style>
