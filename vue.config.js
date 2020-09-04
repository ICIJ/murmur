const { join } = require('path')
const resolve = filepath => join(__dirname, filepath)
const { ContextReplacementPlugin } = require('webpack')

module.exports = {
  // The app use hashbang routes so we can have relative path in BASE_URL
  publicPath: './',
  lintOnSave: false,
  chainWebpack: config => {
    config.entry('app').clear().add('./docs/main.js')
    config.entry('lib').add('./lib/main.js')
    // Add custom loader
    config.resolveLoader.modules.add('./loaders')
    // Add rule to handle markdown file
    config.module.rule('markdown').test(/\.md$/)
      .use('vue-loader').loader('vue-loader').end()
      .use('markdown-loader')
        .loader('markdown-loader')
        .options({
          sourceDir: resolve('./docs'),
          // Custom markdown parser
          markdown: require('./docs/markdown')
        })
    // Markdown files must be resolved too
    config.resolve.extensions.add('.md')
    // Add a plugin to compile a lightweight of highlight.js
    config
      .plugin('highlight.js')
      .use(ContextReplacementPlugin, [
        /highlight\.js\/lib\/languages$/,
        new RegExp('^./(javascript|python|bash|css|scss)$')
      ])
    // Add loader for i18n custom blocks
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
    // Uses url-loader for SVG
    config.module.rule('svg').uses.clear()
    config.module.rule('svg').use('url-loader').loader('url-loader')
    // Aliases configuration
    config.resolve.alias
      .set('node_modules', resolve('node_modules'))
      .set('@', resolve('lib'))
      .set('@assets', resolve('lib/assets'))
      .set('@styles', resolve('lib/styles'))
      .set('@components', resolve('lib/components'))
      .set('@package', resolve('package.json'))
      .set('$', resolve('docs'))
      .set('$components', resolve('docs/components'))
      .set('$pages', resolve('docs/pages'))
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
