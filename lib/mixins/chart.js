import * as d3 from 'd3'
import { get, isString, max, some } from 'lodash'

export default {
  props: {
    /**
     * A data collection for the chart. Can be a data object or an URL.
     */
    data: {
      type: [Array, String],
      default: () => ([])
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
        this.loadedData = await d3.json(this.data)
      } else {
        this.loadedData = this.data
      }
    },
    elementsMaxBBox ({ selector = 'text', defaultWidth = null, defaultHeight = null } = { }) {
      if (!this.mounted) {
        return { width: defaultWidth, height: defaultHeight }
      }
      const elements = this.$el.querySelectorAll(selector)
      const width = max([...elements].map(l => l.getBBox().width))
      const height = max([...elements].map(l => l.getBBox().height))
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
    baseHeightRatio () {
      return this.chartHeightRatio || (this.socialMode ? (5/4) : (9/16))
    },
    dataHasHighlights () {
      return some(this.data, d => d.highlight)
    }
  }
}
