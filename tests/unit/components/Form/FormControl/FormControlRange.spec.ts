import { shallowMount } from '@vue/test-utils'

import RangePicker from '@/components/Form/FormControl/FormControlRange.vue'

describe('RangePicker.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: {
        range: [0.2, 0.8]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('correctly initializes data with props', () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: {
        range: [0.2, 0.8]
      }
    })
    expect(wrapper.find('.range-picker__bounds__start').attributes('style')).toContain('left: 20%')
    expect(wrapper.find('.range-picker__bounds__end').attributes('style')).toContain('left: 80%')
  })

  it('sets the correct class based on the variant prop', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [0.1, 0.9], variant: 'secondary' }
    })

    expect(wrapper.classes()).toContain('range-picker--secondary')
  })

  it('sets the rounded class if rounded prop is true', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [0.1, 0.9], rounded: true }
    })

    expect(wrapper.classes()).toContain('range-picker--rounded')
  })

  it('sets the hover class if hover prop is true', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [0.1, 0.9], hover: true }
    })

    expect(wrapper.classes()).toContain('range-picker--hover')
  })

  it('sets the disabled class if value prop is empty', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [] as unknown as [number, number] }
    })

    expect(wrapper.classes()).toContain('range-picker--disabled')
  })

  it('hides the bounds if value prop is empty', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [] as unknown as [number, number] }
    })

    expect(wrapper.find('.range-picker__bounds').isVisible()).toBeFalsy()
  })

  it('does not allow bounds closer than minDistance', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [0.1, 0.11], minDistance: 0.05 }
    })

    // Mock the draggable width so the drag offset below maps to a
    // predictable fraction (7px of 100px = 0.07, past the end(0.11) -
    // minDistance(0.05) = 0.06 threshold, so the drag must be rejected).
    const bounds = wrapper.find('.range-picker__bounds').element as HTMLElement
    bounds.getBoundingClientRect = () => ({ width: 100 }) as DOMRect
    const startHandle = wrapper.find('.range-picker__bounds__start')
    await startHandle.trigger('mousedown', { clientX: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 7 }))
    await wrapper.vm.$nextTick()

    expect(startHandle.attributes('style')).toContain('left: 10%')
    expect(wrapper.emitted('update:range')).toBeUndefined()
  })

  it('snaps value based on snap prop', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [0.1, 0.9], snap: 0.05 }
    })

    // Mock the draggable width so a 12px drag maps to a raw fraction of
    // 0.12, which should snap down to the nearest 0.05 step (0.1).
    const bounds = wrapper.find('.range-picker__bounds').element as HTMLElement
    bounds.getBoundingClientRect = () => ({ width: 100 }) as DOMRect
    const startHandle = wrapper.find('.range-picker__bounds__start')
    await startHandle.trigger('mousedown', { clientX: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 12 }))
    await wrapper.vm.$nextTick()

    expect(startHandle.attributes('style')).toContain('left: 10%')
  })

  it('updates start and end when updating props', async () => {
    const wrapper = shallowMount(RangePicker, {
      propsData: { range: [0.1, 0.9] }
    })

    expect(wrapper.find('.range-picker__bounds__start').attributes('style')).toContain('left: 10%')
    expect(wrapper.find('.range-picker__bounds__end').attributes('style')).toContain('left: 90%')
    await wrapper.setProps({ range: [0.3, 0.7] })
    expect(wrapper.find('.range-picker__bounds__start').attributes('style')).toContain('left: 30%')
    expect(wrapper.find('.range-picker__bounds__end').attributes('style')).toContain('left: 70%')
  })
})
