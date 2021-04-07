import { mount } from '@vue/test-utils'
import CustomPagination from '@/components/CustomPagination.vue'

describe('CustomPagination.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(CustomPagination)
    expect(wrapper.vm).toBeTruthy()
  })

  it('expects numberOfPages as a prop', () => {
    const propsData = { numberOfPages: 10 }
    const wrapper = mount(CustomPagination, { propsData })
    expect(wrapper.vm.numberOfPages).toBe(10)
  })

  it('renders the pagination component', () => {
    const propsData = { numberOfPages: 10 }
    const wrapper = mount(CustomPagination, { propsData })
    expect(wrapper.find('#custom-pagination').exists()).toEqual(true)
    expect(wrapper.findAll('.page-item').length).toEqual(9)
  })

  it('emits an `update:current-page` event when a page value is selected', async () => {
    const propsData = { numberOfPages: 10 }
    const wrapper = mount(CustomPagination, { propsData })

    wrapper.vm.emitPageValue(3)

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:current-page')).toBeTruthy()
    expect(wrapper.emitted('update:current-page').length).toBe(2)
    expect(wrapper.emitted('update:current-page')[0]).toEqual([3])
  })


})
