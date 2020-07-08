<template>
  <div class="column-chart">
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <g class="column-chart__axis column-chart__axis--x" :style="{ transform: `translate(0, ${padded.height}px)` }"></g>
        <g class="column-chart__axis column-chart__axis--y" :style="{ transform: `translate(${padded.left}px, 0)` }"></g>
        <rect v-for="(bar, i) in bars" :key="i" :fill="barColor" :width="bar.width" :height="bar.height" :x="bar.x" :y="bar.y"></rect>
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
    data: {
      type: Array
    },
    barColor: {
      type: String,
      default: '#000'
    },
    fixedLabelWidth: {
      type: Number
    },
    seriesName: {
      type: String,
      default: 'value'
    },
    xAxisTickFormat: {
      type: Function,
      default: identity
    },
    yAxisTickFormat: {
      type: Function,
      default: identity
    },
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
      if (!this.mounted || this.fixedLabelWidth) {
        return this.fixedLabelWidth || 100
      }
      const labels = this.$el.querySelectorAll('.column-chart__axis--y .tick text')
      const widths = [...labels].map(l => l.getBBox().width)
      return this.fixedLabelWidth || max(widths)
    },
    bucketHeight () {
      if (!this.mounted) {
        return 0
      }
      const buckets = this.$el.querySelectorAll('.column-chart__axis--x .tick text')
      const heights = [...buckets].map(l => l.getBBox().height)
      return max(heights)
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
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetWidth * this.baseHeightRatio;
    },
    initialize() {
      d3.axisLeft().scale(this.scale.y);
      d3.axisBottom().scale(this.scale.x);
    },
    update() {
      d3.select(this.$el).select(".column-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
          .tickFormat(d => castCall(this.xAxisTickFormat, d))
        ).select(".domain").remove();

      d3.select(this.$el).select(".column-chart__axis--y")
        .call(d3.axisLeft(this.scale.y)
          .tickFormat(d => castCall(this.yAxisTickFormat, d))
          .ticks(this.yAxisTicks)
        ).selectAll(".tick line").attr("x2", this.padded.width);
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/lib';

  .column-chart {

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

  }
</style>
