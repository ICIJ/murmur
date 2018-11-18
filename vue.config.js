const { join } = require('path')
const resolve = filepath => join(__dirname, filepath)


module.exports = {
  // The app use hashbang routes so we can have relative path in BASE_URL
  baseUrl: './',
  lintOnSave: false,
  chainWebpack: config => {
    config.entry('app').clear().add('./docs/main.js')
    config.entry('lib').add('./src/main.js')
    // Aliases configuration
    config.resolve.alias
      .set('node_modules', resolve('node_modules'))
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@styles', resolve('src/styles'))
      .set('@components', resolve('src/components'))
  }
}
