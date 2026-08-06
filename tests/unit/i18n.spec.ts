import { locale, fallbackLocale, i18n } from '@/i18n'

describe('i18n.js', () => {
  it('exposes a static method called install', () => {
    expect(i18n.install).toBeTypeOf('function')
  })

  it('should use `en` as default locale', () => {
    expect(locale).toBe('en')
  })

  it('should use `en` as default fallback locale', () => {
    expect(fallbackLocale).toBe('en')
  })
})
