import { mount, createLocalVue } from '@vue/test-utils'
import SocialSharing from 'vue-social-sharing'

import Fa from '@/components/Fa'
import SharingOptions from '@/components/SharingOptions'

describe('SharingOptions', () => {

  const localVue = createLocalVue()
  const propsData = {
    url: 'https://medicaldevices.icij.org/',
    values: {
      title: 'A title to share',
      twitter_title: 'A tweet to share #jest',
      facebook_description: 'A short description for facebook but not for the other network'
    }
  }

  it('is a Vue instance', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders props.direction on the root element with the default value', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    expect(wrapper.element.style['flex-direction']).toBe('row')
  })

  it('renders props.direction on the root element with `row`', () => {
    const direction = 'row'
    const wrapper = mount(SharingOptions, {
      localVue,
      propsData: { direction, ...propsData }
    })
    expect(wrapper.element.style['flex-direction']).toBe(direction)
  })

  it('renders props.direction on the root element with `row-reverse`', () => {
    const direction = 'row-reverse'
    const wrapper = mount(SharingOptions, {
      localVue,
      propsData: { direction, ...propsData }
    })
    expect(wrapper.element.style['flex-direction']).toBe(direction)
  })

  it('renders props.direction on the root element with `column`', () => {
    const direction = 'column'
    const wrapper = mount(SharingOptions, {
      localVue,
      propsData: { direction, ...propsData }
    })
    expect(wrapper.element.style['flex-direction']).toBe(direction)
  })

  it('renders props.direction on the root element with `column-reverse`', () => {
    const direction = 'column-reverse'
    const wrapper = mount(SharingOptions, {
      localVue,
      propsData: { direction, ...propsData }
    })
    expect(wrapper.element.style['flex-direction']).toBe(direction)
  })

  it('renders the embed button by default', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    expect(wrapper.find('.sharing-options__link--embed').isVisible()).toBeTruthy()
  })

  it('hides the embed button when props.noEmbed is passed', () => {
    const noEmbed = true
    const wrapper = mount(SharingOptions, {
      localVue,
      propsData: { noEmbed, ...propsData }
    })
    expect(wrapper.find('.sharing-options__link--embed').isVisible()).toBeFalsy()
  })

  it('hides the embed button when props.noEmbed is passed', () => {
    const noEmbed = true
    const wrapper = mount(SharingOptions, {
      localVue,
      propsData: { noEmbed, ...propsData }
    })
    expect(wrapper.find('.sharing-options__link--embed').isVisible()).toBeFalsy()
  })

  it('uses a generic title', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    expect(wrapper.vm.valuesFor('facebook').title).toBe('A title to share')
    expect(wrapper.vm.valuesFor('other').title).toBe('A title to share')
  })

  it('uses a dedicated title for Twitter', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    expect(wrapper.vm.valuesFor('twitter').title).toBe('A tweet to share #jest')
  })

  it('uses a dedicated description for Facebook', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    expect(wrapper.vm.valuesFor('facebook').description).toBe('A short description for facebook but not for the other network')
  })

  it('toggles the embed form', () => {
    const wrapper = mount(SharingOptions, { localVue, propsData })
    wrapper.vm.$refs.embedForm.show = jest.fn()
    expect(wrapper.vm.$refs.embedForm.show.mock.calls.length).toBe(0)
    wrapper.vm.showEmbedForm()
    expect(wrapper.vm.$refs.embedForm.show.mock.calls.length).toBe(1)
  })

  it('uses the current location is none is given', () => {
    const wrapper = mount(SharingOptions, { localVue })
    expect(wrapper.vm.url).toBe('http://localhost/')
  })
})
