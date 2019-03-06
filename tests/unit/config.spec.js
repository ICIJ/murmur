import { default as config, Config } from '@/config'

describe('config.js', () => {

  it('should be an instance of `Config`', () => {
    expect(config).toBeInstanceOf(Config)
  })

  it('should define a scope named `foo`', () => {
    config.set('foo.bar', 'uwu')
    expect(config.scope('foo')).toBeInstanceOf(Config)
    expect(config.scope('foo').get('bar')).toBe('uwu')
  })

  it('should define two scopes named `foo` and `bar`', () => {
    config.set('foo.bar', 'uwu')
    config.set('bar.foo', 'owo')
    expect(config.scope('foo').get('bar')).toBe('uwu')
    expect(config.scope('bar').get('foo')).toBe('owo')
    expect(config.scopes.foo).toBeDefined()
    expect(config.scopes.bar).toBeDefined()
  })

  it('should define two values named `foo` and `bar`', () => {
    config.set('foo', 'uwu')
    config.set('bar', 'owo')
    expect(config.values.foo).toBeDefined()
    expect(config.values.bar).toBeDefined()
  })

  it('should merge the given object with the config', () => {
    config.set('foo', 'erased')
    config.merge({ 'foo': 'foo', 'bar': 'bar' })
    expect(config.get('foo')).toBe('foo')
    expect(config.get('bar')).toBe('bar')
  })

  it('should merge the given object and its scopes with the config', () => {
    config.merge({ 'foo.bar': 'foobar' } )
    expect(config.scope('foo').get('bar')).toBe('foobar')
    config.merge({ 'bar.foo': 'barfoo' })
    expect(config.scope('bar').get('foo')).toBe('barfoo')
  })
})
