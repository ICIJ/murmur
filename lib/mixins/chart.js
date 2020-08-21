import * as d3 from 'd3'
import { get, isString, isObject, max, some } from 'lodash'
import { isUrl } from '../utils/strings'


export default {
  props: {
    /**
     * A data collection for the chart. Can be a data object or an URL.
     */
    data: {
      type: [Array, String],
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
     * Default chart's height ratio
     */
    chartHeightRatio: {
      type: Number
    },
    /**
     * If true, the chart will be display on social mode
     */
    socialMode: {
      type: Boolean
    }
  },
  async mounted () {
    await this.loadData()
    // Windows resize is not reactive
    window.addEventListener('resize', this.setNarrowWidth)
    this.setNarrowWidth()
    this.$nextTick(() => this.mounted = true)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setNarrowWidth)
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
  methods: {
    async loadData () {
      if (isString(this.data)) {
        this.loadedData = await this.dataLoader(this.data)
      } else {
        this.loadedData = this.data
      }
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
      return this.chartHeightRatio || (this.socialMode ? (5/4) : (9/16))
    },
    dataHasHighlights () {
      return some(this.data, d => d.highlight)
    }
  }
}
