import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { BrandExpansion } from '@/components'
import { BrandMode } from '@/enums'

const meta: Meta<typeof BrandExpansion> = {
  title: 'Murmur/components/Brand/BrandExpansion',
  component: BrandExpansion,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['short', 'medium', 'long'] },
    animated: { control: 'boolean' },
    dark: { control: 'boolean' },
    color: { control: 'color' },
    background: { control: 'color' }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { mode: BrandMode.Short }
}

export const Medium: Story = {
  args: { mode: BrandMode.Medium }
}

export const Long: Story = {
  args: { mode: BrandMode.Long }
}

export const Animated: Story = {
  args: { animated: true }
}

export const WhiteBackground: Story = {
  args: { background: '#FFF', color: '#000' }
}

export const BlackBackground: Story = {
  args: { background: '#000', color: '#FFF' }
}

export const Dark: Story = {
  args: { background: '#DDD', dark: true }
}
