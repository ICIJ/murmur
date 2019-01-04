import { shallowMount } from '@vue/test-utils'
import DonateForm from '@/components/DonateForm.vue'

describe('DonateForm.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(DonateForm)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('shows title when props.noTitle isn\'t passed', () => {
    const wrapper = shallowMount(DonateForm)
    expect(wrapper.find('.donate-form__title').exists()).toBeTruthy()
  })

  it('hides title when props.noTitle is passed', () => {
    const noTitle = true
    const wrapper = shallowMount(DonateForm, {
      propsData: { noTitle }
    })
    expect(wrapper.find('.donate-form__title').exists()).toBeFalsy()
  })

  it('shows a specific message for monthly amount higher or equal than 3', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'monthly'
    wrapper.vm.amount = 3
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.conversation'))
  })

  it('shows a specific message for monthly amount higher or equal than 15', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'monthly'
    wrapper.vm.amount = 15
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.rules'))
  })

  it('shows a specific message for monthly amount higher or equal than 50', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'monthly'
    wrapper.vm.amount = 50
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.world'))
  })

  it('shows the same specific message for monthly amount higher or equal than 50', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'monthly'
    wrapper.vm.amount = 150
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.world'))
  })

  it('shows a specific message for yearly amount higher or equal than 35', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'yearly'
    wrapper.vm.amount = 35
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.conversation'))
  })

  it('shows a specific message for yearly amount higher or equal than 180', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'yearly'
    wrapper.vm.amount = 180
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.rules'))
  })

  it('shows the same specific message for yearly amount higher or equal than 600', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'yearly'
    wrapper.vm.amount = 600
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.world'))
  })

  it('changes the amount when changing the period', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'monthly'
    expect(wrapper.vm.amount).toBe(15)
    wrapper.vm.installmentPeriod = 'yearly'
    expect(wrapper.vm.amount).toBe(100)
  })

  it('doesn\'t change the amount when changing the period if the form isn\'t pristine', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.vm.installmentPeriod = 'yearly'
    expect(wrapper.vm.amount).toBe(100)
    wrapper.vm.amountIsPristine = false
    wrapper.vm.installmentPeriod = 'monthly'
    expect(wrapper.vm.amount).toBe(100)
  })
})
