import { shallowMount } from '@vue/test-utils'
import ScaleLegend from '@/components/ScaleLegend.vue'

describe('ScaleLegend.vue', () => {
  let wrapper

  beforeEach(() => {
    const propsData = { min: 0, max: 150 }
    wrapper = shallowMount(ScaleLegend, { propsData })
  })

  it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should return 0% for no `cursorValue`', () => {
    expect(wrapper.vm.cursorLeft).toBe('0%')
  })

  it('should return 0% for 0 as `cursorValue`', async () => {
    await wrapper.setProps({ cursorValue: 0 })
    expect(wrapper.vm.cursorLeft).toBe('0%')
  })

  it('should return 100% for 150 as `cursorValue`', async () => {
    await wrapper.setProps({ cursorValue: 150 })
    expect(wrapper.vm.cursorLeft).toBe('100%')
  })

  it('should return have cursor for 150 as `cursorValue`', async () => {
    await wrapper.setProps({ cursorValue: 150 })
    expect(wrapper.vm.hasCursor).toBeTruthy()
  })

  it('should return set a class for 150 as `cursorValue`', async () => {
    await wrapper.setProps({ cursorValue: 150 })
    expect(wrapper.classes('scale-legend--has-cursor')).toBeTruthy()
  })

  it('should not have cursor for null as `cursorValue`', async () => {
    await wrapper.setProps({ cursorValue: null })
    expect(wrapper.vm.hasCursor).toBeFalsy()
  })

  it('should return not set a class for null as `cursorValue`', async () => {
    await wrapper.setProps({ cursorValue: null })
    expect(wrapper.classes('scale-legend--has-cursor')).toBeFalsy()
  })
})
