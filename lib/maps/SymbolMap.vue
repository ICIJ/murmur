<script>
import * as d3 from 'd3'
import { geoRobinson } from 'd3-geo-projection'
import { debounce, find, get, groupBy, isFunction, kebabCase, keys, pickBy, set, uniq, uniqueId } from 'lodash'
import { feature } from 'topojson'

import config from '../config'
import OrdinalLegend from '../components/OrdinalLegend.vue'
import chart from '../mixins/chart'

export default {
  name: 'SymbolMap',
  components: {
    OrdinalLegend
  },
  mixins: [chart],
  props: {
    categoryObjectsPath: {
      type: [String, Array],
      default: 'category'
    },
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
    featureColor: {
      type: [String, Function],
      default: 'currentColor'
    },
    fitToMarkers: {
      type: Boolean
    },
    labelObjectsPath: {
      type: [String, Array],
      default: 'label'
    },
    mapPadding: {
      type: Number,
      default: 15
    },
    markerObjectsPath: {
      type: [String, Array],
      default: 'id'
    },
    markerPath: {
      type: [String, Function],
      default:
        'M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z'
    },
    markerColor: {
      type: String,
      default: null
    },
    markerWidth: {
      type: [Number, Function],
      default: 10
    },
    noMarkersScale: {
      type: Boolean
    },
    tooltipCustomClass: {
      type: String,
      default: null
    },
    tooltipPlacement: {
      type: String,
      default: 'top'
    },
    tooltipFallbackPlacement: {
      type: [Array, String],
      default: 'flip'
    },
    topojsonObjects: {
      type: String,
      default: 'countries1'
    },
    topojsonObjectsPath: {
      type: [String, Array],
      default: 'id'
    },
    topojsonUrl: {
      type: String,
      default: () => config.get('map.topojson.world-countries-sans-antarctica')
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
  data() {
    return {
      mapRect: { width: 0, height: 0 },
      markerCursor: null,
      categoryHighlight: null
    }
  },
  topojson: null,
  computed: {
    featurePath() {
      return d3.geoPath().projection(this.mapProjection)
    },
    hasCursor() {
      return !!this.markerCursor
    },
    hasHighlight() {
      return !!this.categoryHighlight
    },
    topojson() {
      return this.$options.topojson
    },
    geojson() {
      return this.fitToMarkers ? this.markersGeojson : this.featuresGeojson
    },
    featuresGeojson() {
      const object = get(this.topojson, ['objects', this.topojsonObjects], null)
      return feature(this.topojson, object)
    },
    markersGeojson() {
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [this.coordinates]
        }
      }
    },
    coordinates() {
      return (this.loadedData || []).map(({ longitude, latitude }) => {
        return [longitude, latitude]
      })
    },
    mapId() {
      return uniqueId('symbol-map-')
    },
    mapClass() {
      return {
        'symbol-map--has-cursor': this.hasCursor,
        'symbol-map--has-highlight': this.hasHighlight,
        'symbol-map--has-markers-scale': !this.noMarkersScale
      }
    },
    mapProjection() {
      const { height, width } = this.mapRect
      const padding = this.mapPadding
      return geoRobinson().fitExtent(
        [
          [padding, padding],
          [width - padding, height - padding]
        ],
        this.geojson
      )
    },
    mapZoom() {
      return d3
        .zoom()
        .scaleExtent([this.zoomMin, this.zoomMax])
        .translateExtent([
          [0, 0],
          [this.mapRect.width, this.mapRect.height]
        ])
        .on('zoom', this.mapZoomed)
    },
    mapHeight() {
      return this.mapRect.height
    },
    mapWidth() {
      return this.mapRect.width
    },
    map() {
      if (!this.mounted) {
        return null
      }
      return d3.select(this.$el).select('.symbol-map__main')
    },
    markerCursorValue() {
      return find(this.loadedDataWithIds, (d) => {
        return get(d, this.markerObjectsPath) === this.markerCursor
      })
    },
    loadedDataWithIds() {
      return this.loadedData.map((d) => {
        return {
          ...set({}, this.markerObjectsPath, uniqueId()),
          ...d
        }
      })
    },
    categories() {
      const categories = (this.loadedData || []).map((d) => {
        return get(d, this.categoryObjectsPath)
      })
      return uniq(categories).map(String)
    },
    legendData() {
      const categories = groupBy(this.loadedData || [], (d) => {
        return get(d, this.categoryObjectsPath)
      })
      return Object.entries(categories).map((entry) => {
        const [label, [{ color: firstColor }]] = entry
        const color = firstColor || this.categoryColor(label)
        return { label, color }
      })
    },
    hasTooltip() {
      return !this.hideTooltip && this.loadedData && this.markerCursor
    },
    tooltipTarget() {
      if (this.hasTooltip) {
        return this.markerId(this.markerCursorValue)
      }
      return null
    }
  },
  watch: {
    data() {
      this.draw()
    },
    socialMode() {
      this.draw()
    },
    markerCursor() {
      this.setMarkersClasses()
    },
    categoryHighlight() {
      this.setMarkersClasses()
    }
  },
  async created() {
    await new Promise((resolve) => this.$on('loaded', resolve))
    await this.loadTopojson()
    this.draw()
    this.$on('resized', this.debouncedDraw)
  },
  methods: {
    debouncedDraw: debounce(function () {
      this.draw()
    }, 10),
    prepare() {
      // Set the map sizes
      this.$set(this, 'mapRect', this.map.node().getBoundingClientRect())
      // Remove any existing country
      this.map.selectAll('g').remove()
      // Return the map to allow chaining
      return this.map
    },
    prepareZoom() {
      if (this.zoomable) {
        this.map.call(this.mapZoom)
      }
    },
    categoryColor(category) {
      if (this.mounted) {
        const index = this.categories.indexOf(category)
        const style = window.getComputedStyle(this.$el)
        return style.getPropertyValue(`--category-color-${index}n`) || '#000'
      }
      return null
    },
    draw() {
      const map = this.prepare()
      // Bind a group for geojson features to path
      map
        .append('g')
        .attr('class', 'symbol-map__main__features')
        .selectAll('.symbol-map__main__features__item')
        .data(this.featuresGeojson.features)
        // Add the path with the correct class
        .enter()
        .append('path')
        .attr('class', this.featureClass)
        .attr('d', this.featurePath)
        .on('click', this.featureClicked)
        .style('color', this.featureColor)
      // Bind a group for marker paths
      map
        .append('g')
        .attr('class', 'symbol-map__main__markers')
        .selectAll('.symbol-map__main__markers__item')
        .data(this.loadedDataWithIds)
        .enter()
        .append('g')
        .attr('id', this.markerId)
        .attr('class', this.markerClass)
        .attr('transform', this.markerTransform)
        .append('path')
        .on('mouseover', this.markerMouseOver)
        .on('mouseleave', this.markerMouseLeave)
        .attr('d', this.markerPathFunction)
        .attr('fill', this.markerColorFunction)
      this.prepareZoom()
    },
    featureClass(d) {
      return keys(pickBy(this.featureClassObject(d), (value) => value)).join(' ')
    },
    featureClassObject(d) {
      const pathClass = 'symbol-map__main__features__item'
      const id = get(d, this.topojsonObjectsPath, null)
      return {
        [pathClass]: true,
        [`${pathClass}--identifier-${kebabCase(id)}`]: id !== null
      }
    },
    async loadTopojson() {
      if (!this.$options.topojsonPromise) {
        this.$options.topojsonPromise = d3.json(this.topojsonUrl)
        this.$options.topojson = await this.$options.topojsonPromise
      }
      return this.$options.topojsonPromise
    },
    mapZoomed({ transform }) {
      this.markerCursor = null
      this.map
        .style('--map-scale', transform.k)
        .selectAll('.symbol-map__main__features, .symbol-map__main__markers')
        .attr('transform', transform)
    },
    markerBoundingClientRect(d) {
      const marker = this.map.append('path').attr('d', this.markerPathFunction(d))
      const rect = marker.node().getBoundingClientRect()
      marker.remove()
      return rect
    },
    markerMouseLeave() {
      this.markerCursor = null
    },
    markerMouseOver(_, d) {
      this.markerCursor = get(d, this.markerObjectsPath)
    },
    markerClass(d) {
      return keys(pickBy(this.markerClassObject(d), (value) => value)).join(' ')
    },
    markerId(d) {
      const id = get(d, this.markerObjectsPath)
      return `${this.mapId}-marker-${id}`
    },
    markerClassObject(d) {
      const category = String(get(d, this.categoryObjectsPath))
      const categoryIndex = this.categories.indexOf(category)
      const id = get(d, this.markerObjectsPath)
      const pathClass = 'symbol-map__main__markers__item'
      return {
        [pathClass]: true,
        [`${pathClass}--category-${kebabCase(category)}`]: category !== null,
        [`${pathClass}--category-${categoryIndex}n`]: category !== null,
        [`${pathClass}--cursored`]: this.markerCursor === id,
        [`${pathClass}--identifier-${kebabCase(id)}`]: id !== null,
        [`${pathClass}--highlighted`]: this.categoryHighlight === category
      }
    },
    markerPathFunction(d) {
      return isFunction(this.markerPath) ? this.markerPath(d) : this.markerPath
    },
    markerColorFunction({ color, ...d }) {
      return color || (isFunction(this.markerColor) ? this.markerColor(d) : this.markerColor)
    },
    markerWidthFunction(d) {
      return isFunction(this.markerWidth) ? this.markerWidth(d) : this.markerWidth
    },
    markerLabel(d) {
      return get(d, this.labelObjectsPath)
    },
    markerTransform(d) {
      const { latitude, longitude } = d
      const { height, width } = this.markerBoundingClientRect(d)
      const [x, y] = this.mapProjection([longitude, latitude])
      const scale = this.markerWidthFunction(d) / Math.max(1, width)
      const cx = x - (width / 2) * scale
      const cy = y - (height / 2) * scale
      return `translate(${cx}, ${cy}) scale(${scale})`
    },
    async featureClicked(event, d) {
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
      await this.setFeatureZoom(d, d3.pointer(event, this.map.node()))
      /**
       * A zoom on a feature ended
       * @event zoomed
       * @param Zoomed feature
       */
      this.$emit('zoomed', d)
    },
    resetZoom() {
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
    setMarkersClasses() {
      this.map.selectAll('.symbol-map__main__markers__item').attr('class', this.markerClass)
    },
    setFeatureZoom(d, pointer = [0, 0]) {
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
  }
}
</script>

<template>
  <div class="symbol-map" :class="mapClass">
    <slot name="legend" v-bind="{ legendData }">
      <ordinal-legend
        v-if="!hideLegend && legendData"
        :data="legendData"
        :highlight.sync="categoryHighlight"
        :horizontal="horizontalLegend"
        :marker-path="markerPath"
        category-objects-path="label"
      >
        <template #marker="d">
          <slot name="legend-marker" v-bind="d" />
        </template>
        <template #label="d">
          <slot name="legend-label" v-bind="d" />
        </template>
      </ordinal-legend>
    </slot>
    <svg class="symbol-map__main" />
    <b-tooltip
      v-if="tooltipTarget"
      ref="marker-tooltip"
      :custom-class="tooltipCustomClass"
      :fallback-placement="tooltipFallbackPlacement"
      :placement="tooltipPlacement"
      :target="tooltipTarget"
    >
      <slot name="tooltip" v-bind="{ markerCursor, ...markerCursorValue }">
        {{ markerLabel(markerCursorValue) }}
      </slot>
    </b-tooltip>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import '../styles/lib';

.symbol-map {
  $muted-item-opacity: 0.2;
  $muted-item-filter: grayscale(30%) brightness(10%);
  $muted-item-transition: opacity 0.2s, filter 0.2s;

  $colors: $primary, $info, $warning, $danger;
  $quantile: 2;

  @each $start-color in $colors {
    $i: index($colors, $start-color) - 1;
    $end-color: mix($start-color, text-contrast($start-color), 20%);

    @for $j from ($quantile * $i) through ($quantile * $i + $quantile - 1) {
      $amount: ($j % $quantile) * math.div(100%, $quantile);
      --category-color-#{$j}n: #{mix($end-color, $start-color, $amount)};
    }
  }

  &__main {
    color: #ebebeb;
    min-height: 300px;
    height: 100%;
    width: 100%;

    .chart--social-mode & {
      color: $dark;
    }

    &:deep(.symbol-map__main__features__item) {
      stroke: currentColor;
      stroke-width: calc(1px / var(--map-scale, 1));
      fill: currentColor;
      transition: opacity 750ms, filter 750ms;
    }

    &:deep(.symbol-map__main__markers) {
      shape-rendering: geometricPrecision;

      .symbol-map__main__markers__item {
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

        @for $i from 0 through ($quantile * length($colors)) {
          &--category-#{$i}n path:not([fill]) {
            fill: var(--category-color-#{$i}n);
          }
        }

        .symbol-map--has-markers-scale & path {
          transform: scale(calc(1 / var(--map-scale)));
          transform-origin: center center;
        }
      }
    }
  }
}
</style>
