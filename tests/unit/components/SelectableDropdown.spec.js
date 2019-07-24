import { mount } from '@vue/test-utils'
import SelectableDropdown from '@/components/SelectableDropdown.vue'

const KEY_ESC_CODE = 27
const KEY_UP_CODE = 38
const KEY_DOWN_CODE = 40
const KEY_MAP = {}

// Wrapper the addEventListener to trigger events
window.addEventListener = jest.fn((event, cb) => {
  KEY_MAP[event] = cb
})

describe('SelectableDropdown.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = mount(SelectableDropdown)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a list of items', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'] }
    const wrapper = mount(SelectableDropdown, { propsData })
    expect(wrapper.findAll('.dropdown-item')).toHaveLength(3)
  })

  it('has a list of items written in upper case', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'], serializer: c => c.toUpperCase() }
    const wrapper = mount(SelectableDropdown, { propsData })
    expect(wrapper.findAll('.dropdown-item').at(0).text()).toBe('LESOTHO')
    expect(wrapper.findAll('.dropdown-item').at(1).text()).toBe('SENEGAL')
    expect(wrapper.findAll('.dropdown-item').at(2).text()).toBe('DJIBOUTI')
  })

  it('has a list a `list` class', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'], listClass: 'list' }
    const wrapper = mount(SelectableDropdown, { propsData })
    expect(wrapper.find('.list').exists()).toBeTruthy()
  })

  it('has a list of items with a `item` class', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'], itemClass: 'item' }
    const wrapper = mount(SelectableDropdown, { propsData })
    expect(wrapper.findAll('.item').at(0).text()).toBe('Lesotho')
    expect(wrapper.findAll('.item').at(1).text()).toBe('Senegal')
    expect(wrapper.findAll('.item').at(2).text()).toBe('Djibouti')
  })

  it('updates active indexes when hitting arrow down', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'], value: 'Lesotho' }
    const wrapper = mount(SelectableDropdown, { propsData })

    expect(wrapper.vm.activeItems).toContain('Lesotho')
    KEY_MAP.keydown({ keyCode: KEY_DOWN_CODE })
    expect(wrapper.vm.activeItems).toContain('Senegal')
    KEY_MAP.keydown({ keyCode: KEY_DOWN_CODE })
    expect(wrapper.vm.activeItems).toContain('Djibouti')
  })

  it('updates active indexes when hitting arrow up', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'], value: 'Djibouti' }
    const wrapper = mount(SelectableDropdown, { propsData })

    expect(wrapper.vm.activeItems).toContain('Djibouti')
    KEY_MAP.keydown({ keyCode: KEY_UP_CODE })
    expect(wrapper.vm.activeItems).toContain('Senegal')
    KEY_MAP.keydown({ keyCode: KEY_UP_CODE })
    expect(wrapper.vm.activeItems).toContain('Lesotho')
  })

  it('emits a `input` event when a value is selected', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'], value: 'Djibouti' }
    const wrapper = mount(SelectableDropdown, { propsData })


    expect(wrapper.emitted().input[0]).toContain('Djibouti')
    wrapper.vm.selectItem('Lesotho')
    expect(wrapper.emitted().input[1]).toContain('Lesotho')
    wrapper.vm.selectItem('Senegal')
    expect(wrapper.emitted().input[2]).toContain('Senegal')
  })

  it('emits a `click` event when user click on an item', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'] }
    const wrapper = mount(SelectableDropdown, { propsData })

    wrapper.findAll('.dropdown-item').at(0).trigger('click')
    expect(wrapper.emitted().click[0]).toContain('Lesotho')
    wrapper.findAll('.dropdown-item').at(1).trigger('click')
    expect(wrapper.emitted().click[1]).toContain('Senegal')
    wrapper.findAll('.dropdown-item').at(0).trigger('click')
    expect(wrapper.emitted().click[2]).toContain('Lesotho')
  })

  it('emits a `click` event when using `clickToSelectItem` method', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'] }
    const wrapper = mount(SelectableDropdown, { propsData })

    wrapper.vm.clickToSelectItem('Lesotho')
    expect(wrapper.emitted().click[0]).toContain('Lesotho')
    wrapper.vm.clickToSelectItem('Senegal')
    expect(wrapper.emitted().click[1]).toContain('Senegal')
    wrapper.vm.clickToSelectItem('Lesotho')
    expect(wrapper.emitted().click[2]).toContain('Lesotho')
  })
})
