import { locale, fallbackLocale, default as i18n } from '@root/i18n'
import VueI18n from 'vue-i18n'

describe('i18n.js', () => {
  it('exposes a static method called `install`', () => {
    expect(i18n).toBeInstanceOf(VueI18n)
  })

  it('should use `en` as default locale', () => {
    expect(locale).toBe('en')
  })

  it('should use `en` as default fallback locale', () => {
    expect(fallbackLocale).toBe('en')
  })
})
