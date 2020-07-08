<template>
  <div class="bar-chart" :style="{ '--bar-color': barColor, '--bar-highlight-color': barHighlightColor }" :class="{ 'bar-chart--has-highlights': dataHasHighlights }">
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(0, ${margin.top}px)` }" class="bar-chart__labels">
        <text v-for="(label, i) in labels" :key="i" :x="label.x" :y="label.y" text-anchor="end" class="bar-chart__labels__item">
          {{ label.label }}
        </text>
      </g>
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }" class="bar-chart__bars">
        <g class="bar-chart__bars__item"  v-for="(bar, i) in bars" :key="i" :class="{ 'bar-chart__bars__item--highlight': bar.highlight }">
          <rect :width="bar.width" :height="bar.height" :x="bar.x" :y="bar.y"></rect>
          <text class="bar-chart__bars__item__value" :x="bar.width + valueGap" :y="bar.y + bar.height / 2" text-anchor="start" dominant-baseline="middle">
            {{ bar.value }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { some, max } from 'lodash'
import chart from '../mixins/chart'

export default {
  name: 'BarChart',
  mixins: [chart],
  props: {
    /**
     * A data collection for the chart.
     */
    data: {
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
     * Color of each bar (uses the CSS variable --bar-color by default)
     */
    barColor: {
      type: String
    },
    /**
     * Color of each highlighted bar (uses the CSS variable --bar-highlight-color by default)
     */
    barHighlightColor: {
      type: String
    },
    /**
     * Enforce a width for each bar's label
     */
    fixedLabelWidth: {
      type: Number
    },
    /**
     * Distance between a bar and its label
     */
    labelGap: {
      type: Number,
      default: 10
    },
    /**
     * Distande between a bar and its value
     */
    valueGap: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      width: 0,
      height: (this.barHeight + this.barGap) * this.data.length
    }
  },
  computed: {
    labelWidth () {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth
      }
      const selector = '.bar-chart__labels__item'
      const defaultWidth = 100
      return this.elementsMaxBBox({ selector, defaultWidth }).width
    },
    valueWidth () {
      const selector = '.bar-chart__bars__item__value'
      const defaultWidth = 0
      return this.elementsMaxBBox({ selector, defaultWidth }).width + this.valueGap
    },
    margin() {
      const left = this.labelWidth + this.labelGap
      const right = 0
      const top = 0
      const bottom = 0
      return { left, right, top, bottom }
    },
    padded() {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom
      return {width, height}
    },
    scale() {
      const x = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d.value)])
        .range([0, this.padded.width - this.valueWidth])
      return {x}
    },
    bars() {
      return this.data.map((d, i) => {
        return {
          width: Math.abs(this.scale.x(d.value)),
          height: Math.abs(this.barHeight),
          value: d.value,
          highlight: d.highlight,
          x: 0,
          y: (this.barHeight + this.barGap) * i
        }
      })
    },
    labels() {
      return this.data.map((d, i) => {
        return {
          label: d.label,
          x: this.labelWidth,
          y: 4 + (this.barHeight / 2) + (this.barHeight + this.barGap) * i
        }
      })
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
    }
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth
    },
    initialize() {
      d3.axisBottom().scale(this.scale.x)
    }
  }
}
</script>


<style lang="scss">
  @import '../styles/lib';

  .bar-chart {

    text {
      font-family: $font-family-base;
      font-size: $font-size-base;
      fill: currentColor;
    }

    &--has-highlights &__bars__item:not(&__bars__item--highlight):not(:hover) {
      opacity: 0.7;
      filter: grayscale(30%);
    }

    &__bars {

      &__item {

        rect {
          fill: var(--bar-color, var(--dark, $dark));
        }

        &--highlight rect {
          fill: var(--bar-highlight-color, var(--primary, $primary));
        }
      }
    }


  }
</style>
