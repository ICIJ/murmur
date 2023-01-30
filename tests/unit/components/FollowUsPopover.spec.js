import { mount, shallowMount } from '@vue/test-utils'
import FollowUsPopover from '@root/components/FollowUsPopover.vue'

describe('FollowUsPopover.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = mount(FollowUsPopover)
    expect(wrapper.vm).toBeTruthy()
  })

  it('has a sign-up form', () => {
    const wrapper = shallowMount(FollowUsPopover)
    expect(wrapper.find('sign-up-form-stub').exists()).toBeTruthy()
  })

  it('has a close button', () => {
    const wrapper = shallowMount(FollowUsPopover)
    expect(wrapper.find('.follow-us__close').exists()).toBeTruthy()
  })

  it('emits an event when clicking on close button', () => {
    const wrapper = shallowMount(FollowUsPopover)
    const btn = wrapper.find('.follow-us__close')
    expect(wrapper.emitted()['update:show']).toBeFalsy()
    btn.trigger('click')
    expect(wrapper.emitted()['update:show']).toBeTruthy()
  })

})
