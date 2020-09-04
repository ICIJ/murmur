<template>
  <div class="stacked-bar-chart d-flex flex-column" :class="{ 'stacked-bar-chart--has-highlights': dataHasHighlights, 'stacked-bar-chart--social-mode': socialMode, 'stacked-bar-chart--label-above': labelAbove, 'stacked-bar-chart--has-highlights': hasHighlights }" :style="{ height }">
    <div class="d-flex align-items-center mb-2">
      <slot name="header-left">
        <ul class="stacked-bar-chart__legend list-inline m-0" v-if="!hideLegend">
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
    <div class="stacked-bar-chart__groups d-flex flex-column flex-grow-1">
      <div class="stacked-bar-chart__groups__item border-bottom flex-fill d-flex" :class="{ 'flex-column': labelAbove }" v-for="(datum, i) in sortedData">
        <div class="stacked-bar-chart__groups__item__label mr-1 small align-self-center" :class="{ 'w-100': labelAbove }">
          {{ datum[labelField] }}
        </div>
        <div class="stacked-bar-chart__groups__item__bars my-1 d-flex flex-fill align-items-center">
          <div v-for="(key, j) in discoveredKeys"
                @mouseover="delayHighlight(key)"
                @mouseleave="restoreHighlights()"
                :style="barStyle(i, key)"
                class="stacked-bar-chart__groups__item__bars__item d-flex flex-row align-items-center"
                :class="{
                  [`stacked-bar-chart__groups__item__bars__item--${key}`]: true,
                  [`stacked-bar-chart__groups__item__bars__item--${j}n`]: true,
                  'stacked-bar-chart__groups__item__bars__item--highlighted': isHighlighted(key),
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
import identity from 'lodash/identity'
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
     * A list of highlighted groups
     */
    highlights: {
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
     * Bar with is relative to each group's total
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
     * Hide the legend.
     */
    hideLegend: {
      type: Boolean
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
    barHeight () {
      const selector = '.stacked-bar-chart__groups__item__bars'
      const defaultHeight = 10
      return this.elementsMinBoundingClientRect({ selector, defaultHeight }).height
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
    height () {
      if (this.fixedHeight !== null) {
        return `${this.fixedHeight}px`
      }
      return  this.socialMode ? `${this.$el.offsetWidth * this.baseHeightRatio}px` : 'auto'
    }
  },
  methods: {
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
      const delay = this.hasHighlights ? 0 : this.highlightDelay
      this.highlightTimeout = setTimeout(() => this.highlight(key), delay)
    },
    isHighlighted (key) {
      return this.highlightedKeys.indexOf(key) > -1
    },
    barStyle (i, key) {
      const value = this.sortedData[i][key]
      const totalWith = this.relative ? this.totalRowValue(i) : this.maxValue
      const width = `${100 * (value / totalWith)}%`
      const backgroundColor = this.colorScale(key)
      const maxHeight = `${this.barHeight}px`
      const minHeight = maxHeight
      return { width, backgroundColor, maxHeight, minHeight }
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
      const rowSelector = '.stacked-bar-chart__groups__item'
      const row = this.$el.querySelectorAll(rowSelector)[i]
      const barSelector = `.stacked-bar-chart__groups__item__bars__item--${key}`
      const bar = row.querySelector(barSelector)
      const valueSelector = '.stacked-bar-chart__groups__item__bars__item__value'
      const value = bar.querySelector(valueSelector)
      return { bar, row, value }
    },
    hasValueOverflow (i, key) {
      const stack = this.stackBarAndValue(i)
      return find(stack, { key })?.overflow
    },
    hasValuePushed (i, key) {
      const stack = this.stackBarAndValue(i)
      return find(stack, { key })?.pushed
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
  @import '../styles/lib';

  .stacked-bar-chart {
    $muted-group-opacity: .2;
    $muted-group-filter: grayscale(30%) brightness(10%);
    $muted-group-transition: opacity .3s, filter .3s;
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

    &__legend {

      &__item {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding-right: $spacer / 2;
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
          margin-right: $spacer / 2;
        }
      }
    }

    &__groups {

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
          min-height: 1.5em;

          &__item {
            text-align: right;
            direction: rtl;
            transition: $muted-group-transition;
            min-width: 1px;
            min-height: 10px;
            height: 100%;

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
              direction: ltr;
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
              position: absolute;
            }
          }
        }
      }
    }
  }
</style>
