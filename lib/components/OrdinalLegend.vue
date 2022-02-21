<script>
import { isFunction, kebabCase, uniqueId } from 'lodash'
import * as d3 from 'd3'

export default {
  name: 'OrdinalLegend',
  props: {
    data:{
      type:Array,
      default:()=>([])
    },
    horizontal:{
      type: Boolean
    },
    markerPath:{
      type: [String, Function],
      default: 'M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z'
    },
    categoriesIdentifier: {
      type: [String, Array],
      default: 'id'
    },
    highlight: {
      type: [String, Number],
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  computed:{
    markerBoundingClientRect () {
      const svg = d3.select("body").append("svg").attr('width', 2046).attr('height', 2046)
      const marker = svg.append('path').attr('d', this.markerPathFunction)
      const rect = marker.node().getBoundingClientRect()
      svg.remove()
      return rect
    },
    markerViewbox () {
      const { width, height } = this.markerBoundingClientRect
      return `0 0 ${width} ${height}`
    },
    classList(){
      return {
        'ordinal-legend--horizontal': this.horizontal, 
        'ordinal-legend--has-highlight': this.highlight !== null,
        'ordinal-legend--has-value': this.value !== null
      }
    },
    dataWithIds () {
      return this.data.map(d => {
        const id = uniqueId()
        return { [this.categoriesIdentifier]: id, ...d }
      })
    }
  },
  methods:{
    itemClassList (d) {
      const id = d[this.categoriesIdentifier]
      return {
        [`ordinal-legend__item--identifier-${kebabCase(d.label)}`]: true,
        'ordinal-legend__item--highlighted': id === this.highlight,
        'ordinal-legend__item--selected': id === this.value
      }
    },
    markerPathFunction (d) {
      return isFunction(this.markerPath) ? this.markerPath(d) : this.markerPath
    },
    update (d) {
      /**
       * Fired when user clicks on an item
       * @event update 
       * @param Mixed Value of the category identifier
       */
      this.$emit('update', d[this.categoriesIdentifier])
    },
    updateHighlight (d = {}) {
      /** 
       * Fired when user hover an item
       * @event update:highlight 
       * @param Mixed Value of the category identifier
       */
      this.$emit('update:highlight', d[this.categoriesIdentifier])
    }
  }
}
</script>

<template>
  <ul class="ordinal-legend list-unstyled" :class="classList">
    <li v-for ="d in data" :key="d[categoriesIdentifier]" class="ordinal-legend__item" :class="itemClassList(d)">
      <a @click="update(d)" @mouseover="updateHighlight(d)" @mouseleave="updateHighlight()">
        <slot name="marker" :marker="{ path: d.path, color: d.color }">
          <svg class="ordinal-legend__item__marker mr-2" :viewBox="markerViewbox">
            <path :d="markerPathFunction(d)" :fill="d.color" class="ordinal-legend__item__marker__path"></path>
          </svg> 
        </slot>
        <span class="ordinal-legend__item__label">{{d.label}}</span>
      </a>
    </li>
  </ul>
</template>


<style lang="scss" scoped>
@import '../styles/lib';

.ordinal-legend {
  $muted-item-opacity: .2;
  $muted-item-filter: grayscale(30%) brightness(10%);
  $muted-item-transition: opacity .2s, filter .2s;
  
  font-size: $font-size-sm;

  &--horizontal &__item {
    display: inline-block;

    &:not(:last-child) {
      margin-right: $spacer * 2;
    }
  }
  
  &__item {
    transition: $muted-item-transition;

    .ordinal-legend--has-highlight &:not(&--highlighted) {
      opacity: $muted-item-opacity;
      filter: $muted-item-filter;
    }

    &--selected {
      font-weight: bold;
    }

    a {
      color: inherit
    }

    &__marker {
      height: 1em;
      width: 1em;
    }
  }
}
</style>