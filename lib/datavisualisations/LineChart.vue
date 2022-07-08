<template>
  <div class="line-chart" :style="{ '--line-color': lineColor }" :class="{ 'line-chart--social-mode': socialMode }">
    <svg :width="width" :height="height">
      <g class="line-chart__axis line-chart__axis--x" :style="{transform: `translate(${margin.left}px, ${margin.top + padded.height}px)`}">></g>
      <g class="line-chart__axis line-chart__axis--y" :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}">></g>
      <g :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}">
        <path class="line-chart__line" :d="line" />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import isFunction from 'lodash/isFunction'
import identity from 'lodash/identity'

import chart from '../mixins/chart'

// Call the first argument if it's a function, or return it
const castCall = (fnOrValue = identity, ...rest) => isFunction(fnOrValue) ? fnOrValue(...rest) : fnOrValue

export default {
  name: 'LineChart',
  mixins: [chart],
  props: {
    /**
     * Color of the line (uses the CSS variable --line-color by default)
     */
    lineColor: {
      type: String
    },
    /**
     * Enforce a width for each column's label
     */
    fixedLabelWidth: {
      type: Number
    },
    /**
     * Enforce the height of the chart (regardless of the width or the social mode)
     */
    fixedHeight: {
      type: Number,
      default: null
    },
    /**
     * Name of the series (to get the value from in the data collection objects)
     */
    seriesName: {
      type: String,
      default: 'value'
    },
    /**
     * Argument for x-axis ticks
     * @see https://github.com/d3/d3-axis#axis_ticks
     */
    xAxisTicks: {
      type: [Object, Number, Function],
      default: null
    },
    /**
     * Function to apply to format y axis ticks (line value). It can be a
     * function returning the formatted value or a d3's formatter string.
     */
    yAxisTickFormat: {
      type: [Function, String],
      default: identity
    },
    /**
     * Argument for y-axis ticks
     * @see https://github.com/d3/d3-axis#axis_ticks
     */
    yAxisTicks: {
      type: [Object, Number, Function],
      default: 5
    },
    /**
     * Key to use for timeseries
     */
    timeseriesKey: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      line: null
    }
  },
  computed: {
    labelWidth () {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.line-chart__axis--y .tick text'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    labelHeight () {
      const selector = '.line-chart__axis--y .tick'
      const defaultHeight = 10
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    bucketHeight () {
      const selector = '.line-chart__axis--x .tick'
      const defaultHeight = 10
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    bucketWidth () {
      const selector = '.line-chart__axis--x .tick text'
      const defaultWidth = 0
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    scale () {
      return {
        x: d3.scaleTime().range([0, this.padded.width]),
        y: d3.scaleLinear().range([this.padded.height, 0])
      }
    },
    margin () {
      const left = this.labelWidth + 10
      const right = this.bucketWidth / 2
      const top = this.labelHeight
      const bottom = this.bucketHeight + 10
      return { left, right, top, bottom }
    },
    padded () {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return { width, height }
    },
    formattedData () {
      if (!this.loadedData) {
        return []
      }
      return this.loadedData.map(d => {
        d[this.timeseriesKey] = this.parseTime(d[this.timeseriesKey])
        d[this.seriesName] = +d[this.seriesName]
        return d
      })
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
    socialMode () {
      this.setSizes()
    },
    width () {
      this.update()
    },
    height () {
      this.update()
    },
    fixedHeight () {
      this.update()
    },
    loadedData () {
      this.update()
    },
    labelHeight () {
      this.update()
    }
  },
  methods: {
    createLine: d3.line().x(d => d.x).y(d => d.y),
    parseTime: d3.timeParse("%Y"),
    setSizes () {
      this.width = this.$el.offsetWidth
      this.height = this.fixedHeight !== null ? this.fixedHeight : this.$el.offsetWidth * this.baseHeightRatio
    },
    update() {
      this.scale.x.domain(d3.extent(this.formattedData, d => d[this.timeseriesKey]))
      this.scale.y.domain([0, d3.max(this.formattedData, d => d[this.seriesName])])

      const points = this.formattedData.map(d => {
        return {
          x: this.scale.x(d[this.timeseriesKey]),
          y: this.scale.y(d[this.seriesName]),
        }
      })

      this.line = this.createLine(points)

      d3.select(this.$el).select(".line-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
          .ticks(this.xAxisTicks)
          .tickFormat(d => castCall(this.xAxisYearFormat, d.getFullYear())))

      d3.select(this.$el).select(".line-chart__axis--y")
        .call(d3.axisLeft(this.scale.y)
        .tickFormat(d => this.$options.filters.d3Formatter(d, this.yAxisTickFormat))
        .ticks(this.yAxisTicks))
        .selectAll(".tick line").attr("x2", this.padded.width)
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/lib';

  .line-chart {

    text {
      font-family: $font-family-base;
      font-size: $font-size-sm;
      fill: currentColor;
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

    &__line {
      fill: none;
      stroke: var(--line-color, var(--dark, $dark));
      stroke-width: 3px;
    }
  }
</style>
