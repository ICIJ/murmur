import { shallowMount } from '@vue/test-utils'
import GenericHeader from '@/components/GenericHeader.vue'

describe('GenericHeader.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(GenericHeader)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
