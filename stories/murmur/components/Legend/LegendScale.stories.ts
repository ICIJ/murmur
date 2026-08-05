import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { range } from 'd3-array'
import { scaleLinear, scaleThreshold } from 'd3-scale'

import { LegendScale } from '@/components'

// Renders the same gradient logic useLegendScale uses, magnified: 10 columns
// blown up to 30px squares with `image-rendering: pixelated`, over a
// checkerboard so a transparent column would read as visibly different from
// any painted color.
function buildScaleCanvasDataUrl(columns: number[], width: number): string {
  const min = 0
  const max = 100
  const height = 1
  const colorScale = scaleLinear<string>().domain([min, max]).range(['#fafa6e', 'teal'])
  const widthScale = scaleLinear().domain([0, width]).range([min, max])

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  for (const x of columns) {
    ctx.fillStyle = colorScale(widthScale(x))
    ctx.fillRect(x, 0, 1, height)
  }
  return canvas.toDataURL()
}

const magnifiedSwatchStyle = {
  width: '300px',
  height: '30px',
  imageRendering: 'pixelated',
  backgroundImage: 'repeating-conic-gradient(#808080 0% 25%, #ffffff 0% 50%)',
  backgroundSize: '10px 10px'
}

const meta: Meta<typeof LegendScale> = {
  title: 'Murmur/components/Legend/LegendScale',
  component: LegendScale,
  tags: ['autodocs'],
  argTypes: {
    // Accepts a named d3-scale preset (e.g. 'scaleLinear') or an arbitrary
    // scale function — not a CSS color, despite the name. Storybook's docgen
    // infers a color-picker control for it, which breaks whenever a story
    // (e.g. ThresholdScale) passes a function instead of a string.
    colorScale: { control: false }
  }
}

export default meta

type Story = StoryObj<typeof meta>

function thresholdScaleFn() {
  return scaleThreshold()
    .domain([1e4, 2e4, 3e4, 4e4, 5e4])
    // @ts-expect-error expect an array with numbers but hex color strings works
    .range(['#D12229', '#F68A1E', '#FDE01A', '#007940', '#24408E', '#732982'])
}

export const Default: Story = {
  args: {}
}

export const Width: Story = {
  args: { width: 200 }
}

export const ColorScale: Story = {
  args: {
    colorScaleStart: '#fafa6e',
    colorScaleEnd: 'teal'
  }
}

export const ThresholdScale: Story = {
  args: {
    min: 0,
    max: 6e4,
    colorScale: thresholdScaleFn()
  }
}

export const HighlightValue: Story = {
  args: {
    width: 400,
    cursorValue: 46
  }
}

export const CustomizedWithSlot: Story = {
  args: {
    width: 400,
    cursorValue: 10
  },
  decorators: [() => ({ template: '<div style="margin:40px;"><story/></div>' })],
  render: (args: any) => ({
    components: { LegendScale },
    setup: () => ({ args }),
    template: `
      <LegendScale v-bind="args">
        <template #cursor="{ value }">
          <div class="bg-dark text-light px-3 py-2">
            {{ value }}
          </div>
        </template>
      </LegendScale>
    `
  })
}

// Magnified reproduction of colorScaleWidthRange's pixel coverage, for a
// direct visual check — not a real usage example. See useLegendScale.ts's
// colorScaleWidthRange.
const COMPARISON_WIDTH = 10

export const PixelRangeCoverage: Story = {
  name: 'Pixel range: 0 to width - 1',
  render: () => ({
    setup: () => ({
      src: buildScaleCanvasDataUrl(range(COMPARISON_WIDTH), COMPARISON_WIDTH),
      style: magnifiedSwatchStyle
    }),
    template: `
      <div>
        <p>Columns 0..width-1: every canvas column is painted, including the max-domain color at the right edge.</p>
        <img :src="src" :style="style" alt="gradient painted from column 0 to width - 1">
      </div>
    `
  })
}
