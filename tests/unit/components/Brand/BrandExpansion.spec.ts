import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BrandExpansion from '@/components/Brand/BrandExpansion.vue'
import { BrandMode } from '@/enums'

describe('BrandExpansion.vue', () => {
  it('renders the short mode svg by default', () => {
    const wrapper = mount(BrandExpansion)
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 106.166 52.917')
    expect(wrapper.find('.triangle').exists()).toBe(true)
  })

  it('renders the medium mode svg', () => {
    const wrapper = mount(BrandExpansion, { props: { mode: BrandMode.Medium } })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 901.24 200')
    expect(wrapper.find('.secondary-text').exists()).toBe(true)
  })

  it('renders the long mode svg', () => {
    const wrapper = mount(BrandExpansion, { props: { mode: BrandMode.Long } })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 1047.01 200')
  })

  it('switches mode reactively', async () => {
    const wrapper = mount(BrandExpansion, { props: { mode: BrandMode.Short } })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 106.166 52.917')

    await wrapper.setProps({ mode: BrandMode.Long })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 1047.01 200')
  })

  it('applies the color and size through the composable-derived style', () => {
    const wrapper = mount(BrandExpansion, { props: { color: 'red', size: 100 } })
    expect(wrapper.element.style.getPropertyValue('--monochrome-color')).toBe('red')
    expect(wrapper.find('svg').attributes('height')).toBe('100px')
  })
})
