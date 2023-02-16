<template>
  <div
    class="bar-chart"
    :style="{
      '--bar-color': barColor,
      '--bar-highlight-color': barHighlightColor,
    }"
    :class="{
      'bar-chart--has-highlights': dataHasHighlights,
      'bar-chart--social-mode': socialMode,
    }"
  >
    <svg
      :width="width"
      :height="height"
    >
      <g
        :style="{ transform: `translate(0, ${margin.top}px)` }"
        class="bar-chart__labels"
      >
        <text
          v-for="(label, i) in labels"
          :key="i"
          :x="label.x"
          :y="label.y"
          text-anchor="end"
          class="bar-chart__labels__item"
        >
          {{ label.label }}
        </text>
      </g>
      <g
        :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
        class="bar-chart__bars"
      >
        <g
          v-for="(bar, i) in bars"
          :key="i"
          class="bar-chart__bars__item"
          :class="{ 'bar-chart__bars__item--highlight': bar.highlight }"
        >
          <rect
            :width="bar.width"
            :height="bar.height"
            :x="bar.x"
            :y="bar.y"
          />
          <text
            class="bar-chart__bars__item__value"
            :x="bar.width + valueGap"
            :y="bar.y + bar.height / 2"
            text-anchor="start"
            dominant-baseline="middle"
          >
            {{ bar.value | d3Formatter(xAxisTickFormat) }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import identity from "lodash/identity";
import sortBy from "lodash/sortBy";

import chart from "../mixins/chart";

export default {
  name: "BarChart",
  mixins: [chart],
  props: {
    /**
     * Height of each bar
     */
    barHeight: {
      type: Number,
      default: 30,
    },
    /**
     * Distance between each bar
     */
    barGap: {
      type: Number,
      default: 15,
    },
    /**
     * Color of each bar (uses the CSS variable --bar-color by default)
     */
    barColor: {
      type: String,
      default: null
    },
    /**
     * Color of each highlighted bar (uses the CSS variable --bar-highlight-color by default)
     */
    barHighlightColor: {
      type: String,
      default: null
    },
    /**
     * Enforce a width for each bar's label
     */
    fixedLabelWidth: {
      type: Number,
      default: null
    },
    /**
     * Enforce a width for each bar's value
     */
    fixedValueWidth: {
      type: Number,
      default: null
    },
    /**
     * Distance between a bar and its label
     */
    labelGap: {
      type: Number,
      default: 10,
    },
    /**
     * Distande between a bar and its value
     */
    valueGap: {
      type: Number,
      default: 5,
    },
    /**
     * Sort bars by one or several keys.
     */
    sortBy: {
      type: [Array, String],
      default: null,
    },
    /**
     * Function to apply to format x axis ticks (bar value). It can be a
     * function returning the formatted value or a d3's formatter string.
     */
    xAxisTickFormat: {
      type: [Function, String],
      default: identity,
    },
  },
  data() {
    return {
      width: 0,
    };
  },
  computed: {
    sortedData() {
      if (!this.loadedData) {
        return [];
      }
      return !this.sortBy
        ? this.loadedData
        : sortBy(this.sortedData, this.sortBy);
    },
    labelWidth() {
      if (this.fixedLabelWidth) {
        return this.fixedLabelWidth;
      }
      const selector = ".bar-chart__labels__item";
      const defaultWidth = 100;
      return this.elementsMaxBBox({ selector, defaultWidth }).width;
    },
    valueWidth() {
      if (this.fixedValueWidth) {
        return this.fixedValueWidth;
      }
      const selector = ".bar-chart__bars__item__value";
      const defaultWidth = 0;
      return (
        this.elementsMaxBBox({ selector, defaultWidth }).width + this.valueGap
      );
    },
    margin() {
      const left = this.labelWidth + this.labelGap;
      const right = 0;
      const top = 0;
      const bottom = 0;
      return { left, right, top, bottom };
    },
    padded() {
      const width = this.width - this.margin.left - this.margin.right;
      const height = this.height - this.margin.top - this.margin.bottom;
      return { width, height };
    },
    scale() {
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(this.sortedData, (d) => d.value)])
        .range([0, this.padded.width - this.valueWidth]);
      return { x };
    },
    bars() {
      return this.sortedData.map((d, i) => {
        return {
          width: Math.abs(this.scale.x(d.value)),
          height: Math.abs(this.barHeight),
          value: d.value,
          highlight: d.highlight,
          x: 0,
          y: (this.barHeight + this.barGap) * i,
        };
      });
    },
    labels() {
      return this.sortedData.map((d, i) => {
        return {
          label: d.label,
          x: this.labelWidth,
          y: 4 + this.barHeight / 2 + (this.barHeight + this.barGap) * i,
        };
      });
    },
    height() {
      return (this.barHeight + this.barGap) * this.sortedData.length;
    },
  },
  watch: {
    width() {
      this.initialize();
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth;
    },
    initialize() {
      d3.axisBottom().scale(this.scale.x);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/lib";

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
