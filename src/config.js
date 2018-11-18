import get from 'lodash/get'
import Symbol from 'es6-symbol'
import defaultValues from './config.default'

const _VALUES = Symbol('values')

class Config {
  constructor (values) {
    this[_VALUES] = Object.assign({}, values)
    return this;
  }
  set (key, value) {
    this[_VALUES][key] = value
    return value
  }
  get (key, defaultValue) {
    return get(this[_VALUES], key, defaultValue)
  }
}

const config = new Config(defaultValues)

export default config;
