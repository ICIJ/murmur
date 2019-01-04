import { copyText } from '@/utils/clipboard'


describe('clipboard.js', () => {

  it('should return a Promise', () => {
    expect(copyText('uwu')).toBeInstanceOf(Promise)
  })

  it('should reject the promise', async () => {
    try {
      await copyText('uwu')
    } catch(error) {
      expect(error.text).toBe('uwu')
    }
  })
})
