import { mount, shallowMount } from '@vue/test-utils'
import SecretInput from '@/components/Form/FormControl/FormControlSecret.vue'

describe('SecretInput.vue', () => {
  // Stubs Bootstrap Vue components
  const stubs = [
    'b-input-group',
    'b-form-input',
    'b-button',
    'haptic-copy'
  ]
  const global = { stubs, renderStubDefaultSlot: true }
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SecretInput, { global })
    expect(wrapper.vm).toBeTruthy()
  })

  it('changes visibility according to the "visible" prop', async () => {
    const propsData = { value: 'a secret value' }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__input').attributes('type')).toBe('password')
    await wrapper.setProps({ visible: true })
    expect(wrapper.find('.secret-input__input').attributes('type')).toBe('text')
  })

  it('sets initial visibility according to the "visible" prop', () => {
    const propsData = { value: 'a secret value', visible: true }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__input').attributes('type')).toBe('text')
  })

  it('emits "input" event when changing visibility', async () => {
    const propsData = { value: 'a secret value' }
    const wrapper = mount(SecretInput, { global, propsData })
    await wrapper.find('.secret-input__toggler').trigger('click')
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')![0][0]).toBe(true)
  })

  it('shows an eye icon when input is not visible', () => {
    const propsData = { value: 'a secret value', visible: false }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__toggler').find('ph-eye-stub').exists()).toBe(true)
  })

  it('shows an eye-slash icon when input is visible', () => {
    const propsData = { value: 'a secret value', visible: true }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__toggler').find('ph-eye-slash-stub').exists()).toBe(true)
  })

  it('shows the toggler button by default', () => {
    const wrapper = mount(SecretInput, { global })
    expect(wrapper.find('.secret-input__toggler').exists()).toBeTruthy()
  })

  it('hides the toggler button', () => {
    const propsData = { value: 'a secret value', noToggler: true }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__toggler').exists()).toBeFalsy()
  })

  it('shows the haptic copy button by default', () => {
    const wrapper = shallowMount(SecretInput, { global })
    expect(wrapper.find('.secret-input__copy').exists()).toBeTruthy()
  })

  it('hides the haptic copy button', () => {
    const propsData = { value: 'a secret value', noHapticCopy: true }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__copy').exists()).toBeFalsy()
  })

  it('uses haptic copy button primary variant by default', () => {
    const wrapper = shallowMount(SecretInput, { global })
    expect(wrapper.find('.secret-input__copy').classes('btn-primary')).toBeTruthy()
  })

  it('changes haptic copy button variant', () => {
    const propsData = { hapticCopyVariant: 'info' }
    const wrapper = shallowMount(SecretInput, { global, propsData })
    expect(wrapper.find('.secret-input__copy').classes('btn-primary')).toBeFalsy()
    expect(wrapper.find('.secret-input__copy').classes('btn-info')).toBeTruthy()
  })

  it('places the toggler on the left by default', () => {
    const wrapper = shallowMount(SecretInput, { global })
    const field = wrapper.find('.secret-input__field')
    expect(field.classes()).toContain('secret-input__field--toggler-left')
    expect(field.find('.secret-input__toggler').exists()).toBe(true)
  })

  it('places the toggler on the right', () => {
    const props = { togglerPosition: 'right' as const }
    const wrapper = shallowMount(SecretInput, { global, props })
    const field = wrapper.find('.secret-input__field')
    expect(field.classes()).toContain('secret-input__field--toggler-right')
    expect(field.classes()).not.toContain('secret-input__field--toggler-left')
  })

  it('renders the toggler after the input when on the right', () => {
    const props = { togglerPosition: 'right' as const }
    const wrapper = shallowMount(SecretInput, { global, props })
    const children = wrapper.find('.secret-input__field').element.children
    expect(children[0].classList.contains('secret-input__input')).toBe(true)
    expect(children[1].classList.contains('secret-input__toggler')).toBe(true)
  })

  it('renders the toggler before the input when on the left', () => {
    const wrapper = shallowMount(SecretInput, { global })
    const children = wrapper.find('.secret-input__field').element.children
    expect(children[0].classList.contains('secret-input__toggler')).toBe(true)
    expect(children[1].classList.contains('secret-input__input')).toBe(true)
  })

  it('has no toggler modifier without toggler', () => {
    const props = { noToggler: true }
    const wrapper = shallowMount(SecretInput, { global, props })
    const field = wrapper.find('.secret-input__field')
    expect(field.classes()).not.toContain('secret-input__field--toggler-left')
    expect(field.classes()).not.toContain('secret-input__field--toggler-right')
  })
})
