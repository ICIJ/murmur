import * as d3 from 'd3'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import max from 'lodash/max'
import some from 'lodash/some'
import ResizeObserver from 'resize-observer-polyfill'
import { isUrl } from '../utils/strings'

export default {
  props: {
    /**
     * A data collection for the chart. Can be a data object or an URL.
     */
    data: {
      type: [Array, String, Object],
      default: () => ([]),
      validator (value) {
        return isObject(value) || isString(value) && isUrl(value)
      }
    },
    /**
     * Format of the data to load.
     */
    dataUrlType: {
      type: String,
      default: 'json',
      validator (value) {
        return ['json', 'csv', 'tsv'].indexOf(value) > -1
      }
    },
    /**
     * When appliable, default chart's height ratio
     */
    chartHeightRatio: {
      type: Number
    },
    /**
     * If true, the chart will be display on social mode
     */
    socialMode: {
      type: Boolean
    },
    /**
     * Ratio to use in social mode
     */
    socialModeRatio: {
      type: Number,
      default: 5 / 4
    }
  },
  resizeObserver: null,
  async mounted () {
    this.$options.resizeObserver = new ResizeObserver(this.resized)
    await this.$nextTick()
    await this.loadData()
    this.$options.resizeObserver.observe(this.$el)
    this.mounted = true
  },
  beforeDestroy () {
    this.$options.resizeObserver.unobserve(this.$el)
    this.$options.resizeObserver = null
  },
  data () {
    return {
      narrowWidth: false,
      mounted: false,
      loadedData: null
    }
  },
  watch: {
    data () {
      return this.loadData()
    }
  },
  filters: {
    d3Formatter (value, formatter) {
      if (isFunction(formatter)) {
        return formatter(value)
      } else if (isString(formatter)) {
        return d3.format(formatter)(value)
      }
      return value
    }
  },
  methods: {
    resized () {
      this.setNarrowWidth()
      this.$emit('resized')
    },
    async loadData () {
      if (isString(this.data)) {
        this.loadedData = await this.dataLoader(this.data)
      } else {
        this.loadedData = this.data
      }
      this.$emit('loaded', this.loadedData)
    },
    elementsMaxBBox ({ selector = 'text', defaultWidth = null, defaultHeight = null } =  { }) {
      const elements = this.mounted ? this.$el.querySelectorAll(selector) : []
      if (!elements.length) {
        return { width: defaultWidth, height: defaultHeight }
      }
      const width = max([...elements].map(l => {
        return l.getBBox ? l.getBBox().width : defaultWidth
      }))
      const height = max([...elements].map(l => {
        return l.getBBox ? l.getBBox().height : defaultHeight
      }))
      return { width, height }
    },
    setNarrowWidth () {
      this.narrowWidth = get(this, '$el.offsetWidth', 540) < 540
    },
    xAxisYearFormat (year) {
      return this.narrowWidth ? "’" + String(year).slice(2,4) : year
    }
  },
  computed: {
    dataLoader () {
      return d3[this.dataUrlType]
    },
    baseHeightRatio () {
      return this.chartHeightRatio || (this.socialMode ? this.socialModeRatio : (9/16))
    },
    dataHasHighlights () {
      return some(this.data, d => d.highlight)
    }
  }
}
