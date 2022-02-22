<script>
import * as d3 from 'd3'
import { geoRobinson } from 'd3-geo-projection'
import { debounce, find, get, groupBy, isFunction, kebabCase, keys, pickBy, set, uniqueId } from 'lodash'
import { feature } from 'topojson'
import OrdinalLegend from '../components/OrdinalLegend.vue'
import chart from '../mixins/chart'

export default {
  name: 'SymbolMap',
  mixins: [chart],
  components: {
    OrdinalLegend
  },
  props: {
    clickable: {
      type: Boolean
    },
    hideLegend: {
      type: Boolean
    },
    hideTooltip: {
      type: Boolean
    },
    horizontalLegend: {
      type: Boolean
    },
    topojsonObjects: {
      type: String,
      default: 'countries1'
    },
    topojsonObjectsPath: {
      type: [String, Array],
      default: 'id'
    },
    categoryObjectsPath: {
      type: [String, Array],
      default: 'category'
    },
    labelObjectsPath: {
      type: [String, Array],
      default: 'label'
    },
    markerObjectsPath: {
      type: [String, Array],
      default: 'id'
    },
    markerPath:{
      type: [String, Function],
      default: 'M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z'
    },
    markerColor: {
      type: String,
      default: '#000'
    },
    markerWidth: {
      type: Number,
      default: 10
    },
    topojsonUrl: {
      type: String,
      default: 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json'
    },
    transitionDuration: {
      type: Number,
      default: 750
    },
    zoomable: {
      type: Boolean
    },
    zoomMin: {
      type: Number,
      default: 1
    },
    zoomMax: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      mapRect: { width: 0, height: 0 },
      markerCursor: null,
      categoryHighlight: null
    }
  },
  topojson: null,
  async created () {
    await new Promise(resolve => this.$on('loaded', resolve))
    await this.loadTopojson()
    this.draw()
    this.$on('resized', this.debouncedDraw)
  },
  watch: {
    socialMode () {
      this.draw()
    },
    markerCursor () {
      this.setMarkersClasses()
    },
    categoryHighlight () {
      this.setMarkersClasses()
    }
  },
  methods: {
    debouncedDraw: debounce(function () {
      this.draw()
    }, 10),
    prepare () {
      // Set the map sizes
      this.$set(this, 'mapRect', this.map.node().getBoundingClientRect())
      // Remove any existing country
      this.map.selectAll('g').remove()
      // Return the map to allow chaining
      return this.map
    },
    prepareZoom () {
      if (this.zoomable) {
        this.map.call(this.mapZoom)
      }
    },
    draw () {
      const map = this.prepare()
      // Bind a group for geojson features to path
      map.append('g')
        .attr('class', 'symbol-map__main__features')
        .selectAll('.symbol-map__main__features__item')
        .data(this.geojson.features)
        // Add the path with the correct class
        .enter()
          .append('path')
          .attr('class',this.featureClass)
          .attr('d', this.featurePath)
          .on('click', this.featureClicked)
          .style('color', this.featureColor)
      // Bind a group for marker paths
      map.append('g')
        .attr('class', 'symbol-map__main__markers')
        .selectAll('.symbol-map__main__markers__item')
        .data(this.loadedDataWithIds)
        .enter()
          .append('path')
          .on('mouseover', this.markerMouseOver)
          .on('mouseleave', this.markerMouseLeave)
          .attr('id', this.markerId)
          .attr('class', this.markerClass)
          .attr('d', this.markerPathFunction)
          .attr('fill', this.markerColorFunction)
          .attr('transform', this.markerTransform)
      this.prepareZoom()
    },
    featureClass (d) {
      return keys(pickBy(this.featureClassObject(d), value => value)).join(' ')
    },
    featureClassObject (d) {
      const pathClass = 'symbol-map__main__features__item'
      const id = get(d, this.topojsonObjectsPath, null)
      return {
        [pathClass]: true,
        [`${pathClass}--identifier-${kebabCase(id)}`]: id !== null
      }
    },
    async loadTopojson () {
      if (!this.$options.topojsonPromise) {
        this.$options.topojsonPromise = d3.json(this.topojsonUrl)
        this.$options.topojson = await this.$options.topojsonPromise
      }
      return this.$options.topojsonPromise
    },
    mapZoomed ({ transform }) {
      this.map
        .style('--map-scale', transform.k)
        .selectAll('.symbol-map__main__features, .symbol-map__main__markers')
        .attr('transform', transform)
    },
    markerMouseLeave () {
      this.markerCursor = null
    },
    markerMouseOver (_, d) {
      this.markerCursor = get(d, this.markerObjectsPath)
    },
    markerClass (d) {
      return keys(pickBy(this.markerClassObject(d), value => value)).join(' ')
    },
    markerId (d) {
      const id = get(d, this.markerObjectsPath)
      return `${this.mapId}-marker-${id}`
    },
    markerClassObject (d) {
      const category = get(d, this.categoryObjectsPath)
      const id = get(d, this.markerObjectsPath)
      const pathClass = 'symbol-map__main__markers__item'
      return {
        [pathClass]: true,
        [`${pathClass}--category-${kebabCase(category)}`]: category !== null,
        [`${pathClass}--cursored`]: this.markerCursor === id,
        [`${pathClass}--highlighted`]: this.categoryHighlight === category
      }
    },
    markerPathFunction (d) {
      return isFunction(this.markerPath) ? this.markerPath(d) : this.markerPath
    },
    markerColorFunction ({ color }) {
      return color || this.markerColor
    },
    markerLabel (d) {
      return get(d, this.labelObjectsPath)
    },
    markerTransform ({ latitude, longitude}) {
      const { height, width } = this.markerBoundingClientRect
      const [x, y] = this.mapProjection([longitude, latitude])
      const scale = this.markerWidth / width
      const cx = x - (width / 2) * scale
      const cy = y - (height / 2) * scale
      return `translate(${cx}, ${cy}) scale(${scale})`
    },
    async featureClicked (event, d) {
      /**
       * A click on a feature
       * @event click
       * @param Clicked feature
       */
      this.$emit('click', d)
      // Don't zoom on the map feature
      if (!this.clickable) {
        return
      }
      await this.featureZoom(d, d3.pointer(event, this.map.node()))
      /**
       * A zoom on a feature ended
       * @event zoomed
       * @param Zoomed feature
       */
      this.$emit('zoomed', d)
    },
    resetZoom () {
      this.map
        .style('--map-scale', 1)
        .transition()
        .duration(this.transitionDuration)
        .call(this.mapZoom.transform, d3.zoomIdentity)
      /**
       * The zomm on the map was reset to its initial <slot ate></slot>
       * @event reset
       */
      this.$emit('reset')
    },
    setMarkersClasses () {
      this.map
        .selectAll('.symbol-map__main__markers__item')
        .attr('class', this.markerClass)
    },
    featureZoom (d, pointer = [0, 0]) {
      const { height, width } = this.mapRect
      const [[x0, y0], [x1, y1]] = this.featurePath.bounds(d)
      const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
      const x = -(x0 + x1) / 2
      const y = -(y0 + y1) / 2
      const zoomIdentity = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(x, y)
      return this.map
        .style('--map-scale', scale)
        .transition()
        .duration(this.transitionDuration)
        .call(this.mapZoom.transform, zoomIdentity, pointer)
        .end()
    }
  },
  computed: {
    featureColor () {
      return '#fff'
    },
    featurePath () {
      return d3.geoPath().projection(this.mapProjection)
    },
    markerBoundingClientRect () {
      const marker = this.map.append('path').attr('d', this.markerPathFunction)
      const rect = marker.node().getBoundingClientRect()
      marker.remove()
      return rect
    },
    hasCursor () {
      return !!this.markerCursor
    },
    hasHighlight () {
      return !!this.categoryHighlight
    },
    topojson () {
      return this.$options.topojson
    },
    geojson () {
      const object = get(this.topojson, ['objects', this.topojsonObjects], null)
      return feature(this.topojson, object)
    },
    mapId () {
      return uniqueId('symbol-map-')
    },
    mapClass () {
      return {
        'symbol-map--has-cursor': this.hasCursor,
        'symbol-map--has-highlight': this.hasHighlight,
      }
    },
    mapProjection () {
      const { height, width } = this.mapRect
      return geoRobinson().fitSize([width, height], this.geojson)
    },
    mapZoom () {
      return d3.zoom()
        .scaleExtent([this.zoomMin, this.zoomMax])
        .translateExtent([[0, 0], [this.mapRect.width, this.mapRect.height]])
        .on('zoom', this.mapZoomed)
    },
    mapHeight () {
      return this.mapRect.height
    },
    mapWidth () {
      return this.mapRect.width
    },
    map () {
      if (!this.mounted) {
        return null
      }
      return d3.select(this.$el).select('.symbol-map__main')
    },
    cursorValue () {
      return find(this.loadedDataWithIds, d => {
        return get(d, this.markerObjectsPath) === this.markerCursor
      })
    },
    loadedDataWithIds () {
      return this.loadedData.map(d => {
        return { 
          ...set({}, this.markerObjectsPath, uniqueId()), 
          ...d
        }
      })
    },
    legendData () {
      const categories = groupBy(this.loadedData || [], (d) => {
        return get(d, this.categoryObjectsPath)
      })
      return Object.entries(categories).map(entry => {
        const [ label, [{ color }] ] = entry
        return { label, color }
      })
    },
    hasTooltip () {
      return !this.hideTooltip && this.loadedData && this.markerCursor
    },
    tooltipTarget () {
      if (this.hasTooltip) {
        return this.markerId(this.cursorValue)
      }
      return null
    }
  }
}
</script>

<template>
  <div class="symbol-map" :class="mapClass">
    <slot name="legend" v-bind="{ legendData }">
      <ordinal-legend 
        :data="legendData" 
        :highlight.sync="categoryHighlight" 
        :horizontal="horizontalLegend"
        category-objects-path="label"
        v-if="!hideLegend && legendData" />
    </slot>
    <svg class="symbol-map__main"></svg>
    <b-tooltip ref="marker-tooltip" :target="tooltipTarget" v-if="tooltipTarget">
      <slot name="tooltip" v-bind="{ markerCursor, ...cursorValue }">
        {{ markerLabel(cursorValue) }}
      </slot>
    </b-tooltip>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/lib';

.symbol-map {
  $muted-item-opacity: .2;
  $muted-item-filter: grayscale(30%) brightness(10%);
  $muted-item-transition: opacity .2s, filter .2s;
  
  &__main {
    color: #fff;
    min-height: 300px;
    height: 100%;
    width: 100%;

    .chart--social-mode & {
      color: $dark;
    }

    & /deep/ &__features__item {
      stroke: currentColor;
      stroke-width: calc(1px / var(--map-scale, 1));
      fill: currentColor;
      transition: opacity 750ms, filter 750ms;
    }

    & /deep/ &__markers__item {
      opacity: 1;
      filter: grayscale(0%) brightness(100%);
      transition: $muted-item-transition;

      .symbol-map--has-highlight & {
        opacity: $muted-item-opacity;
        filter: $muted-item-filter;
      }

      .symbol-map--has-highlight &--highlighted {
        opacity: 1;
        filter: grayscale(0%) brightness(100%);
      }
      
    }

    
  }
}
</style>
