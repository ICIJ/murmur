const hljs = require('highlight.js');
const container = require('markdown-it-container')

module.exports = function (name) {
  return [container, name, {
    render (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const lang = tokens[idx].info.slice(name.length + 1).trim() || 'html'
        const code = hljs.highlight(lang, tokens[idx + 1].content)
        return `<sample-card lang="${lang}">\n` +
          `<template slot="code">\n` +
            `<pre><code class="${lang}">${code.value}</code></pre>\n` +
          `</template>\n` +
          `<template>\n` +
            `<div>`;
      } else {
        return `</div></template></sample-card>\n`
      }
    }
  }]
}
