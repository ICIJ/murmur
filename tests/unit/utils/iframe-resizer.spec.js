import IframeResizer from '@/utils/iframe-resizer'

describe('iframe-resizer.js', () => {

  it('should define a `create` static method', () => {
    expect(IframeResizer.create).toBeDefined()
  })

  it('should define a `template` static method', () => {
    expect(IframeResizer.template).toBeDefined()
  })

  it('should define a `deletePymParams` static method', () => {
    expect(IframeResizer.deletePymParams).toBeDefined()
  })

  it('should define a `isEmbedded` static method', () => {
    expect(IframeResizer.isEmbedded).toBeDefined()
  })

})
