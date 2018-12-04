const markdown = require('@vuepress/markdown')
const apiTable = require('./api-table')
const sampleCard = require('./sample-card')

module.exports = markdown()
  // Add internal pluggins to vuepress configuration
  .use(...apiTable('api-table'))
  .use(...sampleCard('sample-card'))
  .use(require('markdown-it-highlightjs'))
