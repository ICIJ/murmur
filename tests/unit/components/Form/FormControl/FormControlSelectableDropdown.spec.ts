import { mount, flushPromises } from '@vue/test-utils'
import SelectableDropdown from '@/components/Form/FormControl/FormControlSelectableDropdown.vue'

const KEY_UP_CODE = 38
const KEY_DOWN_CODE = 40
const KEY_MAP = {}

// Wrapper the addEventListener to trigger events
window.addEventListener = vi.fn((event, cb) => {
  KEY_MAP[event] = cb
})

describe('SelectableDropdown.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(SelectableDropdown)
    expect(wrapper.vm).toBeTruthy()
  })

  it('has a list of items', async () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      hide: false
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()
    expect(wrapper.findAll('.dropdown-item')).toHaveLength(3)
  })

  it('has a list of items written in upper case', async () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      serializer: c => c.toUpperCase()
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()

    expect(wrapper.find('#dropdown-item-lesotho').text()).toBe('LESOTHO')
    expect(wrapper.find('#dropdown-item-senegal').text()).toBe('SENEGAL')
    expect(wrapper.find('#dropdown-item-djibouti').text()).toBe('DJIBOUTI')
  })

  it('has a list a `list` class', () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      listClass: 'list'
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    expect(wrapper.find('.list').exists()).toBeTruthy()
  })

  it('has a list of items with a `item` class', async () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      itemClass: 'item'
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()

    expect(wrapper.find('#dropdown-item-lesotho').text()).toBe('Lesotho')
    expect(wrapper.find('#dropdown-item-senegal').text()).toBe('Senegal')
    expect(wrapper.find('#dropdown-item-djibouti').text()).toBe('Djibouti')
  })

  it('updates active indexes when hitting arrow down', async () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      modelValue: 'Lesotho'
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()

    expect(wrapper.vm.activeItems).toContain('Lesotho')
    KEY_MAP.keydown({ keyCode: KEY_DOWN_CODE })
    expect(wrapper.vm.activeItems).toContain('Senegal')
    KEY_MAP.keydown({ keyCode: KEY_DOWN_CODE })
    expect(wrapper.vm.activeItems).toContain('Djibouti')
  })

  it('updates active indexes when hitting arrow up', async () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      modelValue: 'Djibouti'
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()

    expect(wrapper.vm.activeItems).toContain('Djibouti')
    KEY_MAP.keydown({ keyCode: KEY_UP_CODE })
    expect(wrapper.vm.activeItems).toContain('Senegal')
    KEY_MAP.keydown({ keyCode: KEY_UP_CODE })
    expect(wrapper.vm.activeItems).toContain('Lesotho')
  })

  it('emits a `update:modelValue` event when a value is selected', async () => {
    const propsData = {
      items: ['Lesotho', 'Senegal', 'Djibouti'],
      modelValue: 'Djibouti'
    }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()

    await wrapper.find('#dropdown-item-lesotho').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toContain('Lesotho')

    await wrapper.find('#dropdown-item-senegal').trigger('click')
    expect(wrapper.emitted('update:modelValue')[1]).toContain('Senegal')
  })

  it('emits a `click` event when user click on an item', async () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'] }
    const wrapper = mount(SelectableDropdown, { propsData })
    await flushPromises()

    await wrapper.find('#dropdown-item-lesotho').trigger('click')
    expect(wrapper.emitted('click')[0]).toContain('Lesotho')
    await wrapper.find('#dropdown-item-senegal').trigger('click')
    expect(wrapper.emitted('click')[1]).toContain('Senegal')
    await wrapper.find('#dropdown-item-lesotho').trigger('click')
    expect(wrapper.emitted('click')[2]).toContain('Lesotho')
  })

  it('emits a `click` event when using `clickToSelectItem` method', () => {
    const propsData = { items: ['Lesotho', 'Senegal', 'Djibouti'] }
    const wrapper = mount(SelectableDropdown, { propsData })

    wrapper.vm.clickToSelectItem('Lesotho')
    expect(wrapper.emitted().click[0]).toContain('Lesotho')
    wrapper.vm.clickToSelectItem('Senegal')
    expect(wrapper.emitted().click[1]).toContain('Senegal')
    wrapper.vm.clickToSelectItem('Lesotho')
    expect(wrapper.emitted().click[2]).toContain('Lesotho')
  })

  describe('itemActivated', () => {
    it('marks only the actually-selected entry as active, not every entry sharing its value', async () => {
      // Regression test: aria-selected/active used to be computed by value
      // equality, so a value shared by several list entries lit up all of
      // them even though only one was selected.
      const propsData = {
        items: ['Paris', 'Paris', 'London'],
        modelValue: 'Paris'
      }
      const wrapper = mount(SelectableDropdown, { propsData })
      await flushPromises()

      // Pooled DOM order isn't list order, so look up by aria-posinset.
      const byPosinset = wrapper.findAll('.selectable-dropdown__item')
        .sort((a, b) => Number(a.attributes('aria-posinset')) - Number(b.attributes('aria-posinset')))
      expect(byPosinset[0].attributes('aria-selected')).toBe('true')
      expect(byPosinset[1].attributes('aria-selected')).toBe('false')
      expect(byPosinset[2].attributes('aria-selected')).toBe('false')
    })
  })

  describe('Large number of selectable options', () => {
    it('displays only 7 items in the DOM on the 20 items given', async () => {
      const twentyItems = Array.from(Array(20).keys())
      const propsData = { items: twentyItems }
      const wrapper = mount(SelectableDropdown, { propsData })
      await flushPromises()

      expect(wrapper.findAll('.dropdown-item')).toHaveLength(7)
    })
  })

  describe('accessibility', () => {
    it('exposes listbox/option roles and aria-selected', async () => {
      const propsData = {
        items: ['Lesotho', 'Senegal', 'Djibouti'],
        modelValue: 'Senegal'
      }
      const wrapper = mount(SelectableDropdown, { propsData })
      await flushPromises()

      expect(wrapper.find('.scroller').attributes('role')).toBe('listbox')
      expect(wrapper.find('#dropdown-item-senegal').attributes('role')).toBe('option')
      expect(wrapper.find('#dropdown-item-senegal').attributes('aria-selected')).toBe('true')
      expect(wrapper.find('#dropdown-item-lesotho').attributes('aria-selected')).toBe('false')
    })

    it('exposes aria-posinset/aria-setsize independent of DOM (pooled) order', async () => {
      // Regression test for the RecycleScroller DOM-order change: pooled item
      // nodes no longer come out in list order, so screen readers need
      // aria-posinset/aria-setsize (based on the scroller's own `index`) to
      // announce the correct position instead of relying on DOM order.
      const items = ['Lesotho', 'Senegal', 'Djibouti']
      const wrapper = mount(SelectableDropdown, { propsData: { items } })
      await flushPromises()

      items.forEach((item, index) => {
        const option = wrapper.find(`#dropdown-item-${item.toLowerCase()}`)
        expect(option.attributes('aria-posinset')).toBe(String(index + 1))
        expect(option.attributes('aria-setsize')).toBe(String(items.length))
      })
    })
  })
})
