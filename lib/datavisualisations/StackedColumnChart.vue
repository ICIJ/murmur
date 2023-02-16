<template>
  <div
    :style="{ height: `${height}px` }"
    class="stacked-column-chart d-flex flex-column"
    :class="{
      'stacked-column-chart--social-mode': socialMode,
      'stacked-column-chart--has-highlights': hasHighlights || hasColumnHighlights,
      'stacked-column-chart--no-direct-labeling': noDirectLabeling,
    }"
  >
    <ul
      v-if="!hideLegend"
      class="stacked-column-chart__legend list-inline"
    >
      <li
        v-for="key in discoveredKeys"
        :key="key"
        class="stacked-column-chart__legend__item list-inline-item d-inline-flex"
        :class="{
          'stacked-column-chart__legend__item--highlighted': isHighlighted(key)
        }"
        @mouseover="delayHighlight(key)"
        @mouseleave="restoreHighlights()"
      >
        <span
          class="stacked-column-chart__legend__item__box"
          :style="{ 'background-color': colorScale(key) }"
        />
        {{ groupName(key) }}
      </li>
    </ul>
    <div class="d-flex flex-grow-1 position-relative overflow-hidden">
      <svg
        v-show="noDirectLabeling"
        :width="width + 'px'"
        :height="height + 'px'"
        class="stacked-column-chart__left-axis"
      >
        <g
          class="stacked-column-chart__left-axis__canvas"
          :transform="`translate(${width}, 0)`"
        />
      </svg>
      <div
        class="stacked-column-chart__groups d-flex flex-grow-1"
        :style="paddedStyle"
      >
        <div
          v-for="(datum, i) in sortedData"
          :key="i"
          class="stacked-column-chart__groups__item flex-grow-1 d-flex flex-column text-center"
        >
          <div class="stacked-column-chart__groups__item__bars flex-grow-1 d-flex flex-column-reverse px-1 justify-content-start align-items-center">
            <div
              v-for="(key, j) in discoveredKeys"
              :key="j"
              v-b-tooltip.html="{ delay: barTooltipDelay, disabled: noTooltips, title: barTitle(i, key) }"
              :style="barStyle(i, key)"
              class="stacked-column-chart__groups__item__bars__item"
              :class="{
                [`stacked-column-chart__groups__item__bars__item--${key}`]: true,
                [`stacked-column-chart__groups__item__bars__item--${j}n`]: true,
                'stacked-column-chart__groups__item__bars__item--hidden': isHidden(i, key),
                'stacked-column-chart__groups__item__bars__item--highlighted': isHighlighted(key) || isColumnHighlighted(i),
                'stacked-column-chart__groups__item__bars__item--value-overflow': hasValueOverflow(i, key),
                'stacked-column-chart__groups__item__bars__item--value-pushed': hasValuePushed(i, key),
                'stacked-column-chart__groups__item__bars__item--value-hidden': hasValueHidden(i, key)
              }"
              @mouseover="delayHighlight(key)"
              @mouseleave="restoreHighlights()"
            >
              <div
                v-show="!noDirectLabeling"
                class="stacked-column-chart__groups__item__bars__item__value"
              >
                {{ datum[key] | d3Formatter(yAxisTickFormat) }}
              </div>
            </div>
          </div>
          <div class="stacked-column-chart__groups__item__label small py-2">
            {{ datum[labelField] | d3Formatter(xAxisTickFormat) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VBTooltip } from 'bootstrap-vue/esm/directives/tooltip/tooltip'
import * as d3 from 'd3';
import keys from 'lodash/keys'
import find from 'lodash/find'
import get from 'lodash/get'
import identity from 'lodash/identity'
import sortBy from 'lodash/sortBy'
import without from 'lodash/without'
import ResizeObserver from 'resize-observer-polyfill'

import chart from '../mixins/chart'

export default {
  name: 'StackedColumnChart',
  directives: {
    'b-tooltip': VBTooltip
  },
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
     * Group name to display in the legend
     */
    groups: {
      type: Array,
      default: () => ([])
    },
    /**
     * Colors of each bar group
     */
    barColors: {
      type: Array,
      default: () => ([])
    },
    /**
     * Max with of each bar.
     */
    barMaxWidth: {
      type: String,
      default: '100%'
    },
    /**
     * Hide bars that have no values.
     */
    hideEmptyValues: {
      type: Boolean
    },
    /**
     * Hide the legend.
     */
    hideLegend: {
      type: Boolean
    },
    /**
     * Enforce the height of the chart (regardless of the width or number of row)
     */
    fixedHeight: {
      type: Number,
      default: null
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
     * Padding on y axis ticks
     */
    yAxisTickPadding: {
      type: Number,
      default: 10
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
     },
     /**
      * Column height is relative to each group's total
      */
     relative: {
       type: Boolean,
       default: false
     },
     /**
      * A list of highlighted groups
      */
     highlights: {
       type: Array,
       default: () => ([])
     },
     /**
      * Delay to apply when set the first highlight
      */
     highlightDelay: {
       type: Number,
       default: 400
     },
     /**
      * A list of entire column to highlight
      */
     columnHighlights: {
       type: Array,
       default: () => ([])
     },
     /**
      * Delay to apply when restoring hightlights to initial state
      */
     restoreHighlightDelay: {
       type: Number,
       default: 50
     },
     /**
      * Deactivate direct labeling on bars
      */
     noDirectLabeling: {
       type: Boolean
     },
     /**
      * Set max value instead of extracting it from the data.
      */
     maxValue: {
       type: Number,
       default: null
     },
     /**
      * Function to define tooltip content.
      */
     tooltipDisplay: {
       type: Function,
       default: ({ formattedKey, formattedValue }) => {
         return `<h6 class="mb-0">${formattedKey}</h6><div>${formattedValue}</div>`
       }
     },
     /**
      * Hide bar tooltips
      */
     noTooltips: {
       type: Boolean
     }
  },
  data () {
    return {
      width: 0,
      height: 0,
      leftAxisHeight: 0,
      highlightedKeys: this.highlights,
      highlightTimeout: null
    }
  },
  resizeObserver: null,
  computed: {
    sortedData () {
      if (!this.loadedData) {
        return []
      }
      return !this.sortBy ? this.loadedData : sortBy(this.loadedData, this.sortBy)
    },
    discoveredKeys () {
      if (this.keys.length) {
        return this.keys
      }
      return without(keys(this.sortedData[0] || {}), this.labelField)
    },
    colorScale () {
      return d3.scaleOrdinal().domain(this.discoveredKeys).range(this.barColors)
    },
    maxRowValue () {
      return this.maxValue || d3.max(this.loadedData || [], (datum, i) => {
        return this.totalRowValue(i)
      })
    },
    hasHighlights () {
      return !!this.highlightedKeys.length
    },
    hasColumnHighlights () {
      return !!this.columnHighlights.length
    },
    leftScale () {
      return d3.scaleLinear().domain([0, this.maxRowValue]).range([this.leftAxisHeight, 0])
    },
    leftAxis: {
      cache: false,
      get () {
        return d3.axisLeft(this.leftScale)
          .tickFormat(d => this.$options.filters.d3Formatter(d, this.yAxisTickFormat))
          .tickSize(this.width - this.leftAxisLabelsWidth)
          .tickPadding(this.yAxisTickPadding)
      }
    },
    leftAxisLabelsWidth: {
      cache: false,
      get () {
        const selector = '.stacked-column-chart__left-axis__canvas .tick text'
        const defaultWidth = 0
        return this.elementsMaxBBox({ selector, defaultWidth }).width + this.yAxisTickPadding
      }
    },
    leftAxisCanvas () {
      return d3.select(this.$el).select(".stacked-column-chart__left-axis__canvas")
    },
    paddedStyle () {
      return {
        marginLeft: this.noDirectLabeling ? `${this.leftAxisLabelsWidth + this.yAxisTickPadding}px` : 0
      }
    },
    barTooltipDelay () {
      return this.hasHighlights ? 0 : this.highlightDelay
    }
  },
  watch: {
    socialMode () {
      this.setup()
    },
    loadedData () {
      this.setup()
    },
    leftAxisLabelsWidth () {
      this.setup()
    },
    leftAxisHeight () {
      this.setup()
    },
    fixedHeight () {
      this.setup()
    },
    highlights () {
      this.highlightedKeys = this.highlights
    }
  },
  mounted () {
    this.$options.resizeObserver = new ResizeObserver(this.setup)
    this.$nextTick(() => this.$options.resizeObserver.observe(this.$el))
  },
  beforeDestroy () {
      this.$options.resizeObserver?.unobserve(this.$el)
      this.$options.resizeObserver = null
  },
  methods: {
    setSizes () {
      this.width = this.$el.offsetWidth
      this.height = this.fixedHeight !== null ? this.fixedHeight : this.width * this.baseHeightRatio
    },
    async setup () {
      this.setSizes()
      await this.$nextTick()
      // This must be set after the column have been rendered
      this.leftAxisHeight = this.$el.querySelector('.stacked-column-chart__groups__item__bars').offsetHeight
      this.leftAxisCanvas.call(this.leftAxis)
    },
    groupName (key) {
      const index = this.discoveredKeys.indexOf(key)
      return this.groups[index] || key
    },
    highlight (key) {
      this.highlightedKeys = [key]
    },
    restoreHighlights () {
      clearTimeout(this.highlightTimeout)
      const delay = this.restoreHighlightDelay
      // Delay the restoration so it can be cancelled by a new highlight
      this.highlightTimeout = setTimeout(() => this.highlightedKeys = this.highlights, delay)
    },
    delayHighlight (key) {
      clearTimeout(this.highlightTimeout)
      // Reduce the delay to zero if there is already an highlighted key
      const isDelayed = !this.hasHighlights
      const delay = isDelayed ? this.highlightDelay : 0
      this.highlightTimeout = setTimeout(() => this.highlight(key), delay)
    },
    isHighlighted (key) {
      return this.highlightedKeys.indexOf(key) > -1
    },
    isColumnHighlighted (i) {
      const column = get(this.sortedData, [i, this.labelField], null)
      return this.columnHighlights.includes(column) && !this.highlightedKeys.length
    },
    totalRowValue (i) {
      return d3.sum(this.discoveredKeys, key => {
        return this.sortedData[i][key]
      })
    },
    barStyle (i, key) {
      const value = this.sortedData[i][key]
      const totalWith = this.relative ? this.totalRowValue(i) : this.maxRowValue
      const height = `${100 * (value / totalWith)}%`
      const backgroundColor = this.colorScale(key)
      const maxWidth = this.barMaxWidth
      return { maxWidth, height, backgroundColor }
    },
    barTitle (i, key) {
      const value = this.sortedData[i][key]
      const formattedValue = this.$options.filters.d3Formatter(value, this.yAxisTickFormat)
      const formattedKey = this.groupName(key)
      return this.tooltipDisplay({ value, formattedValue, key, formattedKey })
    },
    stackBarAndValue (i) {
      if (!this.mounted) {
        return []
      }
      // Collect sizes first
      const stack = this.discoveredKeys.map(key => {
        const { bar, row, value } = this.queryBarAndValue(i, key)
        const barEdge = bar.getBoundingClientRect().top + bar.offsetHeight
        const barHeight = bar.offsetHeight
        const rowEdge = row.getBoundingClientRect().top + row.offsetHeight
        const valueHeight = value.offsetHeight
        return { key, barEdge, barHeight, rowEdge, valueHeight }
      })
      // Infer value's display
      return stack.map((desc, index) => {
        desc.overflow = desc.valueHeight >= desc.barHeight
        if (index > 0) {
          const prevDesc = stack[index - 1]
          const bothValuesHeight = desc.valueHeight + prevDesc.valueHeight
          desc.overflow = desc.overflow || prevDesc.overflow && desc.barHeight < bothValuesHeight
        }
        desc.pushed = desc.barEdge + desc.valueHeight > desc.rowEdge && desc.overflow
        return desc
      })
    },
    queryBarAndValue (i, key) {
      if (!this.mounted) {
        return { }
      }
      const rowSelector = '.stacked-column-chart__groups__item'
      const row = this.$el.querySelectorAll(rowSelector)[i]
      const barSelector = `.stacked-column-chart__groups__item__bars__item--${key}`
      const bar = row.querySelector(barSelector)
      const valueSelector = '.stacked-column-chart__groups__item__bars__item__value'
      const value = bar.querySelector(valueSelector)
      return { bar, row, value }
    },
    isHidden (i, key) {
      return this.hideEmptyValues && !this.sortedData[i][key]
    },
    hasValueOverflow (i, key) {
      const stack = this.stackBarAndValue(i)
      return find(stack, { key })?.overflow
    },
    hasValuePushed (i, key) {
      const stack = this.stackBarAndValue(i)
      return find(stack, { key })?.pushed
    },
    hasValueHidden (i, key) {
      const keyIndex = this.discoveredKeys.indexOf(key)
      const nextKey = this.discoveredKeys[keyIndex + 1]
      if (!nextKey) {
        return false
      }
      return this.hasValueOverflow(i, key) && this.hasValueOverflow(i, nextKey)
    }
  }
}
</script>

<style lang="scss">
  @use "sass:math";
  @import '../styles/lib';

  .stacked-column-chart {
    $muted-group-opacity: .2;
    $muted-group-filter: grayscale(30%) brightness(10%);
    $muted-group-transition: opacity .3s, filter .3s;
    $colors: $primary, $info, $warning;
    $quantile: 3;

    @each $start-color in $colors {
      $i: index($colors, $start-color) - 1;
      $end-color: mix($start-color, text-contrast($start-color), 20%);

      @for $j from ($quantile * $i) through ($quantile * $i + $quantile - 1) {
        $amount: ($j % $quantile) * math.div(100%, $quantile);
        --group-color-#{$j}n: #{mix($end-color, $start-color, $amount)};
      }
    }

    &__legend {

      &__item {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding-right: $spacer * 0.5;

        @for $i from 0 through ($quantile * length($colors)) {
          &:nth-child(#{$i + 1}n) &__box {
            background-color: var(--group-color-#{$i}n);
          }
        }

        .stacked-column-chart--has-highlights &:not(&--highlighted) {
          opacity: $muted-group-opacity;
          filter: $muted-group-filter;
        }

        &__box {
          height: 1em;
          width: 1em;
          border-radius: .5em;
          display: inline-block;
          margin-right: $spacer * 0.5;
        }
      }
    }

    &__left-axis {
      position: absolute;
      top: 0;
      left: 0;

      path {
        display: none;
      }

      .tick {

        line {
          stroke: $border-color;
        }

        text {
          font-family: $font-family-base;
          font-size: $font-size-sm;
          fill: currentColor;
        }
      }
    }

    &__groups {

      &__item {

        &__bars {

          &__item {
            width: 100%;
            position: relative;
            min-height: 1px;

            @for $i from 0 through ($quantile * length($colors)) {
              &--#{$i}n {
                background: var(--group-color-#{$i}n);
              }
            }

            &__value {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              text-align: center;
              white-space: nowrap;
              color: #fff;
            }

            .stacked-column-chart--has-highlights &:not(&--highlighted) {
              opacity: $muted-group-opacity;
              filter: $muted-group-filter;
            }

            .stacked-column-chart--has-highlights &:not(&--highlighted) &__value {
              visibility: hidden;
            }

            .stacked-column-chart:not(.stacked-column-chart--has-highlights) &--value-hidden &__value,
            .stacked-column-chart:not(.stacked-column-chart--has-highlights) &--value-pushed &__value {
              visibility: hidden;
            }

            &--hidden {
              display: none;
            }

            &--value-overflow &__value {
              color: $body-color;
              transform: translateY(-100%);
            }

            &--value-pushed {
              direction: ltr;
            }

            &--value-pushed &__value {
              color: $body-color;
              transform: translateY(100%);
            }

          }
        }
      }
    }
  }
</style>
