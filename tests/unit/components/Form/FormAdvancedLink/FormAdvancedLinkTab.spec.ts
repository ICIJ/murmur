import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AdvancedLinkFormTab from '@/components/Form/FormAdvancedLink/FormAdvancedLinkTab.vue'
import { AdvancedLinkTab } from '@/enums'
interface AdvancedLinkFormTabsProps {
  readonly link: string
  readonly title: string
  readonly type?: AdvancedLinkTab
}

describe('AdvancedLinkFormTab.vue', () => {
  const global = { stubs: { HapticCopy: true }, renderStubDefaultSlot: true }
  it('should be a Vue instance', () => {
    const props = {
      link: 'https://www.icij.org',
      title: 'A Great Website',
    }
    const wrapper = mount(AdvancedLinkFormTab, { global, props })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should create a raw link input', async () => {
    const props: AdvancedLinkFormTabsProps = {
      link: 'https://www.icij.org',
      title: 'A Great Website',
      type: AdvancedLinkTab.raw
    }
    const wrapper = shallowMount(AdvancedLinkFormTab, { props, global })
    expect(wrapper.find('.advanced-link-form-tab__input').attributes('modelvalue')).toBe(props.link)
  })

  it('should use the title in markdown input', async () => {
    const props: AdvancedLinkFormTabsProps = {
      link: 'https://www.icij.org',
      title: 'A Great Website',
      type: AdvancedLinkTab.markdown
    }
    const markdown = `[${props.title}](${props.link})`
    const wrapper = shallowMount(AdvancedLinkFormTab, { props, global })
    expect(wrapper.find('.advanced-link-form-tab__input').attributes('modelvalue')).toBe(markdown)
  })

  it('selects the input text when a non-rich tab is clicked', async () => {
    // Regression: selectInput() used to call .select() on the <b-form-input>
    // component instance itself, which has no such method (it only exposes
    // blur/element/focus) and threw a TypeError, silently dropping selection.
    const props: AdvancedLinkFormTabsProps = {
      link: 'https://www.icij.org',
      title: 'A Great Website',
      type: AdvancedLinkTab.raw
    }
    const wrapper = mount(AdvancedLinkFormTab, { props, global })
    const input = wrapper.find('input').element as HTMLInputElement
    const selectSpy = vi.spyOn(input, 'select')
    await wrapper.find('.advanced-link-form-tab__input').trigger('click')
    await flushPromises()
    expect(selectSpy).toHaveBeenCalled()
  })

  it('should use the title in rich input', () => {
    const props: AdvancedLinkFormTabsProps = {
      link: 'https://www.icij.org',
      title: 'A Great Website',
      type: AdvancedLinkTab.rich
    }
    const wrapper = shallowMount(AdvancedLinkFormTab, { props, global })
    expect(wrapper.find('.advanced-link-form-tab__input').text()).toBe(props.title)
    expect(wrapper.find('.advanced-link-form-tab__input').attributes('href')).toBe(props.link)
  })
})
