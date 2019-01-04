import { mount } from '@vue/test-utils'
import SlideUpDown from '@/components/SlideUpDown'

describe('SlideUpDown', () => {

  it('is a Vue instance', () => {
    const wrapper = mount(SlideUpDown)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
