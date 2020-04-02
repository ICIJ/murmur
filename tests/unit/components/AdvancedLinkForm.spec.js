import { mount } from '@vue/test-utils'
import AdvancedLinkForm from '@/components/AdvancedLinkForm.vue'

describe('AdvancedLinkForm.vue', () => {

  // Mock Vue i18n method
  const mocks = { $t: (t) => (t) }

  beforeAll(() => {
    // Prevent multiple Bootstrap Vue warnings in tests
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterAll(() => {
   console.warn.mockClear()
  })

  it('should be a Vue instance', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should create 4 nav items (tabs) by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.findAll('.nav-item').length).toBe(4)
  })

  it('should create 4 pans by default, only one active', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.findAll('.tab-pane').length).toBe(4)
    expect(wrapper.findAll('.tab-pane.active').length).toBe(1)
  })

  it('should create a raw link input, active by default', () => {
    const propsData = { link: 'https://www.icij.org', title: 'A Great Website' }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.find('.tab-pane.active .advanced-link-form__raw__input').exists()).toBeTruthy()
    expect(wrapper.find('.advanced-link-form__raw__input').element.value).toBe(propsData.link)
  })

  it('should create switch between form using `value` property', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.find('.tab-pane.active .advanced-link-form__raw').exists()).toBeTruthy()
    wrapper.setProps({ value: 1})
    expect(wrapper.find('.tab-pane.active .advanced-link-form__rich').exists()).toBeTruthy()
    wrapper.setProps({ value: 2})
    expect(wrapper.find('.tab-pane.active .advanced-link-form__markdown').exists()).toBeTruthy()
  })

  it('should create only 3 forms, markdown active by default ', () => {
    const propsData = { forms: ['raw', 'markdown', 'html'], value: 1 }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.findAll('.tab-pane').length).toBe(3)
    expect(wrapper.find('.tab-pane.active .advanced-link-form__markdown').exists()).toBeTruthy()
  })

  it('should not use card by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.classes()).not.toContain('advanced-link-form--card')
    expect(wrapper.find('.nav').classes()).not.toContain('card-header-tabs')
    expect(wrapper.find('.tab-pane.active').classes()).not.toContain('card-body')
  })

  it('should use card when property is set', () => {
    const propsData = { card: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.classes()).toContain('advanced-link-form--card')
    expect(wrapper.find('.nav').classes()).toContain('card-header-tabs')
    expect(wrapper.find('.tab-pane.active').classes()).toContain('card-body')
  })

  it('should not use pills by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.classes()).not.toContain('advanced-link-form--pills')
    expect(wrapper.find('.nav').classes()).not.toContain('nav-pills')
  })

  it('should use pills when property is set', () => {
    const propsData = { pills: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.classes()).toContain('advanced-link-form--pills')
    expect(wrapper.find('.nav').classes()).toContain('nav-pills')
  })

  it('should not use small layout by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.classes()).not.toContain('advanced-link-form--small')
  })

  it('should use small layout when property is set', () => {
    const propsData = { small: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.classes()).toContain('advanced-link-form--small')
  })

  it('should not use vertical layout by default', () => {
    const wrapper = mount(AdvancedLinkForm, { mocks })
    expect(wrapper.classes()).not.toContain('advanced-link-form--vertical')
  })

  it('should use vertical layout when property is set', () => {
    const propsData = { vertical: true }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.classes()).toContain('advanced-link-form--vertical')
  })

  it('should use the title in markdwon input', () => {
    const propsData = { link: 'https://www.icij.org', title: 'A Great Website' }
    const markdown = `[${propsData.title}](${propsData.link})`
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.find('.advanced-link-form__markdown__input').element.value).toBe(markdown)
  })

  it('should use the title in rich input', () => {
    const propsData = { link: 'https://www.icij.org', title: 'A Great Website' }
    const wrapper = mount(AdvancedLinkForm, { propsData, mocks })
    expect(wrapper.find('.advanced-link-form__rich__input').text()).toBe(propsData.title)
    expect(wrapper.find('.advanced-link-form__rich__input').attributes('href')).toBe(propsData.link)
  })
})
