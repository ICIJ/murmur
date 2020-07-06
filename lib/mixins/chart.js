import get from 'lodash/get'

export default {
  props: {
    chartHeightRatio: {
      type: Number
    },
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
    setNarrowWidth () {
      this.narrowWidth = get(this, '$el.offsetWidth', 540) < 540
    },
    xAxisYearFormat (year) {
      return this.narrowWidth ? "’" + String(year).slice(2,4) : year
    }
  },
  computed: {
    baseHeightRatio () {
      return this.chartHeightRatio || (this.socialMode ? 0.5 : 0.6)
    }
  }
}
