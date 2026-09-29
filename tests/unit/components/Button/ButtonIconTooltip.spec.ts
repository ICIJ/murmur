import { config, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { BPopover, BTooltip, createBootstrap } from 'bootstrap-vue-next'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'
import { i18n } from '@/i18n'

// The props ButtonIcon actually hands to its BTooltip, as seen on the vnode.
// bootstrap-vue-next only falls back to a globally configured default when a
// prop is absent from the vnode, so anything set here is a default callers
// cannot override globally.
const tooltipVNodeProps = (props: Record<string, unknown>) => {
  const wrapper = mount(ButtonIcon, { props: { label: 'Expand', hideLabel: true, ...props } })
  return wrapper.findComponent(BTooltip).vm.$.vnode.props ?? {}
}

describe('ButtonIcon.vue tooltip', () => {
  it('leaves the delay unset so a global BTooltip default applies', () => {
    expect(tooltipVNodeProps({}).delay).toBeUndefined()
  })

  it('leaves the placement unset so a global BTooltip default applies', () => {
    expect(tooltipVNodeProps({}).placement).toBeUndefined()
  })

  it('still forwards an explicit delay', () => {
    const delay = { show: 3000, hide: 0 }
    expect(tooltipVNodeProps({ tooltipDelay: delay }).delay).toStrictEqual(delay)
  })

  it('still forwards an explicit placement', () => {
    expect(tooltipVNodeProps({ tooltipPlacement: 'right' }).placement).toBe('right')
  })

  it('picks up a globally configured BTooltip delay', () => {
    const delay = { show: 3000, hide: 0 }
    // Swap the suite-wide bootstrap plugin rather than adding a second one,
    // which Vue would reject as already applied.
    const plugins = config.global.plugins
    config.global.plugins = [i18n, createBootstrap({ components: { BTooltip: { delay } } })]
    const wrapper = mount(ButtonIcon, { props: { label: 'Expand', hideLabel: true } })
    config.global.plugins = plugins
    // BTooltip resolves the global default, then spreads the outcome onto the
    // BPopover it renders, which is where the delay is finally honoured.
    expect(wrapper.findComponent(BPopover).vm.$.vnode.props?.delay).toStrictEqual(delay)
  })
})
