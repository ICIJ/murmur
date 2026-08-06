import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { HapticCopy } from '@/components'
import { BBadge } from 'bootstrap-vue-next'
import { markRaw } from 'vue'

const meta: Meta<typeof HapticCopy> = {
  title: 'Murmur/components/HapticCopy/HapticCopy',
  component: HapticCopy,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div class="p-2 text-center"><story/></div>' })],
  argTypes: {
    hideLabel: { control: 'boolean' },
    tooltipPlacement: { control: 'text' }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Lorem info sit amet',
    variant: 'info'
  }
}

export const Feedback: Story = {
  args: {
    hideLabel: true,
    tooltipPlacement: 'right',
    text: 'Lorem info sit amet',
    variant: 'secondary'
  }
}

export const PillBadge: Story = {
  args: {
    text: 'Lorem info sit amet',
    variant: 'warning',
    tag: markRaw(BBadge),
    // `pill` isn't a declared HapticCopy prop, but falls through as an
    // attribute to the underlying BBadge's own `pill` prop.
    pill: true
  } as Story['args'] & { pill: boolean }
}
