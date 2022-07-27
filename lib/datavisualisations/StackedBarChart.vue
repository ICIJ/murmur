<template>
  <div class="stacked-bar-chart d-flex flex-column"
      :class="{
        'stacked-bar-chart--has-highlights': dataHasHighlights,
        'stacked-bar-chart--social-mode': socialMode,
        'stacked-bar-chart--label-above': labelAbove,
        'stacked-bar-chart--has-highlights': hasHighlights || hasRowHighlights,
        'stacked-bar-chart--has-constraint-height': hasConstraintHeight,
        'stacked-bar-chart--has-label-above': labelAbove,
      }" :style="{ height }">
    <div class="d-flex align-items-center">
      <slot name="header-left">
        <ul class="stacked-bar-chart__legend list-inline mx-0 mt-0 mb-2" v-if="!hideLegend">
          <li v-for="key in discoveredKeys"
            :key="key"
            class="stacked-bar-chart__legend__item list-inline-item d-inline-flex"
            :class="{
              'stacked-bar-chart__legend__item--highlighted': isHighlighted(key)
            }"
            @mouseover="delayHighlight(key)"
            @mouseleave="restoreHighlights()">
            <span class="stacked-bar-chart__legend__item__box" :style="{ 'background-color': colorScale(key) }"></span>
            {{ groupName(key) }}
          </li>
        </ul>
      </slot>
      <slot name="header-right" />
    </div>
    <div class="stacked-bar-chart__groups ">
      <div :class="{ 'flex-column': labelAbove }" 
           :key="i"
           class="stacked-bar-chart__groups__item border-bottom flex-fill d-flex align-items-center" 
           v-for="(datum, i) in sortedData">
        <div class="stacked-bar-chart__groups__item__label mr-1 small" :class="{ 'w-100': labelAbove }">
          {{ datum[labelField] }}
        </div>
        <div class="stacked-bar-chart__groups__item__bars my-1 d-flex flex-grow-1 align-items-center">
          <div v-for="(key, j) in discoveredKeys"
                @mouseover="delayHighlight(key)"
                @mouseleave="restoreHighlights()"
                :key="j"
                :style="barStyle(i, key)"
                class="stacked-bar-chart__groups__item__bars__item"
                :class="{
                  [`stacked-bar-chart__groups__item__bars__item--${normalizeKey(key)}`]: true,
                  [`stacked-bar-chart__groups__item__bars__item--${j}n`]: true,
                  'stacked-bar-chart__groups__item__bars__item--highlighted': isHighlighted(key) || isRowHighlighted(i),
                  'stacked-bar-chart__groups__item__bars__item--hidden': isHidden(i, key),
                  'stacked-bar-chart__groups__item__bars__item--value-overflow': hasValueOverflow(i, key),
                  'stacked-bar-chart__groups__item__bars__item--value-pushed': hasValuePushed(i, key),
                  'stacked-bar-chart__groups__item__bars__item--value-hidden': hasValueHidden(i, key)
                }">
            <div class="stacked-bar-chart__groups__item__bars__item__value p-1">
              {{ datum[key] | d3Formatter(xAxisTickFormat) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import find from 'lodash/find'
import get from 'lodash/get'
import identity from 'lodash/identity'
import kebabCase from 'lodash/kebabCase'
import keys from 'lodash/keys'
import without from 'lodash/without'
import sortBy from 'lodash/sortBy'

import chart from '../mixins/chart'

export default {
  name: 'StackedBarChart',
  mixins: [ chart ],
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
     * Enforce the height of the chart (regardless of the width or number of row)
     */
    fixedHeight: {
      type: Number,
      default: null
    },
    /**
     * Function to apply to format x axis ticks (bar value). It can be a
     * function returning the formatted value or a d3's formatter string.
     */
    xAxisTickFormat: {
      type: [Function, String],
      default: identity
    },
    /**
     * Field containing the label for each row
     */
    labelField: {
      type: String,
      default: 'label'
    },
    /**
     * Switch labels above bars
     */
    labelAbove: {
      type: Boolean,
      default: false
    },
    /**
     * Bar width is relative to each group's total
     */
    relative: {
      type: Boolean,
      default: false
    },
    /**
     * Sort groups by one or several keys.
     */
    sortBy: {
      type: [Array, String],
      default: null
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
     * Delay to apply when restoring hightlights to initial state
     */
    restoreHighlightDelay: {
      type: Number,
      default: 50
    },
    /**
     * A list of entire row to highlight
     */
    rowHighlights: {
      type: Array,
      default: () => ([])
    },
    /**
     * Set a minimal height for the bars
     */
    minBarHeight: {
      type: Number,
      default: 16
    },
    /**
     * Set a maximal height for the bars
     */
    maxBarHeight: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      highlightedKeys: this.highlights,
      highlightTimeout: null
    }
  },
  watch:{
    relative () {
      this.$nextTick(this.$forceUpdate)
    },
    height () {
      this.$nextTick(this.$forceUpdate)
    },
    sortBy () {
      this.$nextTick(this.$forceUpdate)
    },
    highlights () {
      this.highlightedKeys = this.highlights
    }
  },
  computed: {
    hasConstraintHeight () {
      return this.fixedHeight !== null || this.socialMode
    },
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
      if (!this.loadedData) {
        return []
      }
      return without(keys(this.loadedData[0]), this.labelField)
    },
    colorScale () {
      return d3.scaleOrdinal().domain(this.discoveredKeys).range(this.barColors)
    },
    maxValue () {
      return d3.max(this.loadedData || [], (datum, i) => {
        return this.totalRowValue(i)
      })
    },
    hasHighlights () {
      return !!this.highlightedKeys.length
    },
    hasRowHighlights () {
      return !!this.rowHighlights.length
    },
    height () {
      if (this.fixedHeight !== null) {
        return `${this.fixedHeight}px`
      }
      return this.socialMode && this.mounted ? `${this.$el.offsetWidth * this.baseHeightRatio}px` : 'auto'
    }
  },
  methods: {
    normalizeKey (key) {
      return kebabCase(key)
    },
    totalRowValue (i) {
      return d3.sum(this.discoveredKeys, key => {
        return this.sortedData[i][key]
      })
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
    isRowHighlighted (i) {
      const row = get(this.sortedData, [i, this.labelField], null)
      return this.rowHighlights.includes(row) && !this.highlightedKeys.length
    },
    barStyle (i, key) {
      const value = this.sortedData[i][key]
      const totalWith = this.relative ? this.totalRowValue(i) : this.maxValue
      const width = `${100 * (value / totalWith)}%`
      const backgroundColor = this.colorScale(key)
      return { width, backgroundColor }
    },
    barHeightBounds (height) {
      return Math.min(Math.max(height, this.minBarHeight), this.maxBarHeight)
    },
    stackBarAndValue (i) {
      if (!this.mounted) {
        return []
      }
      // Collect sizes first
      const stack = this.discoveredKeys.map(key => {
        const { bar, row, value } = this.queryBarAndValue(i, key)
        const barEdge = bar.getBoundingClientRect().left + bar.offsetWidth
        const barWidth = bar.offsetWidth
        const rowEdge = row.getBoundingClientRect().left + row.offsetWidth
        const valueWidth = value.offsetWidth
        return { key, barEdge, barWidth, rowEdge, valueWidth }
      })
      // Infer value's display
      return stack.map((desc, index) => {
        desc.overflow = desc.valueWidth >= desc.barWidth
        if (index > 0) {
          const prevDesc = stack[index - 1]
          const bothValuesWidth = desc.valueWidth + prevDesc.valueWidth
          desc.overflow = desc.overflow || prevDesc.overflow && desc.barWidth < bothValuesWidth
        }
        desc.pushed = desc.barEdge + desc.valueWidth > desc.rowEdge && desc.overflow
        return desc
      })
    },
    queryBarAndValue (i, key) {
      if (!this.mounted) {
        return { }
      }
      const barClass = 'stacked-bar-chart__groups__item__bars__item'
      const rowSelector = '.stacked-bar-chart__groups__item'
      const row = this.$el.querySelectorAll(rowSelector)[i]
      const normalizedKey = this.normalizeKey(key)
      const barSelector = `.${barClass}--${normalizedKey}`
      const bar = row.querySelector(barSelector)
      const valueSelector = `.${barClass}__value`
      const value = bar.querySelector(valueSelector)
      return { bar, row, value }
    },
    hasValueOverflow (i, key) {
      const stack = this.stackBarAndValue(i)
      return get(find(stack, { key }), 'overflow')
    },
    hasValuePushed (i, key) {
      const stack = this.stackBarAndValue(i)
      return get(find(stack, { key }), 'pushed')
    },
    hasValueHidden (i, key) {
      const keyIndex = this.discoveredKeys.indexOf(key)
      const nextKey = this.discoveredKeys[keyIndex + 1]
      if (!nextKey) {
        return false
      }
      return this.hasValueOverflow(i, key) && this.hasValueOverflow(i, nextKey)
    },
    isHidden (i, key) {
      return this.hideEmptyValues && !this.sortedData[i][key]
    }
  }
}
</script>

<style lang="scss">
  @use "sass:math";
  @import '../styles/lib';

  .stacked-bar-chart {
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
        transition: $muted-group-transition;

        @for $i from 0 through ($quantile * length($colors)) {
          &:nth-child(#{$i + 1}n) &__box {
            background-color: var(--group-color-#{$i}n);
          }
        }

        .stacked-bar-chart--has-highlights &:not(&--highlighted) {
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

    &__groups {

      .stacked-bar-chart--has-constraint-height & {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      &__item {

        &__label {
          width: 20%;
          padding: $spacer * .5 0;

          .stacked-bar-chart--label-above & {
            width: 100%;
            padding-bottom: 0;
          }

          &:empty {
            display: none;
          }
        }

        &__bars {
          min-height: 100%;
          width: 100%;

          .stacked-bar-chart--has-constraint-height & {
            height: calc(100% - 1.5rem);
            min-height: calc(100% - 1.5rem);
          }

          .stacked-bar-chart--has-constraint-height.stacked-bar-chart--label-above & {
            height: auto;
            min-height: auto;
          }

          &__item {
            text-align: right;
            transition: $muted-group-transition;
            min-width: 1px;
            min-height: 10px;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            .stacked-bar-chart--has-constraint-height & {
              height: auto;
              align-self: stretch;
            }

            &--hidden {
              display: none !important;
            }

            @for $i from 0 through ($quantile * length($colors)) {
              &--#{$i}n {
                background: var(--group-color-#{$i}n);
              }
            }

            .stacked-bar-chart--has-highlights &:not(&--highlighted) {
              opacity: $muted-group-opacity;
              filter: $muted-group-filter;
            }

            .stacked-bar-chart--has-highlights &:not(&--highlighted) &__value {
              visibility: hidden;
            }

            .stacked-bar-chart:not(.stacked-bar-chart--has-highlights) &--value-hidden &__value,
            .stacked-bar-chart:not(.stacked-bar-chart--has-highlights) &--value-pushed &__value {
              visibility: hidden;
            }

            &--value-overflow &__value {
              color: $body-color;
              transform: translateX(100%);
            }

            &--value-pushed {
              justify-content: flex-start;
            }

            &--value-pushed &__value {
              color: $body-color;
              transform: translateX(-100%);
            }

            &__value {
              white-space: nowrap;
              color: white;
              pointer-events: none;
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
