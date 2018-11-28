import $ from 'jquery'

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
  watch: {
    active (toggler) {
      this.slide(toggler)
    }
  },
  render (h) {
    return h(this.tag, { ref: 'container' }, this.$slots.default)
  },
  mounted () {
    this.slide(this.active, 0)
  },
  methods: {
    slide (toggler, duration = this.duration) {
      if(toggler) {
        $(this.$el).slideDown(duration)
      } else {
        $(this.$el).slideUp(duration)
      }
    }
  }
}
