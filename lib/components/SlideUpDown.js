export default {
  name: 'SlideUpDown',
  props: {
    active: {
      type: Boolean,
    },
    duration: {
      type: Number,
      default: 200
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      state: 'pre',
      mounted: false,
      scrollHeight: 0
    }
  },
  watch: {
    active (toggler) {
      this.triggerSlide()
    }
  },
  render (h) {
    return h(this.tag, { style: this.style, ref: 'container' }, this.$slots.default)
  },
  mounted () {
    this.$el.addEventListener("transitionend", this.cleanLayout)
    this.triggerSlide()
    this.$nextTick(() => {
      this.mounted = true
      this.cleanLayout()
    })
  },
  computed: {
    stylePreTransition () {
      return {
        'overflow': 'hidden',
        'transition-property': 'height',
        'transition-duration':  `${this.duration}ms`,
        'height': this.mounted ?  `${this.$container.scrollHeight}px` : 'auto',
      }
    },
    styleActiveTransition () {
      return {
        'overflow': 'hidden',
        'transition-property': 'height',
        'transition-duration':  `${this.duration}ms`,
        'height': this.mounted ?  `${this.activeHeight}px` : 'auto',
      }
    },
    stylePostTransition () {
      // Reset style when the element is active
      return this.active ? { } : this.styleActiveTransition
    },
    style () {
      switch (this.state) {
        case 'pre': return this.stylePreTransition
        case 'active': return this.styleActiveTransition
        case 'post': return this.stylePostTransition
        default: return {}
      }
    },
    activeHeight () {
      return this.active ? this.$container.scrollHeight : 0
    },
    $container () {
      return this.$refs.container
    }
  },
  methods: {
    triggerSlide () {
      this.state = 'pre'
      this.scrollHeight = this.$container.scrollHeight
      // Defered next tick to let the component render once
      this.deferedNextTick(() => this.state = 'active')
    },
    cleanLayout () {
      this.state = 'post'
      this.$nextTick()
    },
    deferedNextTick (fn) {
      setTimeout(() => this.$nextTick(fn), 0)
    },
  }
}
