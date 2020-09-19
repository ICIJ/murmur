import { mount } from '@vue/test-utils'
import StackedColumnChart from '@/datavisualisations/StackedColumnChart.vue'

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

describe('StackedColumnChart.vue', () => {

  describe('a stacked-colmuns chart with two columns in four groups', () => {

    let wrapper

    beforeEach(async () => {

      const propsData = {
        data: [
          { date: 2006, foo: 90, bar: 10 },
          { date: 2007, foo: 80, bar: 10 },
          { date: 2008, foo: 70, bar: 10 },
          { date: 2009, foo: 60, bar: 10 }
        ]
      }

      wrapper = mount(StackedColumnChart, { propsData })
    })

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('creates four columns', async () => {
      expect(wrapper.findAll('.stacked-column-chart__groups__item')).toHaveLength(4)
    })

    it('creates the first group of columns with maximum height', () => {
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const fooColumn = firstGroup.find('.stacked-column-chart__groups__item__bars__item--foo')
      const barColumn = firstGroup.find('.stacked-column-chart__groups__item__bars__item--bar')
      const totalHeight = fooColumn.element.offsetHeight + barColumn.element.offsetHeight
      expect(totalHeight).toBe(100)
    })

    it('creates the second group of columns with ~90% height', () => {
      const secondGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(1)
      const fooColumn = secondGroup.find('.stacked-column-chart__groups__item__bars__item--foo')
      const barColumn = secondGroup.find('.stacked-column-chart__groups__item__bars__item--bar')
      const totalHeight = fooColumn.element.offsetHeight + barColumn.element.offsetHeight
      expect(totalHeight).toBe(90)
    })

    it('creates the third group of columns with ~80% height', () => {
      const secondGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(2)
      const fooColumn = secondGroup.find('.stacked-column-chart__groups__item__bars__item--foo')
      const barColumn = secondGroup.find('.stacked-column-chart__groups__item__bars__item--bar')
      const totalHeight = fooColumn.element.offsetHeight + barColumn.element.offsetHeight
      expect(totalHeight).toBe(80)
    })

    it('creates the first group of columns with `foo` taking 90% height', () => {
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const fooColumn = firstGroup.find('.stacked-column-chart__groups__item__bars__item--foo')
      const width = fooColumn.element.offsetHeight
      expect(width).toBe(90)
    })

    it('creates the first group of columns with `bar` taking 10% height', () => {
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const barColumn = firstGroup.find('.stacked-column-chart__groups__item__bars__item--bar')
      const width = barColumn.element.offsetHeight
      expect(width).toBe(10)
    })

    it('creates the first group with "2006" as label', () => {
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const label = firstGroup.find('.stacked-column-chart__groups__item__label')
      expect(label.text()).toBe("2006")
    })

    it('creates the second group with "2007" as label', () => {
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(1)
      const label = firstGroup.find('.stacked-column-chart__groups__item__label')
      expect(label.text()).toBe("2007")
    })

    it('creates the first group with "2009" as label when ordered by "foo"', async () => {
      wrapper.setProps({ sortBy: 'foo' })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const label = firstGroup.find('.stacked-column-chart__groups__item__label')
      expect(label.text()).toBe("2009")
    })

    it('creates a legend with "foo" and "bar" items', () => {
      const fooLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(0)
      const barLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(1)
      expect(fooLegend.text()).toBe("foo")
      expect(barLegend.text()).toBe("bar")
    })

    it('hightlight the legend "foo"', async () => {
      const fooLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(0)
      expect(fooLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeFalsy()
      fooLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      expect(fooLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeTruthy()
    })

    it('hightlight the columns for "foo"', async () => {
      const fooLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(0)
      fooLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      const fooColumns = wrapper.findAll('.stacked-column-chart__groups__item__bars__item--foo')
      expect(fooColumns.at(0).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(fooColumns.at(1).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(fooColumns.at(2).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(fooColumns.at(3).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
    })

    it('hightlight the columns for "bar"', async () => {
      const barLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(1)
      barLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      const budgetBars = wrapper.findAll('.stacked-column-chart__groups__item__bars__item--bar')
      expect(budgetBars.at(0).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(1).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(2).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
      expect(budgetBars.at(3).classes('stacked-column-chart__groups__item__bars__item--highlighted')).toBeTruthy()
    })

    it('hightlight the legend "foo" on mouseover and "bar" by default', async () => {
      wrapper.setProps({ highlights: ['bar'] })
      await wrapper.vm.$nextTick()
      const fooLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(0)
      const barLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(1)
      expect(fooLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeFalsy()
      expect(barLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeTruthy()
      fooLegend.trigger('mouseover')
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay))
      expect(fooLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeTruthy()
      expect(barLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeFalsy()
    })

    it('hightlight the columns for "bar" after a while', async () => {
      const barLegend = wrapper.findAll('.stacked-column-chart__legend__item').at(1)
      barLegend.trigger('mouseover')
      expect(barLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeFalsy()
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay / 2))
      expect(barLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeFalsy()
      await new Promise(r => setTimeout(r, wrapper.vm.highlightDelay / 2))
      expect(barLegend.classes('stacked-column-chart__legend__item--highlighted')).toBeTruthy()
    })

    it('creates columns with specific colors', async () => {
      wrapper.setProps({ barColors: [ "#000", "#444" ] })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const fooColumn = firstGroup.find('.stacked-column-chart__groups__item__bars__item--foo')
      const barColumn = firstGroup.find('.stacked-column-chart__groups__item__bars__item--bar')
      expect(fooColumn.element.style['background-color']).toBe('rgb(0, 0, 0)')
      expect(barColumn.element.style['background-color']).toBe('rgb(68, 68, 68)')
    })

    it('creates legend with specific colors', async () => {
      wrapper.setProps({ barColors: [ "#000", "#444" ] })
      await wrapper.vm.$nextTick()
      const legendBoxes = wrapper.findAll('.stacked-column-chart__legend__item__box')
      const budgetBox = legendBoxes.at(0)
      const boxOfficeBox = legendBoxes.at(1)
      expect(budgetBox.element.style['background-color']).toBe('rgb(0, 0, 0)')
      expect(boxOfficeBox.element.style['background-color']).toBe('rgb(68, 68, 68)')
    })

    it('creates one legend when using explicite keys', async () => {
      wrapper.setProps({ keys: [ "foo" ] })
      await wrapper.vm.$nextTick()
      const legendItems = wrapper.findAll('.stacked-column-chart__legend__item')
      expect(legendItems).toHaveLength(1)
    })

    it('creates one bar when using explicite keys', async () => {
      wrapper.setProps({ keys: [ "foo" ] })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const columns = firstGroup.findAll('.stacked-column-chart__groups__item__bars__item')
      expect(columns).toHaveLength(1)
    })

    it('creates legend with custom group names', async () => {
      wrapper.setProps({ groups: [ "Foo", "Bar" ] })
      await wrapper.vm.$nextTick()
      const legendItems = wrapper.findAll('.stacked-column-chart__legend__item')
      expect(legendItems.at(0).text()).toBe("Foo")
      expect(legendItems.at(1).text()).toBe("Bar")
    })

    it('creates bar direct labeling without formatting', async () => {
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const values = firstGroup.findAll('.stacked-column-chart__groups__item__bars__item__value')
      expect(values.at(0).text()).toBe('90')
      expect(values.at(1).text()).toBe('10')
    })

    it('creates bar direct labeling without with currency formatting', async () => {
      wrapper.setProps({ yAxisTickFormat: '$,' })
      await wrapper.vm.$nextTick()
      const firstGroup = wrapper.findAll('.stacked-column-chart__groups__item').at(0)
      const values = firstGroup.findAll('.stacked-column-chart__groups__item__bars__item__value')
      expect(values.at(0).text()).toBe('$90')
      expect(values.at(1).text()).toBe('$10')
    })
  })
})
