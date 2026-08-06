import { mount } from '@vue/test-utils'
import TinyPagination from '@/components/Pagination/PaginationTiny.vue'

describe('TinyPagination.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TinyPagination)
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders the pagination component', () => {
    const wrapper = mount(TinyPagination)
    expect(wrapper.find('.tiny-pagination').exists()).toEqual(true)
  })

  it('expects totalRows, perPage, value as props', () => {
    const propsData = { totalRows: 200, perPage: 20, modelValue: 2 }
    const wrapper = mount(TinyPagination, { propsData })
    expect(wrapper.vm.totalRows).toBe(200)
    expect(wrapper.vm.perPage).toBe(20)
    expect(wrapper.vm.modelValue).toBe(2)
  })

  it('calculates numberOfPages based on the totalRows and perPage prop values', () => {
    const propsData = { totalRows: 200, perPage: 20 }
    const wrapper = mount(TinyPagination, { propsData })
    expect(wrapper.vm.numberOfPages).toBe(10)
  })

  it('emits an event on form submit with the currentPageInput', async () => {
    const propsData = { totalRows: 200, perPage: 20 }
    const wrapper = mount(TinyPagination, { propsData })
    await wrapper.find('.tiny-pagination__form__input--item').setValue(3)
    await wrapper.find('.tiny-pagination__form').trigger('submit')
    expect(wrapper.emitted('update:modelValue')![0]).toContain(3)
  })

  it('does not emit an event if the currentPageInput is invalid', async () => {
    const propsData = { totalRows: 200, perPage: 20 }
    const wrapper = mount(TinyPagination, { propsData })
    // A number input sanitizes a non-numeric value down to an empty string
    // before it ever reaches v-model, which is exactly the case this guards.
    await wrapper.find('.tiny-pagination__form__input--item').setValue('azrazzer')
    await wrapper.find('.tiny-pagination__form').trigger('submit')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
