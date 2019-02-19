import get from 'lodash/get'
import each from 'lodash/each'
import defaultValues from './config.default'

const _VALUES = typeof Symbol === 'function' ? Symbol('values') : '_VALUES'
const _SCOPES = typeof Symbol === 'function' ? Symbol('scopes') : '_SCOPES'

export class Config {
  constructor (values = {}) {
    this[_VALUES] = {}
    each(values, (value, key) => this.set(key, value))
    return this;
  }
  set (key, value) {
    const levels = key.split('.')
    if (levels.length > 1) {
      this[_VALUES][key] = this.scope(levels.shift()).set(levels.join('.'), value)
    } else {
      this[_VALUES][key] = value
    }
    return value
  }
  get (key, defaultValue) {
    return get(this[_VALUES], key, defaultValue)
  }
  scope (name) {
    this.scopes[name] = get(this.scopes, name, new Config())
    return this.scopes[name]
  }
  get values () {
    return this[_VALUES]
  }
  get scopes () {
    this[_SCOPES] = get(this, _SCOPES, {})
    return this[_SCOPES]
  }
}

export default new Config(defaultValues)
