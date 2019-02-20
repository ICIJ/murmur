import { mount } from '@vue/test-utils'

import SharingOptionsLink from '@/components/SharingOptionsLink'
import { $popup, $interval } from '@/components/SharingOptionsLink'

function mockPopupParent () {
  return {
    open: jest.fn().mockImplementation(() => {
      return { 
        focus: jest.fn(),
        close: jest.fn()
      }
    })
  }
}

jest.useFakeTimers()

describe('SharingOptionsLink', () => {

  const propsData = { network: 'twitter' }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should be a Vue instance', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should raise a console.error for an invalid prop', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null)
    const wrapper = mount(SharingOptionsLink, { network: 'foo' })
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "network"'))
  })

  it('should give a different `base` for Twitter', () => {
    const propsData = { network: 'twitter' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.base).toBe('https://twitter.com/intent/tweet?')
  })

  it('should give a different `base` for Facebook', () => {
    const propsData = { network: 'facebook' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.base).toBe('https://www.facebook.com/sharer.php?')
  })

  it('should give a different `base` for Linkedin', () => {
    const propsData = { network: 'linkedin' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.base).toBe('https://www.linkedin.com/shareArticle?mini=true&')
  })

  it('should have a popup', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.hasPopup()).toBeTruthy()
  })

  it('shouldn\'t have a popup when network is `email`', () => {
    const propsData = { network: 'email' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.hasPopup()).toBeFalsy()
  })

  it('should create a query with the correct `url` param', () => {
    const propsData = { network: 'twitter', url: 'https://icij.org' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.url).toBe(propsData.url)
  })

  it('should create a query with the correct `u` param', () => {
    const propsData = { network: 'facebook', url: 'https://icij.org' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.u).toBe(propsData.url)
  })

  it('should create a query with the correct `text` param', () => {
    const propsData = { network: 'twitter', title: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.text).toBe(propsData.title)
  })

  it('should create a query with the correct `title` param', () => {
    const propsData = { network: 'facebook', title: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.title).toBe(propsData.title)
  })

  it('should create a query with the correct `summary` param', () => {
    const propsData = { network: 'linkedin', description: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.summary).toBe(propsData.description)
  })

  it('should have correct `args` for Twitter', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.args).toHaveProperty('url')
    expect(wrapper.vm.args).toHaveProperty('text')
    expect(wrapper.vm.args).toHaveProperty('via')
    expect(wrapper.vm.args).toHaveProperty('hashtags')
  })

  it('should have correct `args` for Facebook', () => {
    const propsData = { network: 'facebook' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.args).toHaveProperty('u')
    expect(wrapper.vm.args).toHaveProperty('title')
    expect(wrapper.vm.args).toHaveProperty('description')
    expect(wrapper.vm.args).toHaveProperty('hashtag')
  })

  it('should create open a popup when clicking on the component', () => {
    const propsData = { network: 'twitter', title: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    // Create two spies that must be called when clicking
    const spyOpenPopup = jest.spyOn(wrapper.vm, 'openPopup').mockImplementation(() => null)
    const spyCleanExistingPopup = jest.spyOn(wrapper.vm, 'cleanExistingPopupInstance').mockImplementation(() => null)
    wrapper.trigger('click')
    expect(spyOpenPopup).toBeCalled()
    expect(spyCleanExistingPopup).toBeCalled()
  })

  it('should clear the interval and close existing popup when clicking on the component', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    $popup.instance = { close: jest.fn(), focus: jest.fn() }
    $popup.interval = setInterval(() => null)
    wrapper.vm.cleanExistingPopupInstance()
    expect($popup.interval).toBe(null)
    expect($popup.instance.close).toBeCalled()
  })

  it('should share popup between components', () => {
    $popup.instance = { close: jest.fn(), focus: jest.fn() }
    $popup.interval = setInterval(() => null)
    const wrapperA = mount(SharingOptionsLink, { propsData })
    const wrapperB = mount(SharingOptionsLink, { propsData })
    wrapperA.vm.cleanExistingPopupInstance()
    expect($popup.interval).toBe(null)
    expect($popup.instance.close).toBeCalled()
    wrapperB.vm.cleanExistingPopupInstance()
    expect($popup.interval).toBe(null)
    expect($popup.instance.close).toBeCalled()
  })

  it('should open a popup wgen clicking on the component', () => {
    // Return a fake popup instance
    $popup.parent = mockPopupParent()
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect($popup.parent.open).not.toBeCalled()
    wrapper.trigger('click')
    expect($popup.parent.open).toBeCalled()
  })

  it('should clear the popup instance once it been closed', () => {
    // Return a fake popup instance
    $popup.parent = mockPopupParent()
    const wrapper = mount(SharingOptionsLink, { propsData })
    wrapper.vm.cleanExistingPopupInstance()
    wrapper.trigger('click')
    expect($popup.instance).not.toBe(null)
    expect($popup.interval).not.toBe(null)
    // Close the popup
    $popup.instance.closed = true
    // Wait for the interval to be called
    jest.advanceTimersByTime(1000)
    // And check again!
    expect($popup.instance).toBe(null)
    expect($popup.interval).toBe(null)
  })

})
