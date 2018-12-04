const loaderUtils = require('loader-utils')
const frontmatter = require('front-matter')
const startCase = require('lodash/startCase')
const { dirname, extname } = require('path')

module.exports = function metadataLoader(source) {
  if(this.cacheable) {
    this.cacheable()
  }

  const metadata = {
    title: startCase(dirname(this.resourcePath).split('/').pop())
  }

  if (extname(this.resourcePath) === '.md') {
    Object.assign(metadata, frontmatter(source).attributes)
  }

  return JSON.stringify(metadata)
}
