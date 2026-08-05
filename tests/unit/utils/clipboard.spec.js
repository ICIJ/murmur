import noop from 'lodash/noop'
import Clipboard from 'clipboard'
import { copyText } from '@/utils/clipboard'

vi.mock('clipboard', () => {
  return {
    default: vi.fn().mockImplementation(function () {
      this.on = vi.fn((event, callback) => {
        if (event === 'error') {
          // Simulate the copy failing, asynchronously, like the real library does.
          setTimeout(() => callback({ text: 'uwu' }))
        }
      })
      this.destroy = vi.fn()
    })
  }
})

describe('clipboard.js', () => {
  it('should return a Promise', () => {
    const promise = copyText('uwu').catch(noop)
    expect(promise).toBeInstanceOf(Promise)
  })

  it('should reject the promise with an error containing the copied text', async () => {
    await expect(copyText('uwu')).rejects.toMatchObject({ text: 'uwu' })
    expect(Clipboard).toHaveBeenCalled()
  })
})
