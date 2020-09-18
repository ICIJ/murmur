<template>
  <div class="stacked-column-chart">
    <ul class="stacked-column-chart__legend list-inline">
      <li v-for="key in discoveredKeys" :key="key" class="stacked-bar-chart__legend__item list-inline-item d-inline-flex">
        <span class="stacked-bar-chart__legend__item__box" :style="{ 'background-color': colorScale(key) }"></span>
        {{ groupName(key) }}
      </li>
    </ul>
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <g class="stacked-column-chart__axis stacked-column-chart__axis--x" :style="{ transform: `translate(0, ${padded.height}px)` }"></g>
        <g class="stacked-column-chart__axis stacked-column-chart__axis--y" :style="{ transform: `translate(${padded.left}px, 0)` }"></g>
        <g v-for="(group, i) in barGroups"
          :key="i"
          class="stacked-column-chart__group"
          :class="{ 
            [`stacked-column-chart__group--${discoveredKeys[i]}`]: true,
            [`stacked-column-chart__group--${i}n`]: true
          }"
          :title="discoveredKeys[i]">
          <rect v-for="(bar, j) in group"
            :title="bar"
            :key="j"
            :width="scale.x.bandwidth()"
            :height="scale.y(bar[0]) -  scale.y(bar[1])"
            :x="scale.x(bar.data.date)"
            :y="scale.y(bar[1])"
            :fill="colorScale(group.key)"
            class="stacked-column-chart__group__item"></rect>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'
import identity from 'lodash/identity'
import sortBy from 'lodash/sortBy'
import without from 'lodash/without'

import chart from '../mixins/chart'

export default {
  name: 'StackedColumnChart',
  mixins: [chart],
  props: {
    /**
     * Field of each object containing data (for each group)
     */
    keys: {
      type: Array,
      default: () => ([])
    },
    /**
     * Group name to display in the legen
     */
    groups: {
      type: Array,
      default: () => ([])
    },
    /**
     * Height of each bar
     */
    barHeight: {
      type: Number,
      default: 30
    },
    /**
     * Colors of each bar group
     */
    barColors: {
      type: Array,
      default: () => ([])
    },
    /**
     * Enforce a width for each bar's label
     */
    fixedLabelWidth: {
      type: Number
    },
    /**
     * Function to apply to format x axis ticks
     */
    xAxisTickFormat: {
      type: [Function, String],
      default: identity
    },
    /**
     * Function to apply to format y axis ticks (bars value). It can be a
     * function returning the formatted value or a d3's formatter string.
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
     * Field containing the label for each column
     */
     labelField: {
       type: String,
       default: 'date'
     },
     /**
      * Sort groups by one or several keys.
      */
     sortBy: {
       type: [Array, String],
       default: null
     }
  },
  data () {
    return {
      width: 0,
      height: 0,
    }
  },
  computed: {
    sortedData () {
      if (!this.loadedData) {
        return []
      }
      return !this.sortBy ? this.loadedData : sortBy(this.loadedData, this.sortBy)
    },
    labelWidth () {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.stacked-column-chart__axis--y .tick text'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    labelHeight () {
      const selector = '.stacked-column-chart__axis--y .tick text'
      const defaultHeight = 15
      return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    yearsHeight () {
      const selector = '.stacked-column-chart__axis--x .tick text'
      const defaultWidth = 50
      return this.elementsMaxBBox({ selector, defaultWidth }).height
    },
    margin () {
      return {
        left: this.labelWidth + 10,
        right: 0,
        top: this.labelHeight / 2,
        bottom: this.yearsHeight + 10
      }
    },
    padded () {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom

      return { width, height }
    },
    discoveredKeys () {
      if (this.keys.length) {
        return this.keys
      }
      return without(keys(this.sortedData[0] || {}), this.labelField)
    },
    scale () {
      const totals = this.sortedData.map(d => {
        return reduce(this.discoveredKeys, (res, key) => {
          res += d[key]
          return res
        }, 0)
      })

      const x = d3.scaleBand()
        .domain(this.sortedData.map(d => d.date))
        .range([0, this.padded.width])
        .padding(.35)

      const y = d3.scaleLinear()
        .domain([0, d3.max(totals)])
        .range([this.padded.height, 0])

      return { x, y }
    },
    colorScale () {
      return d3.scaleOrdinal()
        .domain(this.discoveredKeys)
        .range(this.barColors)
    },
    barGroups () {
      const stack = d3.stack()
        .keys(this.discoveredKeys)
        .order(d3.stackOrderReverse)
        .offset(d3.stackOffsetNone)

      return stack(this.sortedData)
    },
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
    loadedData () {
      this.setup()
    },
    labelWidth () {
      this.setup()
    },
    labelHeight () {
      this.setup()
    }
  },
  methods: {
    setup () {
      this.setSizes()
      this.initialize()
      this.update()
    },
    setSizes () {
      this.width = this.$el.offsetWidth
      this.height = this.fixedHeight ? this.fixedHeight : this.width * this.baseHeightRatio
    },
    groupName (key) {
      const index = this.discoveredKeys.indexOf(key)
      return this.groups[index] || key
    },
    initialize () {
      d3.axisLeft().scale(this.scale.y)
      d3.axisBottom().scale(this.scale.x)
    },
    update () {
      d3.select(this.$el).select(".stacked-column-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
          .tickFormat(d => this.$options.filters.d3Formatter(d, this.xAxisTickFormat))
        ).select(".domain").remove()

      d3.select(this.$el).select(".stacked-column-chart__axis--y")
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

  .stacked-column-chart {
    $colors: $primary, $info, $warning;
    $quantile: 2;

    @each $start-color in $colors {
      $i: index($colors, $start-color) - 1;
      $end-color: mix($start-color, text-contrast($start-color), 20%);

      @for $j from ($quantile * $i) through ($quantile * $i + $quantile - 1) {
        $amount: ($j % $quantile) * (100% / $quantile);
        --group-color-#{$j}n: #{mix($end-color, $start-color, $amount)};
      }
    }

    text {
      font-family: $font-family-base;
      font-size: $font-size-base;
      fill: currentColor;
    }

    &__legend {

      &__item {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding-right: $spacer / 2;

        @for $i from 0 through ($quantile * length($colors)) {
          &:nth-child(#{$i + 1}n) &__box {
            background-color: var(--group-color-#{$i}n);
          }
        }

        &__box {
          height: 1em;
          width: 1em;
          border-radius: .5em;
          display: inline-block;
          margin-right: $spacer / 2;
        }
      }
    }

    &__group {

      @for $i from 0 through ($quantile * length($colors)) {
        &--#{$i}n &__item:not([fill]) {
          fill: var(--group-color-#{$i}n);
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
  }
</style>
