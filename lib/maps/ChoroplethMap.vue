<script>
import * as d3 from 'd3'
import { geoGraticule } from 'd3-geo'
import { geoRobinson } from 'd3-geo-projection'
import { debounce, clamp, get, kebabCase, keys, max, min, pickBy, values } from 'lodash'
import { feature } from 'topojson'

import config from '../config'
import ScaleLegend from '../components/ScaleLegend'
import chart from '../mixins/chart'

export default {
  name: 'ChoroplethMap',
  components: {
    ScaleLegend
  },
  filters: {
    formatNumber: d3.format(',')
  },
  mixins: [chart],
  provide() {
    const parent = {}
    const props = ['mapProjection', 'mapRect', 'mapTransform', 'rotatingMapProjection']
    for (const prop of props) {
      Object.defineProperty(parent, prop, { enumerable: true, get: () => this[prop] })
    }
    return { parent }
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
    outlineColor: {
      type: String,
      default: 'currentColor'
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
    spherical: {
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
    zoom: {
      type: Number,
      default: null
    },
    center: {
      type: Array,
      default: null
    },
    projection: {
      type: Function,
      default: geoRobinson
    },
    outline: {
      type: Boolean
    },
    graticule: {
      type: Boolean
    },
    height: {
      type: String,
      default: '300px'
    },
    color: {
      type: String,
      default: '#fff'
    },
    socialColor: {
      type: String,
      default: '#000'
    }
  },
  data() {
    return {
      mapTransform: { k: 1, x: 0, y: 0 },
      mapRect: { width: 0, height: 0 },
      featureCursor: null,
      featureZoom: null,
      topojson: null,
      topojsonPromise: null
    }
  },
  computed: {
    sphericalCenter() {
      const [lng = 0, lat = 0] = this.center ?? [0, 0]
      return [-lng, -lat]
    },
    planarCenter() {
      const [lng = 0, lat = 0] = this.center ?? [0, 0]
      return [lng, lat]
    },
    featureColorScaleEnd() {
      if (this.mounted) {
        const computedStyle = window.getComputedStyle(this.map.node())
        return computedStyle.getPropertyValue('--primary') || '#f00'
      }
      return '#f00'
    },
    featureColorScaleStart() {
      // `socialMode` is always different from null but accessing it will make
      // this computed property reactive.
      if (this.mounted && this.socialMode !== null) {
        const computedStyle = window.getComputedStyle(this.map.node())
        return computedStyle.getPropertyValue('color') || '#fff'
      }
      return '#fff'
    },
    featureColor() {
      return (d) => {
        const id = get(d, this.topojsonObjectsPath)
        if (!(id in this.loadedData)) {
          return
        }
        return this.featureColorScaleFunction(this.loadedData[id])
      }
    },
    featureColorScaleFunction() {
      if (this.featureColorScale !== null) {
        return this.featureColorScale
      }
      return this.defaultFeatureColorScale
    },
    graticuleLines() {
      return geoGraticule().step([20, 20])()
    },
    defaultFeatureColorScale() {
      return d3
        .scaleLog()
        .domain([Math.max(1, this.minValue), this.maxValue])
        .range([this.featureColorScaleStart, this.featureColorScaleEnd])
    },
    initialFeaturePath() {
      return this.featurePath.projection(this.initialMapProjection)
    },
    initialGraticulePath() {
      return this.initialFeaturePath(this.graticuleLines)
    },
    initialMapProjection() {
      if (this.spherical) {
        const { height, width } = this.mapRect
        return this.mapProjection
          .rotate(this.sphericalCenter)
          .fitHeight(height, this.geojson)
          .translate([width / 2, height / 2])
      }
      return this.mapProjection.center(this.planarCenter)
    },
    featurePath() {
      return d3.geoPath().projection(this.mapProjection)
    },
    hasCursor() {
      return !!this.featureCursor
    },
    hasZoom() {
      return !!this.featureZoom
    },
    geojson() {
      const object = get(this.topojson, ['objects', this.topojsonObjects], null)
      return feature(this.topojson, object)
    },
    mapClass() {
      return {
        'choropleth-map--has-cursor': this.hasCursor,
        'choropleth-map--has-zoom': this.hasZoom,
        'choropleth-map--hatch-empty': this.hatchEmpty
      }
    },
    mapProjection() {
      const { height, width } = this.mapRect
      return this.projection().fitSize([width, height], this.geojson)
    },
    rotatingMapProjection() {
      const { rotateX = null, rotateY = null } = this.mapTransform
      if (rotateX !== null && rotateY !== null) {
        return this.mapProjection.rotate([rotateX, rotateY])
      }
      return this.mapProjection
    },
    mapCenter() {
      return this.mapProjection.center()
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
    mapSphericalZoom() {
      return d3.zoom(this.map).scaleExtent([this.zoomMin, this.zoomMax]).on('zoom', this.mapSphericalZoomed)
    },
    mapRotate() {
      return d3.drag(this.map).on('drag', this.mapRotated)
    },
    mapHeight() {
      return this.mapRect.height
    },
    mapWidth() {
      return this.mapRect.width
    },
    mapStyle() {
      const { k = 0, x = 0, y = 0, rotateX = 0, rotateY = 0 } = this.mapTransform
      return {
        '--map-height': this.height,
        '--map-color': this.color,
        '--map-social-color': this.socialColor,
        '--map-scale': k,
        '--map-translate-x': x,
        '--map-translate-y': y,
        '--map-rotate-x': rotateX,
        '--map-rotate-y': rotateY
      }
    },
    map() {
      if (!this.mounted) {
        return null
      }
      return d3.select(this.$el).select('svg')
    },
    maxValue() {
      if (this.max !== null) {
        return this.max
      }
      return max(values(this.loadedData)) || 0
    },
    minValue() {
      if (this.min !== null) {
        return this.min
      }
      return min(values(this.loadedData)) || 0
    },
    transformOrigin() {
      return this.spherical ? '50% 50%' : '0 0'
    },
    cursorValue() {
      return get(this, ['data', this.featureCursor], null)
    },
    isReady() {
      return this.loadedData && this.mounted && this.topojson
    }
  },
  watch: {
    socialMode() {
      this.draw()
    },
    data() {
      this.update()
    },
    featureZoom() {
      this.setFeaturesClasses()
    },
    featureCursor() {
      this.setFeaturesClasses()
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
      this.$set(this, 'mapRect', this.$el.getBoundingClientRect())
      // Remove any existing country
      this.map.selectAll('.choropleth-map__main__outline > *').remove()
      this.map.selectAll('.choropleth-map__main__graticule > *').remove()
      this.map.selectAll('.choropleth-map__main__features > *').remove()
      // Return the map to allow chaining
      return this.map
    },
    prepareZoom() {
      // User can zoom on the map
      if (this.zoomable && this.spherical) {
        this.map.call(this.mapRotate).call(this.mapSphericalZoom)
      } else if (this.zoomable) {
        this.map.call(this.mapZoom)
      }
      // An intial zoom value is given
      if (this.zoom || this.spherical) {
        this.applyZoom(this.zoom ?? this.zoomMin, 0)
      }
    },
    draw() {
      this.prepare()
      this.drawOutline()
      this.drawGraticule()
      this.drawFeatures()
      this.prepareZoom()
    },
    drawOutline() {
      this.map
        .select('.choropleth-map__main__outline')
        .append('path')
        .attr('d', this.initialFeaturePath({ type: 'Sphere' }))
        .attr('stroke', this.outlineColor)
    },
    drawGraticule() {
      this.map
        .select('.choropleth-map__main__graticule')
        .append('path')
        .attr('d', this.initialGraticulePath)
        .attr('fill', 'none')
        .attr('stroke', 'currentColor')
    },
    drawFeatures() {
      const features = this.map
        .select('.choropleth-map__main__features')
        .selectAll('.choropleth-map__main__features__item')
        .data(this.geojson.features)
        .enter()
        .append('path')

      features
        .attr('class', this.featureClass)
        .attr('d', this.initialFeaturePath)
        .on('mouseover', this.featureMouseOver)
        .on('mouseleave', this.featureMouseLeave)
        .on('click', this.mapClicked)
        .style('color', this.featureColor)
    },
    update() {
      // Bind geojson features to path
      this.map
        .selectAll('.choropleth-map__main__features__item')
        .data(this.geojson.features)
        .attr('class', this.featureClass)
        .style('color', this.featureColor)
    },
    featureClass(d) {
      return keys(pickBy(this.featureClassObject(d), (value) => value)).join(' ')
    },
    featureClassObject(d) {
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
    featureMouseLeave() {
      this.featureCursor = null
    },
    featureMouseOver(_, d) {
      const id = get(d, this.topojsonObjectsPath)
      this.featureCursor = id in this.loadedData ? id : null
    },
    setFeaturesClasses() {
      this.map.selectAll('.choropleth-map__main__features__item').attr('class', this.featureClass)
    },
    async loadTopojson() {
      if (!this.topojsonPromise) {
        this.topojsonPromise = d3.json(this.topojsonUrl)
        this.topojson = await this.topojsonPromise
      }
      return this.topojsonPromise
    },
    async mapClicked(event, d) {
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
        return this.reapplyZoom(event, d)
      }
      await this.applyFeatureZoom(d, d3.pointer(event, this.map.node()))
      /**
       * A zoom on a feature ended
       * @event zoomed
       * @param Zoomed feature
       */
      this.$emit('zoomed', d)
    },
    mapSphericalZoomed({ transform: { k } }) {
      const transform = `scale(${k})`
      this.applyTransformToTrackedElements(transform)
    },
    mapZoomed({ transform }) {
      this.mapTransform = transform
      this.applyTransformToTrackedElements(transform)
    },
    mapRotated(event) {
      const { yaw, pitch } = this.calculateRotation(event)
      this.applyRotation(yaw, pitch)
    },
    calculateRotation(event) {
      const sensitivity = 75
      const k = sensitivity / this.mapProjection.scale()
      const [rotateX, rotateY] = this.mapProjection.rotate()
      const yaw = rotateX + event.dx * k
      const pitch = rotateY - event.dy * k

      return { yaw, pitch }
    },
    applyTransformToTrackedElements(transform) {
      this.map.selectAll('.choropleth-map__main__tracked').attr('transform', transform)
    },
    applyRotation(rotateX, rotateY) {
      this.mapTransform = { ...this.mapTransform, rotateX, rotateY }
      const featuresPaths = this.initialFeaturePath.projection(this.rotatingMapProjection)
      const graticulePaths = featuresPaths(this.graticuleLines)
      this.map.selectAll('g.choropleth-map__main__features path').attr('d', featuresPaths)
      this.map.selectAll('g.choropleth-map__main__graticule path').attr('d', graticulePaths)
    },
    applyZoomIdentity(zoomIdentity, pointer = null, transitionDuration = this.transitionDuration) {
      return this.map
        .transition()
        .duration(transitionDuration)
        .call(this.mapZoom.transform, zoomIdentity, pointer)
        .end()
    },
    reapplyZoom() {
      this.mapTransform = { k: 1, x: 0, y: 0 }
      this.applyZoomIdentity(d3.zoomIdentity)
      this.featureZoom = null
      this.emitResetEvent()
    },
    emitResetEvent() {
      /**
       * The zomm on the map was reset to its initial <slot ate></slot>
       * @event reset
       */
      this.$emit('reset')
    },
    calculateFeatureZoomIdentity(d) {
      const { height, width } = this.mapRect
      const [[x0, y0], [x1, y1]] = this.featurePath.bounds(d)
      const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
      const translateX = -(x0 + x1) / 2
      const translateY = -(y0 + y1) / 2
      return d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(translateX, translateY)
    },
    applyFeatureZoom(d, pointer = [0, 0]) {
      const zoomIdentity = this.calculateFeatureZoomIdentity(d)
      this.featureZoom = get(d, this.topojsonObjectsPath)
      this.mapTransform = { k: zoomIdentity.k, x: zoomIdentity.x, y: zoomIdentity.y }
      return this.applyZoomIdentity(zoomIdentity, pointer)
    },
    applyZoom(zoom, transitionDuration = this.transitionDuration) {
      const zoomScale = clamp(zoom, this.minZoom, this.maxZoom)
      if (this.spherical) {
        return this.setSphericalZoom(zoomScale, transitionDuration)
      } else {
        return this.setPlanarZoom(zoomScale, transitionDuration)
      }
    },
    setSphericalZoom(zoomScale, transitionDuration) {
      const zoomIdentity = d3.zoomIdentity.scale(zoomScale)
      this.mapTransform = { ...this.mapTransform, k: zoomScale }
      return this.applyZoomIdentity(zoomIdentity, null, transitionDuration)
    },
    setPlanarZoom(zoomScale, transitionDuration) {
      const { height, width } = this.mapRect
      const [x, y] = this.mapProjection(this.mapCenter)
      const [translateX, translateY] = [width / 2 - zoomScale * x, height / 2 - zoomScale * y]
      const zoomIdentity = d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale)
      this.mapTransform = { k: zoomScale, x: translateX, y: translateY }
      return this.applyZoomIdentity(zoomIdentity, null, transitionDuration)
    }
  }
}
</script>

<template>
  <div class="choropleth-map" :class="mapClass" :style="mapStyle" @click="draw">
    <svg class="choropleth-map__main" :viewbox="`0 0 ${mapRect.width} ${mapRect.height}`">
      <pattern id="diagonalHatch" width="1" height="1" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" :fill="featureColorScaleEnd" />
        <line x1="0" y1="0" x2="0" y2="1" :style="{ stroke: featureColorScaleStart, strokeWidth: 1 }" />
      </pattern>
      <g class="choropleth-map__main__tracked" :transform-origin="transformOrigin">
        <g v-if="outline" class="choropleth-map__main__outline"></g>
        <g v-if="graticule" class="choropleth-map__main__graticule"></g>
        <g class="choropleth-map__main__features"></g>
        <slot v-if="isReady" />
      </g>
    </svg>
    <scale-legend
      v-if="!hideLegend && isReady"
      :color-scale-end="featureColorScaleEnd"
      :color-scale-start="featureColorScaleStart"
      :color-scale="featureColorScaleFunction"
      :cursor-value="cursorValue"
      :max="maxValue"
      :min="minValue"
      class="choropleth-map__legend"
    >
      <template #cursor="{ value }">
        <slot name="legend-cursor" v-bind="{ value, identifier: featureCursor }" />
      </template>
    </scale-legend>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/lib';

.choropleth-map {
  --map-scale: 1;
  --map-color: #fff;
  --map-social-color: #000;

  position: relative;

  &__main {
    min-height: var(--map-height, 300px);
    height: 100%;
    width: 100%;
    color: var(--map-color);

    .chart--social-mode & {
      color: var(--map-social-color);
    }

    &:deep(.choropleth-map__main__outline) {
      fill: transparent;
    }

    &:deep(.choropleth-map__main__outline),
    &:deep(.choropleth-map__main__graticule) {
      stroke-width: calc(1px / var(--map-scale, 1));
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
