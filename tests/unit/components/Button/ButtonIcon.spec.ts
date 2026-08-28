import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'

describe('ButtonIcon.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ButtonIcon)
    expect(wrapper.vm).toBeTruthy()
  })

  it('does not turn into a toggle button when `pressed` is not passed', async () => {
    const wrapper = mount(ButtonIcon, { props: { label: 'Toggle' } })
    const button = wrapper.get('button')

    expect(button.attributes('aria-pressed')).toBeUndefined()

    await button.trigger('click')

    expect(button.attributes('aria-pressed')).toBeUndefined()
    expect(button.classes()).not.toContain('active')
  })

  it('still behaves as a toggle button when `pressed` is explicitly passed', async () => {
    const wrapper = mount(ButtonIcon, { props: { label: 'Toggle', pressed: false } })
    const button = wrapper.get('button')

    expect(button.attributes('aria-pressed')).toBe('false')

    await button.trigger('click')

    expect(button.attributes('aria-pressed')).toBe('true')
    expect(button.classes()).toContain('active')
  })
})
