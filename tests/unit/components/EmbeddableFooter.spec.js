import { shallowMount } from '@vue/test-utils'
import EmbeddableFooter from '@lib/components/EmbeddableFooter.vue'

describe('EmbeddableFooter.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(EmbeddableFooter)
    expect(wrapper.vm).toBeTruthy()
  })

})
