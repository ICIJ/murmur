<template>
  <div class="line-chart" :style="{ '--line-color': lineColor }" :class="{ 'line-chart--social-mode': socialMode }">
    <svg :width="width" :height="height">
      <g class="line-chart__axis line-chart__axis--x"></g>
      <g class="line-chart__axis line-chart__axis--y"></g>
      <g :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}">
        <path class="line-chart__line" :d="line" />
      </g>
    </svg>
  </div>
</template>

<script>
import { cloneDeep, isFunction, identity, max } from 'lodash'
import * as d3 from 'd3';

import chart from '../mixins/chart'

// Call the first argument if it's a function, or return it
const castCall = (fnOrValue = identity, ...rest) => isFunction(fnOrValue) ? fnOrValue(...rest) : fnOrValue

export default {
  name: 'LineChart',
  mixins: [chart],
  props: {
    /**
     * A data collection for the chart.
     */
    data: {
      type: Array
    },
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
     * Name of the series (to get the value from in the data collection objects)
     */
    seriesName: {
      type: String,
      default: 'value'
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
      height: 0,
      line: '',
      points: [],
      scale: {
        x: null,
        y: null,
      },
      mounted: false
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
    bucketHeight () {
      const selector = '.line-chart__axis--x .tick text'
      const defaultWidth = 0
      return this.elementsMaxBBox({ selector, defaultWidth }).height
    },
    bucketWidth () {
      const selector = '.line-chart__axis--x .tick text'
      const defaultWidth = 0
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    margin() {
      const left = this.labelWidth + 10
      const right = this.bucketWidth / 2
      const top = 5
      const bottom = this.bucketHeight + 10
      return { left, right, top, bottom }
    },
    padded() {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return { width, height }
    },
    formattedData() {
      let formattedData = cloneDeep(this.data)
      formattedData.forEach(d => {
        d.date = this.parseTime(d.date)
        d[this.seriesName] = +d[this.seriesName]
      })

      return formattedData
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    width () {
      this.initialize()
      this.update()
    },
    mounted () {
      this.initialize()
      this.update()
    }
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetWidth / 2;
    },
    createLine: d3.line().x(d => d.x).y(d => d.y),
    parseTime: d3.timeParse("%Y"),
    initialize() {
      this.scale.x = d3.scaleTime().range([0, this.padded.width]);
      this.scale.y = d3.scaleLinear().range([this.padded.height, 0]);
      d3.axisLeft().scale(this.scale.y);
      d3.axisBottom().scale(this.scale.x);
    },
    update() {
      this.scale.x.domain(d3.extent(this.formattedData, d => d.date));
      this.scale.y.domain([0, d3.max(this.formattedData, d => d[this.seriesName])]);
      this.points = [];
      for (const d of this.formattedData) {
        this.points.push({
          x: this.scale.x(d.date),
          y: this.scale.y(d[this.seriesName]),
        });
      }
      this.line = this.createLine(this.points);
      d3.select(this.$el).select(".line-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
        .tickFormat(d => castCall(this.xAxisYearFormat, d.getFullYear())))
        .attr('transform', 'translate(' + this.margin.left + ', ' + (this.margin.top + this.padded.height) + ')');

      const ticks = this.yAxisTicks,
        tickFormat = this.yAxisTickFormat;

      d3.select(this.$el).select(".line-chart__axis--y")
        .call(d3.axisLeft(this.scale.y)
        .tickFormat(d => tickFormat(d))
        .ticks(ticks))
        .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')
        .selectAll(".tick line").attr("x2", this.padded.width);
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
