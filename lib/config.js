import get from 'lodash/get'
import each from 'lodash/each'
import Vue from 'vue'
import defaultValues from './config.default'

// Prefix properties with @ to not clash with Vue "_" prefix for private props
const _VALUES = '@VALUES'
const _SCOPES = '@SCOPES'

export const Config = Vue.extend({
  props: {
    defaultValues: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      [_VALUES]: {},
      [_SCOPES]: {}
    }
  },
  created () {
    this.merge(this.defaultValues)
  },
  methods: {
    merge (values = {}) {
      return each(values, (value, key) => {
        this.set(key, value)
      })
    },
    set (key, value) {
      const levels = key.split('.')
      if (levels.length > 1) {
        this.$set(this[_VALUES], key, this.scope(levels.shift()).set(levels.join('.'), value))
      } else {
        this.$set(this[_VALUES], key, value)
      }
      return value
    },
    get (key, defaultValue) {
      return get(this[_VALUES], key, defaultValue)
    },
    is (key) {
      const value = this.get(key, null)
      switch(value) {
        case 1: return true
        case true: return true
        case '1': return true
        case 'true': return true
        case 0: return false
        case false: return false
        case '0': return false
        case 'false': return false
        default: return !!value
      }
    },
    isnt (key) {
      return !this.is(key)
    },
    scope (name) {
      this.$set(this[_SCOPES], name, get(this.scopes, name, new Config()))
      return this[_SCOPES][name]
    },
  },
  computed: {
    values () {
      return this[_VALUES]
    },
    scopes () {
      return this[_SCOPES]
    }
  }
})

export default new Config({
  propsData: { defaultValues }
})
