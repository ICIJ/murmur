<template>
  <div class="bar-chart">
    <svg :width="width" :height="height">
      <g :style="{ transform: `translate(0, ${margin.top}px)` }" class="bar-chart__labels">
        <text v-for="(label, i) in labels" :key="i" :x="label.x" :y="label.y" text-anchor="end" class="bar-chart__labels__item">
          {{ label.label }}
        </text>
      </g>
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }" class="bar-chart__bars">
        <g class="bar-chart__bars__item"  v-for="(bar, i) in bars" :key="i">
          <rect :fill="barColor ? barColor : '#cccccc'" :width="bar.width" :height="bar.height" :x="bar.x" :y="bar.y"></rect>
          <text class="bar-chart__bars__item__value text-muted" :x="bar.width + valueGap" :y="bar.y + bar.height / 2" text-anchor="start" dominant-baseline="middle">
            {{ bar.value }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { max, uniqueId } from 'lodash';
import chart from '../mixins/chart'

export default {
  name: 'BarChart',
  mixins: [chart],
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    options: {
      type: Object,
      default: () => ({})
    },
    barHeight: {
      type: Number,
      default: 30
    },
    barGap: {
      type: Number,
      default: 15
    },
    barColor: {
      type: String,
      default: '#000'
    },
    fixedLabelWidth: {
      type: Number
    },
    name: {
      type: String,
      default: uniqueId('bar-chart--')
    },
    labelGap: {
      type: Number,
      default: 10
    },
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
      if (!this.mounted || this.fixedLabelWidth) {
        return this.fixedLabelWidth || 100
      }
      const labels = this.$el.querySelectorAll('.bar-chart__labels__item')
      const widths = [...labels].map(l => l.getComputedTextLength())
      return this.fixedLabelWidth || max(widths)
    },
    valueWidth () {
      if (!this.mounted) {
        return 0
      }
      const values = this.$el.querySelectorAll('.bar-chart__bars__item__value')
      const widths = [...values].map(l => l.getComputedTextLength())
      return max(widths) + this.valueGap
    },
    margin() {
      const left = this.labelWidth + this.labelGap;
      const right = 0;
      const top = 0;
      const bottom = 0;
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
        .range([0, this.padded.width - this.valueWidth]);
      return {x};
    },
    bars() {
      return this.data.map((d, i) => {
        return {
          width: Math.abs(this.scale.x(d.value)),
          height: Math.abs(this.barHeight),
          value: d.value,
          x: 0,
          y: (this.barHeight + this.barGap) * i
        }
      });
    },
    labels() {
      return this.data.map((d, i) => {
        return {
          label: d.label,
          x: this.labelWidth,
          y: 4 + (this.barHeight / 2) + (this.barHeight + this.barGap) * i
        }
      });
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    width: function widthChanged() {
      this.initialize();
      this.update();
    }
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth;
    },
    initialize() {
      d3.axisBottom().scale(this.scale.x);
    },
    update() {
      xAxis.selectAll(".tick line").attr("y2", this.padded.height);
      xAxis.selectAll(".tick text").attr("transform", "translate(0, " + this.padded.height + ")")
    }
  }
}
</script>
