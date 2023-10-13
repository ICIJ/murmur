import { shallowMount, Wrapper } from '@vue/test-utils'

import RangePicker from '@/components/RangePicker'

describe('RangePicker.vue', () => {
  let wrapper: Wrapper

  // This runs before each test below
  beforeEach(() => {
    wrapper = shallowMount(RangePicker, {
      propsData: {
        value: [0.2, 0.8]
      }
    })
  })

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('correctly initializes data with props', () => {
    expect(wrapper.vm.start).toBe(0.2)
    expect(wrapper.vm.end).toBe(0.8)
  })

  it('sets the correct class based on the variant prop', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { value: [0.1, 0.9], variant: 'secondary' }
    })

    expect(wrapper.classes()).toContain('range-picker--secondary')
  })

  it('sets the rounded class if rounded prop is true', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { value: [0.1, 0.9], rounded: true }
    })

    expect(wrapper.classes()).toContain('range-picker--rounded')
  })

  it('sets the hover class if hover prop is true', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { value: [0.1, 0.9], hover: true }
    })

    expect(wrapper.classes()).toContain('range-picker--hover')
  })

  it('does not allow bounds closer than minDistance', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { value: [0.1, 0.11], minDistance: 0.05 }
    })

    wrapper.vm.dragStartBound(0.06)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.start).not.toBe(0.06)
  })

  it('snaps value based on snap prop', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { value: [0.1, 0.9], snap: 0.05 }
    })

    wrapper.vm.dragStartBound(0.12)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.start).toBe(0.10)
  })
})
