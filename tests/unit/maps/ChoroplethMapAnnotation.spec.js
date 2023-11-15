import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import { PLACEMENTS, default as ChoroplethMapAnnotation } from '@/maps/ChoroplethMapAnnotation.vue'

describe('ChoroplethMapAnnotation', () => {
  // Mock parent map injections
  const parent = {
    rotatingMapProjection: vi.fn().mockReturnValue([0, 0]),
    mapTransform: { k: 1 },
    mapRect: { width: 500, height: 500 }
  }

  it('renders with default props', () => {
    const wrapper = shallowMount(ChoroplethMapAnnotation, {
      propsData: {
        latitude: 0,
        longitude: 0
      },
      provide: { parent }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('computes position correctly', () => {
    const wrapper = shallowMount(ChoroplethMapAnnotation, {
      propsData: {
        latitude: 10,
        longitude: 20
      },
      provide: {
        parent: {
          rotatingMapProjection: vi.fn().mockReturnValue([100, 200]),
          mapTransform: { k: 1 },
          mapRect: { width: 500, height: 500 }
        }
      }
    })

    expect(wrapper.vm.position).toEqual({ x: 100, y: 200 })
  })

  describe('placements', () => {
    const testPlacement = (placement, expectedResults) => {
      it(`computes placement correctly for ${placement}`, () => {
        const wrapper = shallowMount(ChoroplethMapAnnotation, {
          propsData: {
            latitude: 0,
            longitude: 0,
            placement
          },
          provide: { parent }
        })

        expect(wrapper.vm.isRight).toBe(!!expectedResults.isRight)
        expect(wrapper.vm.isLeft).toBe(!!expectedResults.isLeft)
        expect(wrapper.vm.isTop).toBe(!!expectedResults.isTop)
        expect(wrapper.vm.isBottom).toBe(!!expectedResults.isBottom)
        expect(wrapper.vm.isCenter).toBe(!!expectedResults.isCenter)
      })
    }

    testPlacement(PLACEMENTS.TOP, { isTop: true })
    testPlacement(PLACEMENTS.TOPLEFT, { isLeft: true, isTop: true })
    testPlacement(PLACEMENTS.TOPRIGHT, { isRight: true, isTop: true })
    testPlacement(PLACEMENTS.RIGHT, { isRight: true })
    testPlacement(PLACEMENTS.RIGHTTOP, { isRight: true, isTop: true })
    testPlacement(PLACEMENTS.RIGHTBOTTOM, { isRight: true, isBottom: true })
    testPlacement(PLACEMENTS.BOTTOM, { isBottom: true })
    testPlacement(PLACEMENTS.BOTTOMLEFT, { isLeft: true, isBottom: true })
    testPlacement(PLACEMENTS.BOTTOMRIGHT, { isRight: true, isBottom: true })
    testPlacement(PLACEMENTS.LEFT, { isLeft: true })
    testPlacement(PLACEMENTS.LEFTTOP, { isLeft: true, isTop: true })
    testPlacement(PLACEMENTS.LEFTBOTTOM, { isLeft: true, isBottom: true })
    testPlacement(null, { isCenter: true })
  })

  describe('wrapperTransformOrigin', () => {
    const testTransformOrigin = (placement, expectedX, expectedY) => {
      it(`computes wrapperTransformOrigin correctly for ${placement}`, () => {
        const wrapper = shallowMount(ChoroplethMapAnnotation, {
          propsData: {
            latitude: 0,
            longitude: 0,
            placement
          },
          provide: { parent }
        })

        expect(wrapper.vm.wrapperTransformOriginX).toBe(expectedX)
        expect(wrapper.vm.wrapperTransformOriginY).toBe(expectedY)
        expect(wrapper.vm.wrapperTransformOrigin).toBe(`${expectedX} ${expectedY}`)
      })
    }

    testTransformOrigin(PLACEMENTS.TOP, 'center', 'bottom')
    testTransformOrigin(PLACEMENTS.TOPLEFT, 'right', 'bottom')
    testTransformOrigin(PLACEMENTS.TOPRIGHT, 'left', 'bottom')
    testTransformOrigin(PLACEMENTS.RIGHT, 'left', 'center')
    testTransformOrigin(PLACEMENTS.RIGHTTOP, 'left', 'bottom')
    testTransformOrigin(PLACEMENTS.RIGHTBOTTOM, 'left', 'top')
    testTransformOrigin(PLACEMENTS.BOTTOM, 'center', 'top')
    testTransformOrigin(PLACEMENTS.BOTTOMLEFT, 'right', 'top')
    testTransformOrigin(PLACEMENTS.BOTTOMRIGHT, 'left', 'top')
    testTransformOrigin(PLACEMENTS.LEFT, 'right', 'center')
    testTransformOrigin(PLACEMENTS.LEFTTOP, 'right', 'bottom')
    testTransformOrigin(PLACEMENTS.LEFTBOTTOM, 'right', 'top')
  })

  describe('transform', () => {
    const mountComponentWithProps = (propsData) => {
      return shallowMount(ChoroplethMapAnnotation, {
        propsData,
        provide: {
          parent: {
            rotatingMapProjection: vi.fn().mockReturnValue([100, 200]),
            mapTransform: { k: 1 },
            mapRect: { width: 500, height: 500 }
          }
        }
      })
    }

    const testCases = [
      { placement: PLACEMENTS.TOP, height: 150, width: 150, translateX: -75, translateY: -150 },
      { placement: PLACEMENTS.BOTTOM, height: 100, width: 200, translateX: -100, translateY: 0 },
      { placement: PLACEMENTS.LEFT, height: 200, width: 100, translateX: -100, translateY: -100 },
      { placement: PLACEMENTS.RIGHT, height: 150, width: 250, translateX: 0, translateY: -75 }
    ]

    testCases.forEach(({ placement, height, width, translateX, translateY }) => {
      it(`computes transform correctly for placement ${placement} with height ${height} and width ${width}`, () => {
        const wrapper = mountComponentWithProps({ latitude: 0, longitude: 0, height, width, placement })

        expect(wrapper.vm.translateX).toBe(translateX)
        expect(wrapper.vm.translateY).toBe(translateY)
        expect(wrapper.vm.transform).toBe(`translate(${translateX}, ${translateY})`)
      })
    })
  })

  describe('isVisible', () => {
    it('is visible when within geoDistanceThreshold', () => {
      const wrapper = shallowMount(ChoroplethMapAnnotation, {
        propsData: {
          latitude: 0,
          longitude: 0
        },
        provide: { parent },
        computed: {
          // Mocked value less than default threshold of 1.57
          geoDistanceFromCenter: () => 1
        }
      })

      expect(wrapper.vm.isVisible).toBeTruthy()
    })

    it('is not visible when outside geoDistanceThreshold', () => {
      const wrapper = shallowMount(ChoroplethMapAnnotation, {
        propsData: {
          latitude: 0,
          longitude: 0
        },
        provide: { parent },
        computed: {
          geoDistanceFromCenter: () => 2
        }
      })

      expect(wrapper.vm.isVisible).toBeFalsy()
    })
  })
})
