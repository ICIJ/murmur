import { mount } from '@vue/test-utils'
import SlideUpDown from '@/components/SlideUpDown'

describe('SlideUpDown', () => {

  it('is a Vue instance', () => {
    const wrapper = mount(SlideUpDown)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders the component as a `div` by default', () => {
    const wrapper = mount(SlideUpDown)
    expect(wrapper.element.nodeName).toBe('DIV')
  })

  it('renders the component as a `span` when props.tag is passed', () => {
    const tag = 'SPAN'
    const wrapper = mount(SlideUpDown, {
      propsData: { tag }
    })
    expect(wrapper.element.nodeName).toBe(tag)
  })

  it('is visible by default', () => {
    const wrapper = mount(SlideUpDown)
    expect(wrapper.element.style.height).toBe('auto')
  })

  it('isn\t visible if props.active is passed as `false`', () => {
    const active = false
    const wrapper = mount(SlideUpDown, {
      propsData: { active }
    })
    wrapper.vm.mounted = true
    expect(wrapper.element.style.height).toBe('0px')
  })

  it('calls `cleanLayout` after the transition', (done) => {
    const wrapper = mount(SlideUpDown)
    wrapper.vm.cleanLayout = jest.fn()
    expect(wrapper.vm.cleanLayout.mock.calls.length).toBe(0)
    wrapper.vm.active = false
    setTimeout(() => {
      expect(wrapper.vm.cleanLayout.mock.calls.length).toBe(1)
      done()
    }, wrapper.vm.duration)
  })
})
