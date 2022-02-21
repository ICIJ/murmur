import 'isomorphic-fetch'
import { zipObjectDeep } from 'lodash'
import { shallowMount } from '@vue/test-utils'
import SymbolMap from '@/maps/SymbolMap.vue'

describe('SymbolMap.vue', () => {

  describe('a map of the world', () => {

    let wrapper

    beforeEach(async () => {
      const propsData = {
        data: [
          { id: 1, latitude: 48.859116, longitude: 2.331839, color: '#6e40aa', category: 'TECH', label: 'Paris, France' },
          { id: 2, latitude: -34.035875, longitude: 151.194191, color: '#ff5e63', category: 'FINANCE', label: 'Syndey, Australia' },
          { id: 3, latitude: 38.9072, longitude: -77.0369, color: '#aff05b', category: 'EDITO', label: 'Whasington DC, USA' }
        ]
      }
      wrapper = shallowMount(SymbolMap, { propsData })
      wrapper.vm.$el.style.width = '500px'
      await wrapper.vm.loadTopojson()
      await wrapper.vm.$nextTick()
    })

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('has a marker in the tech category', () => {
      const feature = wrapper.find('.symbol-map__main__markers__item--category-tech')
      const { nodeValue: fill } = feature.element.getAttributeNode('fill')
      expect(fill).toBe('#6e40aa')
    })

    it('activates the cursor when mouse is over a marker', () => {
      const feature = wrapper.find('.symbol-map__main__markers__item--category-tech')
      feature.element.dispatchEvent(new Event('mouseover'))
      expect(wrapper.vm.cursorIdentifier).toBe(1)
    })    
    
    it('has a marker in the finance category', () => {
      const feature = wrapper.find('.symbol-map__main__markers__item--category-finance')
      const { nodeValue: fill } = feature.element.getAttributeNode('fill')
      expect(fill).toBe('#ff5e63')
    })

    it('activates the cursor when mouse is over a marker', () => {
      const feature = wrapper.find('.symbol-map__main__markers__item--category-finance')
      feature.element.dispatchEvent(new Event('mouseover'))
      expect(wrapper.vm.cursorIdentifier).toBe(2) 
    })

    it('deactivates the cursor when mouse leaves a marker', () => {
      wrapper.setData({ cursorIdentifier: 3 })
      const feature = wrapper.find('.symbol-map__main__markers__item--category-edito')
      feature.element.dispatchEvent(new Event('mouseleave'))
      expect(wrapper.vm.cursorIdentifier).toBe(null)
    })

    it('set a class to the component when a cursor is active', async () => {
      const feature = wrapper.find('.symbol-map__main__markers__item--category-tech')
      feature.element.dispatchEvent(new Event('mouseover'))
      await wrapper.vm.$nextTick()
      expect(wrapper.classes('symbol-map--has-cursor')).toBeTruthy()
    })

    it('remove the class to the component when a cursor is removed', async () => {
      await wrapper.setData({ cursorIdentifier: 2 })
      expect(wrapper.classes('symbol-map--has-cursor')).toBeTruthy()
      const feature = wrapper.find('.symbol-map__main__markers__item--category-finance')
      feature.element.dispatchEvent(new Event('mouseleave'))
      await wrapper.vm.$nextTick()
      expect(wrapper.classes('symbol-map--has-cursor')).toBeFalsy()
    })
  })
})
