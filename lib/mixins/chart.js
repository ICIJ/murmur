import get from 'lodash/get'
import max from 'lodash/max'
import some from 'lodash/some'

export default {
  props: {
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
  mounted () {
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
      mounted: false
    }
  },
  methods: {
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
