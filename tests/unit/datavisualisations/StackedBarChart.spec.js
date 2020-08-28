import { mount } from '@vue/test-utils'
import StackedBarChart from '@/datavisualisations/StackedBarChart.vue'

// Mock HTML element offset so the size of the chart can be calculated
// dynamicly using JSDOM and tests
Object.defineProperties(window.HTMLElement.prototype, {
  offsetWidth: {
    get () { return parseFloat(this.style.width) || 0 }
  },
  offsetHeight: {
    get () { return parseFloat(this.style.height) || 0 }
  }
})

describe('StackedBarChart.vue', () => {

  describe('a stacked-bars chart with two bars in four groups', () => {

    let wrapper

    beforeEach(async () => {

      const propsData = {
        data: [
          { label: "Avatar", budget: 237, box_office: 2784 },
          { label: "ET: The Extra-Terrestrial", budget: 11, box_office: 793 },
          { label: "Finding Nemo", budget: 94, box_office: 940 },
          { label: "Ghostbusters", budget: 14, box_office: 229 }
        ]
      }

      wrapper = mount(StackedBarChart, { propsData })
    })

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('creates five bars', async () => {
      expect(wrapper.findAll('.stacked-bar-chart__groups__item')).toHaveLength(4)
    })

    it('creates the first group of bars with maximum width', () => {
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const budgetBar = firstGroup.find('.stacked-bar-chart__groups__item__bars__item--budget')
      const boxOfficeBar = firstGroup.find('.stacked-bar-chart__groups__item__bars__item--box_office')
      const totalWidth = budgetBar.element.offsetWidth + boxOfficeBar.element.offsetWidth
      expect(totalWidth).toBe(100)
    })

    it('creates the second group of bars with ~27% width', () => {
      const secondGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(1)
      const budgetBar = secondGroup.find('.stacked-bar-chart__groups__item__bars__item--budget')
      const boxOfficeBar = secondGroup.find('.stacked-bar-chart__groups__item__bars__item--box_office')
      const totalWidth = Math.round(budgetBar.element.offsetWidth + boxOfficeBar.element.offsetWidth)
      expect(totalWidth).toBe(27)
    })

    it('creates the third group of bars with ~34% width', () => {
      const secondGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(2)
      const budgetBar = secondGroup.find('.stacked-bar-chart__groups__item__bars__item--budget')
      const boxOfficeBar = secondGroup.find('.stacked-bar-chart__groups__item__bars__item--box_office')
      const totalWidth = Math.round(budgetBar.element.offsetWidth + boxOfficeBar.element.offsetWidth)
      expect(totalWidth).toBe(34)
    })

    it('creates the first group of bars with budget taking ~8% width', () => {
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const budgetBar = firstGroup.find('.stacked-bar-chart__groups__item__bars__item--budget')
      const width = Math.round(budgetBar.element.offsetWidth)
      expect(width).toBe(8)
    })

    it('creates the first group of bars with box_office taking ~92% width', () => {
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const boxOfficeBar = firstGroup.find('.stacked-bar-chart__groups__item__bars__item--box_office')
      const width = Math.round(boxOfficeBar.element.offsetWidth)
      expect(width).toBe(92)
    })

    it('creates the first group with "Avatar" as label', () => {
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const label = firstGroup.find('.stacked-bar-chart__groups__item__label')
      expect(label.text()).toBe("Avatar")
    })

    it('creates the second group with "ET: The Extra-Terrestrial" as label', () => {
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(1)
      const label = firstGroup.find('.stacked-bar-chart__groups__item__label')
      expect(label.text()).toBe("ET: The Extra-Terrestrial")
    })

    it('creates the first group with "Avatar" as label when ordered by "budget"', async () => {
      wrapper.setProps({ sortBy: 'budget' })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const label = firstGroup.find('.stacked-bar-chart__groups__item__label')
      expect(label.text()).toBe("ET: The Extra-Terrestrial")
    })

    it('creates a legend with "budget" and "box_office" items', () => {
      const budgetLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(0)
      const boxOfficeLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(1)
      expect(budgetLegend.text()).toBe("budget")
      expect(boxOfficeLegend.text()).toBe("box_office")
    })

    it('hightlight the legend "budget"', async () => {
      const budgetLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(0)
      expect(budgetLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeFalsy()
      budgetLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      expect(budgetLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeTruthy()
    })

    it('hightlight the bars for "budget"', async () => {
      const budgetLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(0)
      budgetLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      const budgetBars = wrapper.findAll('.stacked-bar-chart__groups__item__bars__item--budget')
      expect(budgetBars.at(0).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(1).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(2).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(3).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
    })

    it('hightlight the bars for "box_office"', async () => {
      const boxOfficeLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(1)
      boxOfficeLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      const budgetBars = wrapper.findAll('.stacked-bar-chart__groups__item__bars__item--box_office')
      expect(budgetBars.at(0).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(1).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(2).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(3).classes('stacked-bar-chart__groups__item__bars__item--highlighted')).toBeTruthy()
    })

    it('hightlight the legend "budget" on mouseover and "box_office" by default', async () => {
      wrapper.setProps({ highlights: ['box_office'] })
      await wrapper.vm.$nextTick()
      const budgetLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(0)
      const boxOfficeLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(1)
      expect(budgetLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeFalsy()
      expect(boxOfficeLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeTruthy()
      budgetLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      expect(budgetLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeTruthy()
      expect(boxOfficeLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeFalsy()
    })

    it('hightlight the bars for "box_office" after a while', async () => {
      const boxOfficeLegend = wrapper.findAll('.stacked-bar-chart__legend__item').at(1)
      boxOfficeLegend.trigger('mouseover')
      expect(boxOfficeLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeFalsy()
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay / 2))
      expect(boxOfficeLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeFalsy()
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay / 2))
      expect(boxOfficeLegend.classes('stacked-bar-chart__legend__item--highlighted')).toBeTruthy()
    })

    it('creates bars with specific colors', async () => {
      wrapper.setProps({ barColors: [ "#000", "#444" ] })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const budgetBar = firstGroup.find('.stacked-bar-chart__groups__item__bars__item--budget')
      const boxOfficeBar = firstGroup.find('.stacked-bar-chart__groups__item__bars__item--box_office')
      expect(budgetBar.element.style['background-color']).toBe('rgb(0, 0, 0)')
      expect(boxOfficeBar.element.style['background-color']).toBe('rgb(68, 68, 68)')
    })

    it('creates legend with specific colors', async () => {
      wrapper.setProps({ barColors: [ "#000", "#444" ] })
      await wrapper.vm.$nextTick()
      const legendBoxes = wrapper.findAll('.stacked-bar-chart__legend__item__box')
      const budgetBox = legendBoxes.at(0)
      const boxOfficeBox = legendBoxes.at(1)
      expect(budgetBox.element.style['background-color']).toBe('rgb(0, 0, 0)')
      expect(boxOfficeBox.element.style['background-color']).toBe('rgb(68, 68, 68)')
    })

    it('creates one legend when using explicite keys', async () => {
      wrapper.setProps({ keys: [ "box_office" ] })
      await wrapper.vm.$nextTick()
      const legendItems = wrapper.findAll('.stacked-bar-chart__legend__item')
      expect(legendItems).toHaveLength(1)
    })

    it('creates one bar when using explicite keys', async () => {
      wrapper.setProps({ keys: [ "box_office" ] })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-bar-chart__groups__item').at(0)
      const bars = firstGroup.findAll('.stacked-bar-chart__groups__item__bars__item')
      expect(bars).toHaveLength(1)
    })

    it('creates legend with custom group names', async () => {
      wrapper.setProps({ groups: [ "Budget", "Box Office" ] })
      await wrapper.vm.$nextTick()
      const legendItems = wrapper.findAll('.stacked-bar-chart__legend__item')
      expect(legendItems.at(0).text()).toBe("Budget")
      expect(legendItems.at(1).text()).toBe("Box Office")
    })
  })
})
