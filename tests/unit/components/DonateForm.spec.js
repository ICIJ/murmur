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
    wrapper.setData({ installmentPeriod: 'monthly' })
    wrapper.setData({ amount: 3 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.conversation'))
  })

  it('shows a specific message for monthly amount higher or equal than 15', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'monthly' })
    wrapper.setData({ amount: 15 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.rules'))
  })

  it('shows a specific message for monthly amount higher or equal than 50', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'monthly' })
    wrapper.setData({ amount: 50 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.world'))
  })

  it('shows the same specific message for monthly amount higher or equal than 50', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'monthly' })
    wrapper.setData({ amount: 150 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.world'))
  })

  it('shows a specific message for yearly amount higher or equal than 35', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'yearly' })
    wrapper.setData({ amount: 35 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.conversation'))
  })

  it('shows a specific message for yearly amount higher or equal than 180', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'yearly' })
    wrapper.setData({ amount: 180 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.rules'))
  })

  it('shows the same specific message for yearly amount higher or equal than 600', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'yearly' })
    wrapper.setData({ amount: 600 })
    expect(wrapper.vm.changeThe).toBe(wrapper.vm.$t('donate-form.result.world'))
  })

  it('changes the amount for conversation level when changing the period', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ level: 'conversation' })
    wrapper.setData({ installmentPeriod: 'onetime' })
    expect(wrapper.vm.amount).toBe(50)

    wrapper.setData({ level: 'conversation' })
    wrapper.setData({ installmentPeriod: 'monthly' })
    expect(wrapper.vm.amount).toBe(10)

    wrapper.setData({ level: 'conversation' })
    wrapper.setData({ installmentPeriod: 'yearly' })
    expect(wrapper.vm.amount).toBe(25)
  })

  it('changes the amount for rules level when changing the period', () => {
    const wrapper = shallowMount(DonateForm)

    wrapper.setData({ level: 'rules' })
    wrapper.setData({ installmentPeriod: 'onetime' })
    expect(wrapper.vm.amount).toBe(200)

    wrapper.setData({ level: 'rules' })
    wrapper.setData({ installmentPeriod: 'monthly' })
    expect(wrapper.vm.amount).toBe(25)

    wrapper.setData({ level: 'rules' })
    wrapper.setData({ installmentPeriod: 'yearly' })
    expect(wrapper.vm.amount).toBe(180)
  })

  it('changes the amount for world level when changing the period', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ level: 'world' })
    wrapper.setData({ installmentPeriod: 'onetime' })
    expect(wrapper.vm.amount).toBe(600)

    wrapper.setData({ level: 'world' })
    wrapper.setData({ installmentPeriod: 'monthly' })
    expect(wrapper.vm.amount).toBe(100)

    wrapper.setData({ level: 'world' })
    wrapper.setData({ installmentPeriod: 'yearly' })
    expect(wrapper.vm.amount).toBe(600)
  })

  it('doesn\'t change the amount when changing the period if the form isn\'t pristine', () => {
    const wrapper = shallowMount(DonateForm)
    wrapper.setData({ installmentPeriod: 'yearly' })
    expect(wrapper.vm.amount).toBe(25)

    wrapper.setData({ amountIsPristine: false })
    wrapper.setData({ installmentPeriod: 'monthly' })
    expect(wrapper.vm.amount).toBe(25)
  })
})
