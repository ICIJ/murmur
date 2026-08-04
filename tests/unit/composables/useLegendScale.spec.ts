import { ref } from 'vue'
import { scaleThreshold } from 'd3-scale'
import { describe, expect, it } from 'vitest'

import { useLegendScale } from '@/composables/useLegendScale'
import type { ColorScaleFn } from '@/composables/useLegendScale'

// Default options matching the LegendScale component defaults, overridable per
// test. Kept as a factory so each call gets fresh refs.
function createOptions(overrides: Record<string, unknown> = {}) {
  return {
    width: ref(150),
    min: ref(0),
    max: ref(100),
    cursorValue: ref<number | null>(null),
    colorScale: ref<ColorScaleFn | string>('scaleLinear'),
    colorScaleStart: ref('#fff'),
    colorScaleEnd: ref('#000'),
    ...overrides
  }
}

describe('useLegendScale', () => {
  describe('with the default linear scale', () => {
    it('reports no cursor for a null cursor value', () => {
      const { hasCursor } = useLegendScale(createOptions())
      expect(hasCursor.value).toBe(false)
    })

    it('reports a cursor for a numeric cursor value', () => {
      const { hasCursor } = useLegendScale(
        createOptions({ cursorValue: ref(50) })
      )
      expect(hasCursor.value).toBe(true)
    })

    it('returns 0% cursor offset when there is no cursor value', () => {
      const { cursorLeft } = useLegendScale(createOptions())
      expect(cursorLeft.value).toBe('0%')
    })

    it('returns 0% cursor offset for the minimum value', () => {
      const { cursorLeft } = useLegendScale(
        createOptions({ min: ref(0), max: ref(150), cursorValue: ref(0) })
      )
      expect(cursorLeft.value).toBe('0%')
    })

    it('returns 100% cursor offset for the maximum value', () => {
      const { cursorLeft } = useLegendScale(
        createOptions({ min: ref(0), max: ref(150), cursorValue: ref(150) })
      )
      expect(cursorLeft.value).toBe('100%')
    })

    it('maps a pixel column back to its domain value', () => {
      const { widthScale } = useLegendScale(
        createOptions({ width: ref(100), min: ref(0), max: ref(100) })
      )
      expect(Math.round(widthScale.value(100))).toBe(100)
    })

    it('ranges over every pixel column from 0 to width - 1 inclusive', () => {
      const { colorScaleWidthRange } = useLegendScale(
        createOptions({ width: ref(3) })
      )
      expect(colorScaleWidthRange.value).toEqual([0, 1, 2])
    })

    it('paints the canvas edge-to-edge: includes column 0 and the last real column, excludes the out-of-bounds one at width', () => {
      // Regression test for a bug where range(1, width + 1) skipped column 0
      // (leaving a transparent 1px stripe on the left) and painted column
      // `width`, which falls outside a canvas sized to exactly `width` (valid
      // columns are 0..width-1) — clipping away the max-domain color.
      const width = 150
      const { colorScaleWidthRange } = useLegendScale(
        createOptions({ width: ref(width) })
      )
      const columns = colorScaleWidthRange.value
      expect(columns).toContain(0)
      expect(columns).toContain(width - 1)
      expect(columns).not.toContain(width)
    })

    it('throws a descriptive error for an unsupported colorScale name', () => {
      const { colorScaleFunction } = useLegendScale(
        createOptions({ colorScale: ref('scaleQuantize') })
      )
      expect(() => colorScaleFunction.value).toThrow(/unsupported colorScale name "scaleQuantize"/)
    })

    it.each(['scaleSequential', 'scaleSymlog', 'scaleTime', 'scaleUtc'])('builds a two-stop scale from %s spanning colorScaleStart to colorScaleEnd', (name) => {
      const { colorScaleFunction } = useLegendScale(
        createOptions({ colorScale: ref(name), colorScaleStart: ref('#fff'), colorScaleEnd: ref('#000') })
      )
      expect(colorScaleFunction.value(0)).toBe('rgb(255, 255, 255)')
      expect(colorScaleFunction.value(100)).toBe('rgb(0, 0, 0)')
    })
  })

  describe('with a threshold scale', () => {
    // White below 10k, pink up to 20k, red above.
    function createThresholdOptions() {
      const colorScale = scaleThreshold<number, string>()
        .domain([1e4, 2e4])
        .range(['white', 'pink', 'red'])
      return createOptions({
        min: ref(0),
        max: ref(3e4),
        width: ref(150),
        colorScale: ref(colorScale as unknown as ColorScaleFn)
      })
    }

    it('passes through the caller-provided color function', () => {
      const { colorScaleFunction } = useLegendScale(createThresholdOptions())
      expect(colorScaleFunction.value(0)).toBe('white')
      expect(colorScaleFunction.value(1e4)).toBe('pink')
      expect(colorScaleFunction.value(1e5)).toBe('red')
    })

    it('maps a pixel column to the color painted there', () => {
      const { widthScaleColor } = useLegendScale(createThresholdOptions())
      expect(widthScaleColor.value(0)).toBe('white')
      expect(widthScaleColor.value(75)).toBe('pink')
      expect(widthScaleColor.value(150)).toBe('red')
    })

    it('rounds the cursor offset to whole percents', () => {
      const { cursorLeft } = useLegendScale(
        createOptions({
          min: ref(0),
          max: ref(3e4),
          cursorValue: ref(1e4)
        })
      )
      expect(cursorLeft.value).toBe('33%')
    })
  })
})
