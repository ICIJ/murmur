import { shallowMount } from '@vue/test-utils'
import ImddbHeader from '@/components/ImddbHeader.vue'

describe('ImddbHeader.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(ImddbHeader)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
