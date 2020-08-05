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
import { identity, isFunction, max } from 'lodash'

import * as d3 from 'd3';
import chart from '../mixins/chart'

// Call the first argument if it's a function, or return it
const castCall = (fnOrValue = identity, ...rest) => isFunction(fnOrValue) ? fnOrValue(...rest) : fnOrValue

export default {
  name: 'ColumnChart',
  mixins: [chart],
  props: {
    /**
     * A data collection for the chart.
     */
    data: {
      type: Array
    },
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
      type: Function,
      default: identity
    },
    /**
     * Function to apply to format y axis ticks
     */
    yAxisTickFormat: {
      type: Function,
      default: identity
    },
    /**
     * Number of y axis ticks
     */
    yAxisTicks: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    labelWidth () {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.column-chart__axis--y .tick text'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    bucketHeight () {
      const selector = '.column-chart__axis--x .tick text'
      const defaultWidth = 0
      return this.elementsMaxBBox({ selector, defaultWidth }).height
    },
    margin () {
      return {
        left: this.labelWidth + 10,
        right: 0,
        top: 0,
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
        .domain(this.data.map(d => d.date))
        .range([0, this.padded.width])
        .padding(.35)

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d[this.seriesName])])
        .range([this.padded.height, 0])

      return { x, y }
    },
    bars () {
      return this.data.map(d => {
        return {
          width: Math.abs(this.scale.x.bandwidth()),
          height: Math.abs(this.padded.height - this.scale.y(d[this.seriesName])),
          highlight: d.highlight,
          x: this.scale.x(d.date),
          y: this.scale.y(d[this.seriesName])
        }
      });
    },
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    width () {
      this.setup()
    },
    data () {
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
    onResize() {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetWidth * this.baseHeightRatio
    },
    initialize() {
      d3.axisLeft().scale(this.scale.y)
      d3.axisBottom().scale(this.scale.x)
    },
    update() {
      d3.select(this.$el).select(".column-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
          .tickFormat(d => castCall(this.xAxisTickFormat, d))
        ).select(".domain").remove()

      d3.select(this.$el).select(".column-chart__axis--y")
        .call(d3.axisLeft(this.scale.y)
          .tickFormat(d => castCall(this.yAxisTickFormat, d))
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