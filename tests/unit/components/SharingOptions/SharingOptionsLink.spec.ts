import { mount } from '@vue/test-utils'

import SharingOptionsLink from '@/components/SharingOptions/SharingOptionsLink.vue'
import type { SharingOptionsLinkProps } from '@/components/SharingOptions/SharingOptionsLink.vue'
import { $popup, networks } from '@/composables/useSharingOptionsLink'
import { SharingPlatform } from '@/enums'

// These mocks only need to satisfy `$popup`'s call sites (open/focus/close)
function mockPopupParent() {
  return {
    open: vi.fn().mockImplementation(() => {
      return {
        focus: vi.fn(),
        close: vi.fn()
      } as unknown as Window
    })
  } as unknown as Window & typeof globalThis
}

vi.useFakeTimers()

describe('SharingOptionsLink', () => {
  const propsData: Pick<SharingOptionsLinkProps, 'network'> = { network: SharingPlatform.bluesky }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should be a Vue instance', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should generate the component with `a` tag', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.element.tagName).toBe('A')
  })

  it('should generate the component with `button` tag', () => {
    const propsData = { network: SharingPlatform.bluesky, tag: 'button' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('should validate prop against platforms names', () => {
    // In script setup, props validators aren't accessible, so we validate against networks keys
    const validNetworks = Object.keys(networks)
    expect(validNetworks.includes('foo')).toBe(false)
    expect(validNetworks.includes('email')).toBe(true)
  })

  it('should give a different `base` for Bluesky', () => {
    const propsData = { network: SharingPlatform.bluesky }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.base).toBe('https://bsky.app/intent/compose?')
  })

  it('should give a different `base` for Facebook', () => {
    const propsData = { network: SharingPlatform.facebook }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.base).toBe('https://www.facebook.com/sharer.php?')
  })

  it('should give a different `base` for Linkedin', () => {
    const propsData = { network: SharingPlatform.linkedin }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.base).toBe('https://www.linkedin.com/sharing/share-offsite/?')
  })

  it('should have a popup', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.hasPopup()).toBeTruthy()
  })

  it('shouldn\'t have a popup when network is `email`', () => {
    const propsData = { network: SharingPlatform.email }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.hasPopup()).toBeFalsy()
  })

  it('should create a query with the correct `url` param', () => {
    const propsData = { network: SharingPlatform.bluesky, url: 'https://icij.org' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.url).toBe(propsData.url)
  })

  it('should create a query with the correct `u` param', () => {
    const propsData = { network: SharingPlatform.facebook, url: 'https://icij.org' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.u).toBe(propsData.url)
  })

  it('should create a query with the correct `text` param', () => {
    const propsData = { network: SharingPlatform.bluesky, title: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.text).toBe(propsData.title)
  })

  it('should create a query with the correct `title` param', () => {
    const propsData = { network: SharingPlatform.facebook, title: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.title).toBe(propsData.title)
  })

  it('should create a query with the correct `summary` param', () => {
    const propsData = { network: SharingPlatform.linkedin, description: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.query.summary).toBe(propsData.description)
  })

  it('should have correct `args` for Bluesky', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.args).toHaveProperty('text')
    expect(wrapper.vm.args).toHaveProperty('url')
  })

  it('should have correct `args` for Facebook', () => {
    const propsData = { network: SharingPlatform.facebook }
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect(wrapper.vm.args).toHaveProperty('u')
    expect(wrapper.vm.args).toHaveProperty('title')
    expect(wrapper.vm.args).toHaveProperty('description')
    expect(wrapper.vm.args).toHaveProperty('hashtag')
  })

  it('should create open a popup when clicking on the component', async () => {
    // Return a fake popup instance to prevent jsdom error
    $popup.parent = mockPopupParent()
    const propsData = { network: SharingPlatform.bluesky, title: 'Foo' }
    const wrapper = mount(SharingOptionsLink, { propsData })
    await wrapper.trigger('click')
    // Verify that the popup parent's open method was called
    expect($popup.parent.open).toBeCalled()
  })

  it('should clear the interval and close existing popup when clicking on the component', () => {
    const wrapper = mount(SharingOptionsLink, { propsData })
    // Same minimal-mock reasoning as mockPopupParent(): only close/focus are exercised.
    $popup.instance = { close: vi.fn(), focus: vi.fn() } as unknown as Window
    $popup.interval = setInterval(() => null)
    wrapper.vm.cleanExistingPopupInstance()
    expect($popup.interval).toBe(undefined)
    expect($popup.instance!.close).toBeCalled()
  })

  it('should share popup between components', () => {
    // Same minimal-mock reasoning as mockPopupParent(): only close/focus are exercised.
    $popup.instance = { close: vi.fn(), focus: vi.fn() } as unknown as Window
    $popup.interval = setInterval(() => null)
    const wrapperA = mount(SharingOptionsLink, { propsData })
    const wrapperB = mount(SharingOptionsLink, { propsData })
    wrapperA.vm.cleanExistingPopupInstance()
    expect($popup.interval).toBe(undefined)
    expect($popup.instance!.close).toBeCalled()
    wrapperB.vm.cleanExistingPopupInstance()
    expect($popup.interval).toBe(undefined)
    expect($popup.instance!.close).toBeCalled()
  })

  it('should open a popup when clicking on the component', async () => {
    // Return a fake popup instance
    $popup.parent = mockPopupParent()
    const wrapper = mount(SharingOptionsLink, { propsData })
    expect($popup.parent.open).not.toBeCalled()
    await wrapper.trigger('click')
    expect($popup.parent.open).toBeCalled()
  })

  it('should clear the popup instance once it been closed', async () => {
    // Return a fake popup instance
    $popup.parent = mockPopupParent()
    const wrapper = mount(SharingOptionsLink, { propsData })
    wrapper.vm.cleanExistingPopupInstance()
    await wrapper.trigger('click')
    expect($popup.instance).not.toBe(null)
    expect($popup.interval).not.toBe(undefined)
    // Close the popup. $popup.instance is typed as the real (readonly-`closed`)
    // Window, but at runtime holds the mock `open()` returned above.
    ;($popup.instance as unknown as { closed: boolean }).closed = true
    // Wait for the interval to be called
    vi.advanceTimersByTime(1000)
    // And check again!
    expect($popup.instance).toBe(null)
    expect($popup.interval).toBe(undefined)
  })
})
