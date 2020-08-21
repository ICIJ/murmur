import * as d3 from 'd3'
import { mount } from '@vue/test-utils'
import ColumnChart from '@/datavisualisations/ColumnChart.vue'

jest.mock('d3', () => {
  return {
    __esModule: true,
    ...jest.requireActual('d3')
  }
})


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

describe('ColumnChart.vue', () => {

  describe('a five columns chart with 1 highlight', () => {

    let wrapper

    beforeEach(async () => {

      const propsData = {
        data: [
            { date: 2000, value: 0 },
            { date: 2001, value: 1 },
            { date: 2002, value: 2 },
            { date: 2003, value: 3, highlight: true },
            { date: 2004, value: 4 }
        ]
      }

      wrapper = mount(ColumnChart, { propsData })
      wrapper.vm.$el.style.width = '500px'
      wrapper.vm.setSizes()
      await wrapper.vm.$nextTick()
    })

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('creates five x-axis ticks', async () => {
      expect(wrapper.findAll('.column-chart__axis--x .tick')).toHaveLength(5)
    })

    it('creates x-axis ticks with the right years ', async () => {
      const ticks = wrapper.findAll('.column-chart__axis--x .tick')
      expect(ticks.at(0).text()).toBe('2000')
      expect(ticks.at(1).text()).toBe('2001')
      expect(ticks.at(2).text()).toBe('2002')
      expect(ticks.at(3).text()).toBe('2003')
      expect(ticks.at(4).text()).toBe('2004')
    })

    it('creates five columns', async () => {
      expect(wrapper.findAll('.column-chart__columns__item')).toHaveLength(5)
    })

    it('creates the first column with minimum height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(0)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(0)
    })

    it('creates the third column with medium height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(2)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(wrapper.vm.padded.height / 2)
    })

    it('creates the last column with maximum height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(4)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(wrapper.vm.padded.height)
    })

    it('should highlight only the fourth column', async () => {
      const columns = wrapper.findAll('.column-chart__columns__item')
      expect(columns.at(0).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(1).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(2).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(3).classes('column-chart__columns__item--highlight')).toBeTruthy()
      expect(columns.at(4).classes('column-chart__columns__item--highlight')).toBeFalsy()
    })
  })

  describe('a two columns chart with no highlights using remote JSON', () => {

    let wrapper

    beforeAll(async () => {
      d3.json = jest.fn().mockReturnValue([
        { date: 2019, value: 50 },
        { date: 2020, value: 100 }
      ])
    })

    beforeEach(async () => {
      const propsData = { data: 'http://localhost/data.json' }
      wrapper = mount(ColumnChart, { propsData })
      wrapper.vm.$el.style.width = '500px'
      wrapper.vm.setSizes()
      await wrapper.vm.$nextTick()
    })

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('creates two x-axis ticks', async () => {
      expect(wrapper.findAll('.column-chart__axis--x .tick')).toHaveLength(2)
    })

    it('creates x-axis ticks with the right years ', async () => {
      const ticks = wrapper.findAll('.column-chart__axis--x .tick')
      expect(ticks.at(0).text()).toBe('2019')
      expect(ticks.at(1).text()).toBe('2020')
    })

    it('creates two columns', async () => {
      expect(wrapper.findAll('.column-chart__columns__item')).toHaveLength(2)
    })

    it('creates the first column with medium height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(0)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(wrapper.vm.padded.height / 2)
    })

    it('creates the second column with maximum height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(1)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(wrapper.vm.padded.height)
    })

    it('should have no highlighted column', async () => {
      const columns = wrapper.findAll('.column-chart__columns__item')
      expect(columns.at(0).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(1).classes('column-chart__columns__item--highlight')).toBeFalsy()
    })
  })

  describe('a 10 columns chart with two highlights using remote CSV', () => {

    let wrapper

    beforeAll(async () => {
      d3.csv = jest.fn().mockReturnValue([
        { date: 2000, indicator: 0, highlight: false },
        { date: 2001, indicator: 10, highlight: false },
        { date: 2002, indicator: 20, highlight: false },
        { date: 2003, indicator: 30, highlight: false },
        { date: 2004, indicator: 40, highlight: false },
        { date: 2005, indicator: 50, highlight: true },
        { date: 2006, indicator: 60, highlight: false },
        { date: 2007, indicator: 70, highlight: true },
        { date: 2008, indicator: 80, highlight: false },
        { date: 2009, indicator: 90, highlight: false }
      ])
    })

    beforeEach(async () => {
      const propsData = {
        data: 'http://localhost/data.csv',
        dataUrlType: 'csv',
        seriesName: 'indicator'
      }
      wrapper = mount(ColumnChart, { propsData })
      wrapper.vm.$el.style.width = '500px'
      wrapper.vm.setSizes()
      await wrapper.vm.$nextTick()
    })

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('creates ten x-axis ticks', async () => {
      expect(wrapper.findAll('.column-chart__axis--x .tick')).toHaveLength(10)
    })

    it('creates x-axis ticks with the right years ', async () => {
      const ticks = wrapper.findAll('.column-chart__axis--x .tick')
      expect(ticks.at(0).text()).toBe('2000')
      expect(ticks.at(1).text()).toBe('2001')
      expect(ticks.at(2).text()).toBe('2002')
      expect(ticks.at(3).text()).toBe('2003')
      expect(ticks.at(4).text()).toBe('2004')
      expect(ticks.at(5).text()).toBe('2005')
      expect(ticks.at(6).text()).toBe('2006')
      expect(ticks.at(7).text()).toBe('2007')
      expect(ticks.at(8).text()).toBe('2008')
      expect(ticks.at(9).text()).toBe('2009')
    })

    it('creates ten columns', async () => {
      expect(wrapper.findAll('.column-chart__columns__item')).toHaveLength(10)
    })

    it('creates the first column with medium height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(0)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(0)
    })

    it('creates the last column with maximum height', async () => {
      const column = wrapper.findAll('.column-chart__columns__item').at(9)
      const height = parseFloat(column.attributes('height'))
      expect(height).toBe(wrapper.vm.padded.height)
    })

    it('should have two highlighted columns', async () => {
      const columns = wrapper.findAll('.column-chart__columns__item')
      expect(columns.at(0).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(1).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(2).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(3).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(4).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(5).classes('column-chart__columns__item--highlight')).toBeTruthy()
      expect(columns.at(6).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(7).classes('column-chart__columns__item--highlight')).toBeTruthy()
      expect(columns.at(8).classes('column-chart__columns__item--highlight')).toBeFalsy()
      expect(columns.at(9).classes('column-chart__columns__item--highlight')).toBeFalsy()
    })
  })
})
