<template>
  <div class="stacked-bar-chart" :class="{ 'stacked-bar-chart--has-highlights': dataHasHighlights, 'stacked-bar-chart--social-mode': socialMode }">
    <ul class="stacked-bar-chart__legend list-inline">
      <li v-for="key in discoveredKeys" :key="key" class="stacked-bar-chart__legend__item list-inline-item d-inline-flex">
        <span class="stacked-bar-chart__legend__item__box" :style="{ 'background-color': colorScale(key) }"></span>
        {{ groupName(key) }}
      </li>
    </ul>
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(0, ${margin.top}px)` }" class="stacked-bar-chart__labels">
        <text v-for="({ label, x, y }, i) in labels" :key="i" :x="x" :y="y" text-anchor="end" class="stacked-bar-chart__labels__item">
          {{ label }}
        </text>
      </g>
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }" class="stacked-bar-chart__groups">
        <g class="stacked-bar-chart__axis stacked-bar-chart__axis--x"></g>
        <g v-for="(barGroup, i) in barGroups"
            :key="barGroup.key"
            :class="{ 
              [`stacked-bar-chart__groups__item--${barGroup.key}`]: true,
              [`stacked-bar-chart__groups__item--${i}n`]: true
            }"
            class="stacked-bar-chart__groups__item">
          <rect v-for="(bar, j) in barGroup"
                class="stacked-bar-chart__groups__item__bar"
                :key="j"
                :fill="colorScale(barGroup.key)"
                :height="barHeight"
                :width="scale.x(bar[1] - bar[0])"
                :x="scale.x(bar[0])"
                :y="(barHeight / 2) + (barHeight + barGap) * j - 15"></rect>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { identity, isFunction, keys, merge, pick, sum, without, values } from 'lodash'
import * as d3 from 'd3'

import chart from '../mixins/chart'

export default {
  name: 'StackedBarChart',
  mixins: [ chart ],
  props: {
    /**
     * A data collection for the chart
     */
    data: {
      type: Array,
      default: () => ([])
    },
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
     * Distance between each bar
     */
    barGap: {
      type: Number,
      default: 15
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
      type: Function,
      default: identity
    },
    /**
     * Number of x axis ticks
     */
    xAxisTicks: {
      type: Number,
      default: 5
    },
    /**
     * Enforce a height for x axis label
     */
    fixedXAxisLabelHeight: {
      type: Number
    },
    /**
     * Field containing the label for each row
     */
     labelField: {
       type: String,
       default: 'label'
     }
  },
  data() {
    return {
      width: 0,
      height: 0,
    }
  },
  computed: {
    labelWidth () {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.stacked-bar-chart__labels__item'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    xAxisLabelHeight () {
        if (this.fixedXAxisLabelHeight) {
          return this.fixedXAxisLabelHeight
        }
        const selector = '.stacked-bar-chart__axis--x .tick text'
        const defaultHeight = 16
        return this.elementsMaxBBox({ selector, defaultHeight }).height
    },
    margin () {
      return {
        left: this.labelWidth + this.barGap,
        right: 0,
        top: 0,
        bottom: this.xAxisLabelHeight + this.barGap
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
      return without(keys(this.data[0]), this.labelField)
    },
    scale() {
      const totals = this.data.map(d => {
        return sum(values(pick(d, this.discoveredKeys)))
      })
      const x = d3.scaleLinear()
              .domain([0, d3.max(totals)])
              .range([0, this.padded.width])
      return { x }
    },
    colorScale() {
      return d3.scaleOrdinal()
        .domain(this.keys)
        .range(this.barColors)
    },
    labels() {
      return this.data.map((d, i) => {
        return {
          label: d.label,
          x: this.labelWidth,
          y: 4 + (this.barHeight / 2) + (this.barHeight + this.barGap) * i
        }
      });
    },
    barGroups() {
      const stack = d3.stack()
        .keys(this.discoveredKeys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)
      return stack(this.data)
    },
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
      this.setup()
    },
    data () {
      this.setup()
    },
    xAxisLabelHeight () {
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
      this.height = (this.barHeight + this.barGap) * this.data.length + this.xAxisLabelHeight
    },
    initialize() {
      d3.axisBottom().scale(this.scale.x);
    },
    groupName (key) {
      const index = this.discoveredKeys.indexOf(key)
      return this.groups[index] || key
    },
    update() {
      const xAxis = d3.select(this.$el).select(".stacked-bar-chart__axis--x")
        .call(d3.axisBottom(this.scale.x)
          .ticks(this.xAxisTicks)
          .tickFormat(this.xAxisTickFormat))

      xAxis.selectAll(".tick line").attr("y2", this.padded.height)
      xAxis.selectAll(".tick text").attr("transform", "translate(0, " + this.padded.height + ")")
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/lib';

  .stacked-bar-chart {
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

    &__groups {

      &__item {

        @for $i from 0 through ($quantile * length($colors)) {
          &--#{$i}n &__bar:not([fill]) {
            fill: var(--group-color-#{$i}n);
          }
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

      &--y .tick line {
        display: none;
      }
    }
  }
</style>
