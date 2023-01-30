import { shallowMount } from '@vue/test-utils'
import SecretInput from '@root/components/SecretInput.vue'

describe('SecretInput.vue', () => {
  // Stubs Bootstrap Vue components
  const stubs = ['b-input-group-prepend', 'b-input-group-append', 'b-input-group', 'b-form-input', 'b-button']

  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SecretInput, { stubs })
    expect(wrapper.vm).toBeTruthy()
  })

  it('changes visibility according to the "visible" prop', async () => {
    const propsData = { value: 'a secret value' }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.vm.isVisible).toBeFalsy()
    await wrapper.setProps({ visible: true })
    expect(wrapper.vm.isVisible).toBeTruthy()
  })

  it('sets initial visibility according to the "visible" prop', () => {
    const propsData = { value: 'a secret value', visible: true }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.vm.isVisible).toBeTruthy()
  })

  it('emits "input" event when changing visibility', () => {
    const propsData = { value: 'a secret value' }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    wrapper.vm.toggle()
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toBe(true)
  })

  it('shows an eye icon when input is not visible', () => {
    const propsData = { value: 'a secret value', visible: false }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.vm.togglerIcon[1]).toBe('eye')
  })

  it('shows an eye-slash icon when input is visible', () => {
    const propsData = { value: 'a secret value', visible: true }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.vm.togglerIcon[1]).toBe('eye-slash')
  })

  it('shows the toggler button by default', () => {
    const wrapper = shallowMount(SecretInput, { stubs })
    expect(wrapper.find('.secret-input__toggler').exists()).toBeTruthy()
  })

  it('hides the toggler button', () => {
    const propsData = { value: 'a secret value', noToggler: true }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.find('.secret-input__toggler').exists()).toBeFalsy()
  })

  it('shows the haptic copy button by default', () => {
    const wrapper = shallowMount(SecretInput, { stubs })
    expect(wrapper.find('.secret-input__copy').exists()).toBeTruthy()
  })

  it('hides the haptic copy button', () => {
    const propsData = { value: 'a secret value', noHapticCopy: true }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.find('.secret-input__copy').exists()).toBeFalsy()
  })

  it('uses haptic copy button primary variant by default', () => {
    const wrapper = shallowMount(SecretInput, { stubs })
    expect(wrapper.find('.secret-input__copy').classes('btn-primary')).toBeTruthy()
  })

  it('changes haptic copy button variant', () => {
    const propsData = { hapticCopyVariant: 'info' }
    const wrapper = shallowMount(SecretInput, { stubs, propsData })
    expect(wrapper.find('.secret-input__copy').classes('btn-primary')).toBeFalsy()
    expect(wrapper.find('.secret-input__copy').classes('btn-info')).toBeTruthy()
  })
})