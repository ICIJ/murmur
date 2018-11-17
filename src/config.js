import get from 'lodash/get'
import Symbol from 'es6-symbol'

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

const config = new Config({
  signupFormTracker: 'EXTERNAL',
  signupFormAction: 'https://icij.us15.list-manage.com/subscribe/post?u=0d48a33b1c24d257734cc2a79&id=992ecfdbb2',
  projectName: 'Secret Papers',
  appName: 'Awesome App',
  donateFormIntroduction: `ICIJ’s investigations are supported by readers like you. Help keep our
                          databases free and open to the public by joining our
                          <strong><a target="_blank" href="https://icij.org/donate">ICIJ Insiders</a></strong>
                          community.`
})

export default config;
