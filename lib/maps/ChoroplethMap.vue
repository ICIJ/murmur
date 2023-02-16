<script>
import * as d3 from 'd3'
import { geoRobinson } from 'd3-geo-projection'
import { debounce, get, kebabCase, keys, max, min, pickBy, values } from 'lodash'
import { feature } from 'topojson'
import config from '../config'
import ScaleLegend from '../components/ScaleLegend'
import chart from '../mixins/chart'

export default {
  name: 'ChoroplethMap',
  mixins: [chart],
  components: {
    ScaleLegend
  },
  props: {
    hatchEmpty: {
      type: Boolean
    },
    hideLegend: {
      type: Boolean
    },
    featureColorScale: {
      type: Function,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    clickable: {
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
    },
  },
  data () {
    return {
      mapRect: { width: 0, height: 0 },
      featureCursor: null,
      featureZoom: null
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
    data () {
      this.update()
    },
    featureZoom () {
      this.setFeaturesClasses()
    },
    featureCursor () {
      this.setFeaturesClasses()
    }
  },
  filters: {
    formatNumber: d3.format(',')
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
      // Bind geojson features to path
      this.prepare()
        .append('g')
          .attr('class', 'choropleth-map__main__features')
          .selectAll('.choropleth-map__main__features__item')
          .data(this.geojson.features)
          // Add the path with the correct class
          .enter()
            .append('path')
            .attr('class',this.featureClass)
            .attr('d', this.featurePath)
            .on('mouseover', this.featureMouseOver)
            .on('mouseleave', this.featureMouseLeave)
            .on('click', this.mapClicked)
            .style('color', this.featureColor)
      this.prepareZoom()
    },
    update () {
      // Bind geojson features to path
      this.map
        .selectAll('.choropleth-map__main__features__item')
        .data(this.geojson.features)
        .attr('class',this.featureClass)
        .style('color', this.featureColor)
    },
    featureClass (d) {
      return keys(pickBy(this.featureClassObject(d), value => value)).join(' ')
    },
    featureClassObject (d) {
      const pathClass = 'choropleth-map__main__features__item'
      const id = get(d, this.topojsonObjectsPath)
      return {
        [pathClass]: true,
        [`${pathClass}--identifier-${kebabCase(id)}`]: true,
        [`${pathClass}--empty`]: !(id in this.loadedData),
        [`${pathClass}--zoomed`]: this.featureZoom === id,
        [`${pathClass}--cursored`]: this.featureCursor === id
      }
    },
    featureMouseLeave () {
      this.featureCursor = null
    },
    featureMouseOver (_, d) {
      const id = get(d, this.topojsonObjectsPath)
      this.featureCursor = id in this.loadedData ? id : null
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
        .selectAll('.choropleth-map__main__features__item')
        .attr('transform', transform)
    },
    async mapClicked (event, d) {
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
      if (this.featureZoom === get(d, this.topojsonObjectsPath)) {
        return this.resetZoom(event, d)
      }
      await this.setFeatureZoom(d, d3.pointer(event, this.map.node()))
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
      this.featureZoom = null
      /**
       * The zomm on the map was reset to its initial <slot ate></slot>
       * @event reset
       */
      this.$emit('reset')
    },
    setFeaturesClasses () {
      this.map
        .selectAll('.choropleth-map__main__features__item')
        .attr('class', this.featureClass)
    },
    setFeatureZoom (d, pointer = [0, 0]) {
      this.featureZoom = get(d, this.topojsonObjectsPath)
      const { height, width } = this.mapRect
      const [[x0, y0], [x1, y1]] = this.featurePath.bounds(d)
      const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
      const zoomIdentity = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
      return this.map
        .style('--map-scale', scale)
        .transition()
        .duration(this.transitionDuration)
        .call(this.mapZoom.transform, zoomIdentity, pointer)
        .end()
    }
  },
  computed: {
    featureColorScaleEnd () {
      if (this.mounted) {
        const computedStyle = window.getComputedStyle(this.map.node())
        return computedStyle.getPropertyValue('--primary') || '#852308'
      }
      return '#852308'
    },
    featureColorScaleStart () {
      // `socialMode` is always different from null but accessing it will make
      // this computed property reactive.
      if (this.mounted && this.socialMode !== null) {
        const computedStyle = window.getComputedStyle(this.map.node())
        return computedStyle.getPropertyValue('color') || '#fff'
      }
      return '#fff'
    },
    featureColor () {
      return d => {
        const id = get(d, this.topojsonObjectsPath)
        if (!(id in this.loadedData)) {
          return
        }
        return this.featureColorScaleFunction(this.loadedData[id])
      }
    },
    featureColorScaleFunction () {
      if (this.featureColorScale !== null) {
        return this.featureColorScale
      }
      return this.defaultFeatureColorScale
    },
    defaultFeatureColorScale () {
      return d3.scaleLog()
        .domain([Math.max(1, this.minValue), this.maxValue])
        .range([this.featureColorScaleStart, this.featureColorScaleEnd])
    },
    featurePath () {
      return d3.geoPath().projection(this.mapProjection)
    },
    hasCursor () {
      return !!this.featureCursor
    },
    hasZoom () {
      return !!this.featureZoom
    },
    topojson () {
      return this.$options.topojson
    },
    geojson () {
      const object = get(this.topojson, ['objects', this.topojsonObjects], null)
      return feature(this.topojson, object)
    },
    mapClass () {
      return {
        'choropleth-map--has-cursor': this.hasCursor,
        'choropleth-map--has-zoom': this.hasZoom,
        'choropleth-map--hatch-empty': this.hatchEmpty
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
      return d3.select(this.$el).select('svg')
    },
    maxValue () {
      if (this.max !== null) {
        return this.max
      }
      return max(values(this.loadedData)) || 0
    },
    minValue () {
      if (this.min !== null) {
        return this.min
      }
      return min(values(this.loadedData)) || 0
    },
    cursorValue () {
      return get(this, ['data', this.featureCursor], null)
    }
  }
}
</script>

<template>
  <div class="choropleth-map" :class="mapClass">
    <svg class="choropleth-map__main">
      <pattern id="diagonalHatch" width="1" height="1" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" :fill="featureColorScaleEnd" />
        <line x1="0" y1="0" x2="0" y2="1" :style="{ stroke: featureColorScaleStart, strokeWidth: 1 }" />
      </pattern>
    </svg>
    <scale-legend
      :color-scale-end="featureColorScaleEnd"
      :color-scale-start="featureColorScaleStart"
      :color-scale="featureColorScaleFunction"
      :cursor-value="cursorValue"
      :max="maxValue"
      :min="minValue"
      v-if="!hideLegend"
      class="choropleth-map__legend">
      <template #cursor="{ value }">
        <slot name="legend-cursor" v-bind="{ value, identifier: featureCursor }" />
      </template>
    </scale-legend>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/lib';

.choropleth-map {
  position: relative;

  &__main {
    color: #fff;
    min-height: 300px;
    height: 100%;
    width: 100%;

    .chart--social-mode & {
      color: $dark;
    }

    &:deep(.choropleth-map__main__features__item) {
      stroke: currentColor;
      stroke-width: calc(1px / var(--map-scale, 1));
      fill: currentColor;
      transition: opacity 750ms, filter 750ms, fill 750ms;

      .choropleth-map__main__features__item--empty {
        opacity: 0.8;

        .choropleth-map--hatch-empty & {
          opacity: 0.3;
          fill: url('#diagonalHatch');
        }
      }

      .choropleth-map--has-zoom &:not(.choropleth-map__main__features__item--zoomed) {
        filter: grayscale(90%);
      }
    }
  }

  &__legend {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
