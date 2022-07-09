Object.defineProperty(document, 'fonts', {
  value: { ready: Promise.resolve({}) },
})
