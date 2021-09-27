<script>
import * as d3 from 'd3'
import { geoRobinson } from 'd3-geo-projection'
import { debounce, get, kebabCase, keys, max, min, once, pickBy, values } from 'lodash'
import { feature } from 'topojson'
import chart from '../mixins/chart'

export default {
  name: 'ChoroplethMap',
  mixins: [chart],
  props: {
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
    clickable: {
      type: Boolean
    },
    topojsonObjects: {
      type: String,
      default: 'countries1'
    },
    topojsonObjectsIdentifier: {
      type: [String, Array],
      default: 'id'
    },
    topojsonUrl: {
      type: String,
      default: 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json'
    },
    transitionDuration: {
      type: Number,
      default: 750
    }
  },
  data () {
    return {
      mapRect: { width: 0, height: 0 },
      cursorIdentifier: null,
      zoomIdentifier: null
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
    zoomIdentifier () {
      this.setFeaturesClasses()
    },
    cursorIdentifier () {
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
          .selectAll('.choropleth-map__main__feature')
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
    featureClass (d) {
      return keys(pickBy(this.featureClassObject(d), value => value)).join(' ')
    },
    featureClassObject (d) {
      const pathClass = 'choropleth-map__main__feature'
      const id = kebabCase(get(d, this.topojsonObjectsIdentifier))
      return {
        [pathClass]: true,
        [`${pathClass}--identifier-${id}`]: true,
        [`${pathClass}--zoomed`]: this.zoomIdentifier === id,
        [`${pathClass}--cursored`]: this.cursorIdentifier === id
      }
    },
    featureMouseLeave (event, d) {
      this.cursorIdentifier = null
    },
    featureMouseOver (event, d) {
      const id = get(d, this.topojsonObjectsIdentifier)
      this.cursorIdentifier = id in this.loadedData ? id : null
    },
    async loadTopojson () {
      if (!this.$options.topojsonPromise) {
        this.$options.topojsonPromise = d3.json(this.topojsonUrl)
        this.$options.topojson = await this.$options.topojsonPromise
      }
      return this.$options.topojsonPromise
    },
    mapZoomed ({ transform }) {
      this.map.selectAll('.choropleth-map__main__feature')
        .attr('transform', transform)
    },
    async mapClicked (event, d) {
      if (!this.clickable) {
        return
      }
      if (this.zoomIdentifier === get(d, this.topojsonObjectsIdentifier)) {
        return this.resetZoom(event, d)
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
        .transition()
        .duration(this.transitionDuration)
        .call(this.mapZoom.transform, d3.zoomIdentity)
      this.zoomIdentifier = null
      /**
       * The zomm on the map was reset to its initial <slot ate></slot>
       * @event reset
       */
      this.$emit('reset')
    },
    setFeaturesClasses () {
      this.map.selectAll('.choropleth-map__main__feature').attr('class', this.featureClass)
    },
    featureZoom (d, pointer = [0, 0]) {
      this.zoomIdentifier = get(d, this.topojsonObjectsIdentifier)
      const { height, width } = this.mapRect
      const [[x0, y0], [x1, y1]] = this.featurePath.bounds(d)
      const zoomIdentity = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
      return this.map
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
      return (d) => {
        const id = get(d, this.topojsonObjectsIdentifier)
        if (!(id in this.loadedData)) {
          return
        }
        return this.featureColorScale(this.loadedData[id])
      }
    },
    featureColorScale () {
      return d3.scaleLog()
        .domain([Math.max(1, this.minValue), this.maxValue])
        .range([this.featureColorScaleStart, this.featureColorScaleEnd])
        .nice()
    },
    featureColorScaleTicks () {
      return this.featureColorScale.ticks()
    },
    featurePath () {
      return d3.geoPath().projection(this.mapProjection)
    },
    hasCursor () {
      return !!this.cursorIdentifier
    },
    hasZoom () {
      return !!this.zoomIdentifier
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
        'choropleth-map--has-zoom': this.hasZoom
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
      return max(values(this.loadedData)) || 0
    },
    minValue () {
      return min(values(this.loadedData)) || 0
    },
    cursorValue () {
      return get(this, ['data', this.cursorIdentifier], 0)
    },
    cursorLeft () {
      const scale = this.featureColorScale.copy().range([0, 100])
      const left = scale(this.cursorValue)
      return `${left || 0}%`
    },
    legendScaleWidth () {
      return Math.max(100, Math.min(300, this.mapRect.width * 0.25))
    },
    legendScaleHeight () {
      return 16
    },
    legendScaleTickWidth () {
      return Math.ceil(this.legendScaleWidth / this.featureColorScaleTicks.length)
    }
  }
}
</script>

<template>
  <div class="choropleth-map" :class="mapClass">
    <svg class="choropleth-map__main"></svg>
    <div class="choropleth-map__legend">
      <div class="choropleth-map__legend__bound choropleth-map__legend__bound--min">
        <slot name="legend-cursor-min" v-bind="{ minValue }">
          {{ minValue | formatNumber }}
        </slot>
      </div>
      <svg class="choropleth-map__legend__scale" :width="legendScaleWidth" :height="legendScaleHeight">
        <rect
          v-for="(tick, index) in featureColorScaleTicks"
          :fill="featureColorScale(tick)"
          :height="legendScaleHeight"
          :key="index"
          :width="legendScaleTickWidth"
          :x="legendScaleTickWidth * index"
          :y="0" />
      </svg>
      <div class="choropleth-map__legend__bound choropleth-map__legend__bound--max">
        <slot name="legend-cursor-max" v-bind="{ maxValue }">
          {{ maxValue | formatNumber }}
        </slot>
      </div>
      <div class="choropleth-map__legend__cursor" :style="{ left: cursorLeft }" v-if="hasCursor">
        <slot name="legend-cursor" v-bind="{ value: cursorValue, identifier: cursorIdentifier }">
          {{ cursorValue | formatNumber }}
        </slot>
      </div>
    </div>
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

    & /deep/ &__feature {
      stroke: currentColor;
      fill: currentColor;
      transition: opacity 750ms, filter 750ms;

      &:not([style]) {
        opacity: 0.7;
      }

      .choropleth-map--has-zoom &:not(.choropleth-map__main__feature--zoomed) {
        filter: grayscale(90%);
      }
    }
  }

  &__legend {
    position: absolute;
    left: 0;
    bottom: 0;

    &__bound, &__cursor {
      position: absolute;
      bottom: 100%;
      font-size: 0.8rem;

      &--min {
        left: 0;
      }

      &--max {
        right: 0;
      }
    }

    .choropleth-map--has-cursor &__bound {
      color: $text-muted;
      opacity: 0.6;
    }

    &__cursor {
      font-weight: bold;
      transform: translateX(-50%);
      left: 50%;

      &:after {
        content: "";
        border: 5px solid transparent;
        border-top-color: currentColor;
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
