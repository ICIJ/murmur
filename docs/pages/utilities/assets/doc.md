Some components like `textured-deck` need to load images from the assets folder. Those images are bundle with Murmur and are available throught the NPM package. Therefore, some configuration might be need to see the images.

## Vue CLI 

To make those images available in Vue CLI, you must modify your Webpack configure to add a dedicated loader:

```js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    // Register a "murmur" rule to load images from the Murmur's package.
    // To be loaded, images must be required in the entry point, for instance:
    // require.context('@icij/murmur/dist/lib/img/', true)
    config.module
      .rule('murmur')
      .test(/\.(png|jpe?g|gif|svg|ico)$/)
      .include
        .add(path.resolve(__dirname, './node_modules/@icij/murmur'))
        .end()
      .use('file-loader')
        .loader('file-loader')
        .options({
          limit: 4096,
          outputPath: 'js/img/',
          name: `[name].[ext]`,
        })
  }
}
```

Then, somewhere in your application (for instance, the entry file), you must require all images so they are bundles with the rest of your application:

```js
// Autoload images from Murmur
require.context('@icij/murmur/dist/lib/img/', true)
```

Et voilà! Your are now able to see images from Murmur!

## Webpack

For a more traditional installation of Webpack, you might as well need to install a proper loader for those images:

```js
let webpackConfig = {
  // ...
  output: {
    filename: `scripts/[name].js`,
  },
  module: {
    rules: [
      // Other loaders here
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        include: config.paths.murmur,
        loader: 'file-loader',
        options: {
          limit: 4096,
          outputPath: 'scripts/img/',
          name: `[name].[ext]`,
        },
      },
    ]
  }
};
```

And then again, from your entry file require all images (as shown above).
