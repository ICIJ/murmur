import Murmur from '@/main'

describe('main.js', () => {
  it('exposes a static method called `install`', () => {
    expect(Murmur.install).toBeDefined()
  })

  it('exposes a static method called `setLocaleMessage`', () => {
    expect(Murmur.setLocaleMessage).toBeDefined()
  })

  it('exposes a static method called `mergeLocaleMessage`', () => {
    expect(Murmur.mergeLocaleMessage).toBeDefined()
  })

  it('exposes a static method called `setLocale`', () => {
    expect(Murmur.setLocale).toBeDefined()
  })

  it('exposes a static method called `getLocale`', () => {
    expect(Murmur.getLocale).toBeDefined()
  })
})
