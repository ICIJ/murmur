import { shallowMount } from '@vue/test-utils'
import EmbedForm from '@/components/EmbedForm.vue'

describe('EmbedForm.vue', () => {

  const propsData = {
    url: 'https://projects.icij.org/the-implant-files/graphics/'
  }

  test('is a Vue instance', () => {
    const wrapper = shallowMount(EmbedForm, { propsData })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('shows title when props.noTitle isn\'t passed', () => {
    const wrapper = shallowMount(EmbedForm, { propsData })
    expect(wrapper.find('.embed-form__heading').exists()).toBeTruthy()
  })

  it('hides show title when props.noTitle is passed', () => {
    const noTitle = true
    const wrapper = shallowMount(EmbedForm, {
      propsData: { noTitle, ...propsData }
    })
    expect(wrapper.find('.embed-form__heading').exists()).toBeFalsy()
  })

  it('shows a preview panel when props.noPreview isn\'t passed', () => {
    const wrapper = shallowMount(EmbedForm, { propsData })
    expect(wrapper.find('.embed-form__preview').exists()).toBeTruthy()
  })

  it('hides a show preview panel when props.noPreview is passed', () => {
    const noPreview = true
    const wrapper = shallowMount(EmbedForm, {
      propsData: { noPreview, ...propsData }
    })
    expect(wrapper.find('.embed-form__preview').exists()).toBeFalsy()
  })

  it('shows a preview panel with an iframe targeting the passed props.url', () => {
    const wrapper = shallowMount(EmbedForm, { propsData })
    const src =wrapper.element.querySelector('.embed-form__preview iframe').src
    expect(src).toBe(propsData.url)
  })

  it('shows a preview panel with an iframe targeting the passed props.url without pym params', () => {
    const url = 'https://projects.icij.org/the-implant-files/graphics/?initialWidth=720&childId=example-graphic'
    const wrapper = shallowMount(EmbedForm, {
      propsData: { url }
    })
    const src =wrapper.element.querySelector('.embed-form__preview iframe').src
    expect(src).toBe('https://projects.icij.org/the-implant-files/graphics/')
  })
})
