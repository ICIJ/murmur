const { join } = require('path')
const resolve = filepath => join(__dirname, filepath)

module.exports = {
  // The app use hashbang routes so we can have relative path in BASE_URL
  baseUrl: './',
  lintOnSave: false,
  chainWebpack: config => {
    config.entry('app').clear().add('./docs/main.js')
    config.entry('lib').add('./lib/main.js')
    // Aliases configuration
    config.resolve.alias
      .set('node_modules', resolve('node_modules'))
      .set('@', resolve('lib'))
      .set('@assets', resolve('lib/assets'))
      .set('@styles', resolve('lib/styles'))
      .set('@components', resolve('lib/components'))
  }
}
