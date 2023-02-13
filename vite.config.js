import { resolve  } from 'path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue2'

import markdownPlugin from 'vite-plugin-md'
import markdownItHighlightJs from 'markdown-it-highlightjs'
import markdownItApiTablePlugin from './plugins/markdown-it/api-table.js'
import markdownItSampleCardPlugin from './plugins/markdown-it/sample-card.js'

import docsPlugin from './plugins/docs.ts'
import frontMatterPlugin from './plugins/front-matter.ts'
import highlightPlugin from './plugins/highlight.ts'
import sassVarsPlugin from './plugins/sass-vars.ts'
import vueDocgenPlugin from './plugins/vue-docgen.ts'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  test: {
    globals: true,
    reporter: 'basic',
    environment: 'jsdom',
    setupFiles: [ resolve(__dirname, 'tests/unit/setup.js') ]
  },
  build: {
    target: 'es2015',
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: '@icij/murmur',
      fileName: 'lib/murmur'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'lib/murmur.css'
          }
          return assetInfo.name
        },
      },
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9009
  },
  plugins: [
    vuePlugin({ 
      include: [/\.vue$/, /\.md$/]
    }),
    markdownPlugin({
      vueVersion: '2.7.14',
      escapeCodeTagInterpolation: false,
      markdownItOptions: {
        html: true,
        xhtmlOut: false,
        linkify: false,
        typographer: false
      },
      markdownItSetup(md) {
        md.use(...markdownItApiTablePlugin())
        md.use(...markdownItSampleCardPlugin())
        md.use(markdownItHighlightJs)
      },
    }),
    docsPlugin(),
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
    }
  }
})