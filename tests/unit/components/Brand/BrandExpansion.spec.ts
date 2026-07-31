import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BrandExpansion from '@/components/Brand/BrandExpansion.vue'
import { BrandMode } from '@/enums'

// Each mode's SVG is lazily loaded (defineAsyncComponent), so it resolves
// over real async ticks rather than a single microtask flush; poll instead
// of a fixed wait or a single flushPromises().
async function waitForSvg(wrapper: ReturnType<typeof mount>) {
  await vi.waitFor(() => {
    if (!wrapper.find('svg').exists()) {
      throw new Error('svg not rendered yet')
    }
  })
}

describe('BrandExpansion.vue', () => {
  it('renders the short mode svg by default', async () => {
    const wrapper = mount(BrandExpansion)
    await waitForSvg(wrapper)
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 106.166 52.917')
    expect(wrapper.find('.triangle').exists()).toBe(true)
  })

  it('renders the medium mode svg', async () => {
    const wrapper = mount(BrandExpansion, { props: { mode: BrandMode.Medium } })
    await waitForSvg(wrapper)
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 901.24 200')
    expect(wrapper.find('.secondary-text').exists()).toBe(true)
  })

  it('renders the long mode svg', async () => {
    const wrapper = mount(BrandExpansion, { props: { mode: BrandMode.Long } })
    await waitForSvg(wrapper)
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 1047.01 200')
  })

  it('switches mode reactively', async () => {
    const wrapper = mount(BrandExpansion, { props: { mode: BrandMode.Short } })
    await waitForSvg(wrapper)
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 106.166 52.917')

    await wrapper.setProps({ mode: BrandMode.Long })
    await vi.waitFor(() => {
      if (wrapper.find('svg').attributes('viewBox') !== '0 0 1047.01 200') {
        throw new Error('svg not switched yet')
      }
    })
  })

  it('applies the color and size through the composable-derived style', async () => {
    const wrapper = mount(BrandExpansion, { props: { color: 'red', size: 100 } })
    await waitForSvg(wrapper)
    expect(wrapper.element.style.getPropertyValue('--monochrome-color')).toBe('red')
    expect(wrapper.find('svg').attributes('height')).toBe('100px')
  })
})
