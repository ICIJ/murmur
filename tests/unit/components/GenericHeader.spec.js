import { shallowMount } from '@vue/test-utils'
import GenericHeader from '@root/components/GenericHeader.vue'

describe('GenericHeader.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(GenericHeader)
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders the header as a `headroom` component', () => {
    const wrapper = shallowMount(GenericHeader)
    expect(wrapper.find('#generic-header').vm.$options.name).toBe('vueHeadroom')
  })

  it('renders the header as a div', () => {
    const noHeadroom = true
    const wrapper = shallowMount(GenericHeader, {
      propsData: { noHeadroom }
    })
    expect(wrapper.find('#generic-header').element.tagName).toBe('DIV')
  })

  it('sets the header position to `fixed` by default', () => {
    const wrapper = shallowMount(GenericHeader)
    expect(wrapper.find('#generic-header').element.style.position).toBe('fixed')
  })

  it('sets the header position to `relative`', () => {
    const position = 'relative'
    const wrapper = shallowMount(GenericHeader, {
      propsData: { position }
    })
    expect(wrapper.find('#generic-header').element.style.position).toBe(position)
  })

  it('sets the header position to `absolute`', () => {
    const position = 'absolute'
    const wrapper = shallowMount(GenericHeader, {
      propsData: { position }
    })
    expect(wrapper.find('#generic-header').element.style.position).toBe(position)
  })

  it('renders home link to the default value', () => {
    const homeUrl = "http://localhost/"
    const wrapper = shallowMount(GenericHeader)
    expect(wrapper.find('.generic-header__brand').element.href).toBe(homeUrl)
  })

  it('renders home link to https://icij.org/', () => {
    const homeUrl = 'https://icij.org/'
    const wrapper = shallowMount(GenericHeader, {
      propsData: { homeUrl }
    })
    expect(wrapper.find('.generic-header__brand').element.href).toBe(homeUrl)
  })

  it('renders home link to https://pirhoo.com/', () => {
    const homeUrl = 'https://pirhoo.com/'
    const wrapper = shallowMount(GenericHeader, {
      propsData: { homeUrl }
    })
    expect(wrapper.find('.generic-header__brand').element.href).toBe(homeUrl)
  })

  it('renders the navbar as `collapse` by default', () => {
    const wrapper = shallowMount(GenericHeader)
    expect(wrapper.find('.navbar-collapse').classes('collapse')).toBeTruthy()
  })

  it('toggles the navbar', async () => {
    const wrapper = shallowMount(GenericHeader)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.navbar-collapse').classes('collapse')).toBeTruthy()
    wrapper.vm.toggleNavbar()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.navbar-collapse').classes('collapse')).toBeFalsy()
    wrapper.vm.toggleNavbar()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.navbar-collapse').classes('collapse')).toBeTruthy()
  })

  it('should change `showFollowUsPopover` to `true`', () => {
    const wrapper = shallowMount(GenericHeader)
    wrapper.setData({ showFollowUsPopover: true })
    wrapper.vm.closeFollowUsPopover()
    expect(wrapper.vm.showFollowUsPopover).toBeFalsy()
  })
})
