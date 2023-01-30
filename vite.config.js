import { resolve  } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin as vuePlugin } from 'vite-plugin-vue2'

import markdownPlugin from 'vite-plugin-md'
import markdownItHighlightJs from 'markdown-it-highlightjs'
import markdownItApiTablePlugin from './plugins/markdown-it/api-table.js'
import markdownItSampleCardPlugin from './plugins/markdown-it/sample-card.js'

import highlightPlugin from './plugins/highlight.ts'
import frontMatterPlugin from './plugins/front-matter.ts'
import sassVarsPlugin from './plugins/sass-vars.ts'
import vueDocgenPlugin from './plugins/vue-docgen.ts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vuePlugin({ include: [/\.vue$/, /\.md$/] }),
    markdownPlugin({
      markdownItSetup(md) {
        md.use(...markdownItApiTablePlugin())
        md.use(...markdownItSampleCardPlugin())
        md.use(markdownItHighlightJs)
      },
    }),
    highlightPlugin(),
    frontMatterPlugin(),
    sassVarsPlugin(),
    vueDocgenPlugin()
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      'node_modules': resolve(__dirname, 'node_modules'),
      '@assets': resolve(__dirname, 'lib/assets'),
      '@components': resolve(__dirname, 'lib/components'),
      '@locales': resolve(__dirname, 'lib/locales'),
      '@package': resolve(__dirname, 'package.json'),
      '@styles': resolve(__dirname, 'lib/styles'),
      "@root": resolve(__dirname, "./lib"),
      '$root': resolve(__dirname, 'docs'),
      '$components': resolve(__dirname, 'docs/components'),
      '$pages': resolve(__dirname, 'docs/pages'),
    },
  }
})