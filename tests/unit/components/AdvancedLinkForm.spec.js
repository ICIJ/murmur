import MutationObserver from 'mutationobserver-shim'
import { mount } from '@vue/test-utils'
import AdvancedLinkForm from '@root/components/AdvancedLinkForm.vue'
// @see https://github.com/molgenis/molgenis-ui-filter/issues/16#issuecomment-576639112
global.MutationObserver = MutationObserver

describe('AdvancedLinkForm.vue', () => {
  const createContainer = (tag = 'div') => {
    const container = document.createElement(tag)
    document.body.appendChild(container)
    return container
  }
  // Mock Vue i18n method
  const mocks = { $t: (t) => (t) }

  it('should be a Vue instance', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should create 4 nav items (tabs) by default', async () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.nav-item').length).toBe(4)
  })

  it('should create 4 pans by default, only one active', async () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.tab-pane').length).toBe(4)
    expect(wrapper.findAll('.tab-pane.active').length).toBe(1)
  })

  it('should create a raw link input, active by default', async () => {
    const propsData = { link: 'https://www.icij.org', title: 'A Great Website' }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tab-pane.active .advanced-link-form__raw__input').exists()).toBeTruthy()
    expect(wrapper.find('.advanced-link-form__raw__input').element.value).toBe(propsData.link)
  })

  it('should create switch between form using `value` property', async () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tab-pane.active .advanced-link-form__raw').exists()).toBeTruthy()
    wrapper.setProps({ value: 1})
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tab-pane.active .advanced-link-form__rich').exists()).toBeTruthy()
    wrapper.setProps({ value: 2})
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.tab-pane.active .advanced-link-form__markdown').exists()).toBeTruthy()
  })

  it('should create only 3 forms, markdown active by default ', async () => {
    const propsData = { forms: ['raw', 'markdown', 'html'], value: 1 }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.tab-pane').length).toBe(3)
    expect(wrapper.find('.tab-pane.active .advanced-link-form__markdown').exists()).toBeTruthy()
  })

  it('should not use card by default', async () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).not.toContain('advanced-link-form--card')
    expect(wrapper.find('.nav').classes()).not.toContain('card-header-tabs')
    expect(wrapper.find('.tab-pane.active').classes()).not.toContain('card-body')
  })

  it('should use card when property is set', async () => {
    const propsData = { card: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('advanced-link-form--card')
    expect(wrapper.find('.nav').classes()).toContain('card-header-tabs')
    expect(wrapper.find('.tab-pane.active').classes()).toContain('card-body')
  })

  it('should not use pills by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    expect(wrapper.classes()).not.toContain('advanced-link-form--pills')
    expect(wrapper.find('.nav').classes()).not.toContain('nav-pills')
  })

  it('should use pills when property is set', () => {
    const propsData = { pills: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    expect(wrapper.classes()).toContain('advanced-link-form--pills')
    expect(wrapper.find('.nav').classes()).toContain('nav-pills')
  })

  it('should not use small layout by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    expect(wrapper.classes()).not.toContain('advanced-link-form--small')
  })

  it('should use small layout when property is set', () => {
    const propsData = { small: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    expect(wrapper.classes()).toContain('advanced-link-form--small')
  })

  it('should not use vertical layout by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks, attachTo: createContainer() })
    expect(wrapper.classes()).not.toContain('advanced-link-form--vertical')
  })

  it('should use vertical layout when property is set', () => {
    const propsData = { vertical: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    expect(wrapper.classes()).toContain('advanced-link-form--vertical')
  })

  it('should use the title in markdwon input', () => {
    const propsData = { link: 'https://www.icij.org', title: 'A Great Website' }
    const markdown = `[${propsData.title}](${propsData.link})`
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    expect(wrapper.find('.advanced-link-form__markdown__input').element.value).toBe(markdown)
  })

  it('should use the title in rich input', () => {
    const propsData = { link: 'https://www.icij.org', title: 'A Great Website' }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks, attachTo: createContainer() })
    expect(wrapper.find('.advanced-link-form__rich__input').text()).toBe(propsData.title)
    expect(wrapper.find('.advanced-link-form__rich__input').attributes('href')).toBe(propsData.link)
  })
})
