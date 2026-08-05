import equals from 'lodash/eq'
import { nextTick, ref } from 'vue'
import { useSelectableDropdown } from '@/composables/useSelectableDropdown'

describe('useSelectableDropdown', () => {
  const STRING_ITEMS = ['Lesotho', 'Senegal', 'Djibouti']

  const createDropdown = ({
    items = STRING_ITEMS,
    multiple = false,
    modelValue = null,
    activeItems = [],
    eq = equals
  } = {}) => {
    const activeItemsRef = ref(activeItems)
    const modelValueRef = ref(modelValue)
    const control = useSelectableDropdown({
      activeItems: activeItemsRef,
      modelValue: modelValueRef,
      items: () => items,
      multiple: () => multiple,
      eq: () => eq
    })
    return { ...control, activeItems: activeItemsRef, modelValue: modelValueRef }
  }

  it('reports whether an item is active', () => {
    const { itemActivated, activeItems } = createDropdown({
      activeItems: ['Lesotho']
    })
    expect(itemActivated('Lesotho')).toBe(true)
    expect(itemActivated('Senegal')).toBe(false)
    expect(activeItems.value).toEqual(['Lesotho'])
  })

  it('reports whether an item is active with a custom eq', () => {
    const eq = (item, other) => item.label === other.label
    const { itemActivated } = createDropdown({
      items: [{ label: 'Lesotho' }, { label: 'Senegal' }, { label: 'Djibouti' }],
      activeItems: [{ label: 'Lesotho' }],
      eq
    })
    expect(itemActivated({ label: 'Lesotho' })).toBe(true)
    expect(itemActivated({ label: 'Senegal' })).toBe(false)
  })

  it('resolves each active item to a single distinct index, even with duplicate values', () => {
    const { itemActivatedAtIndex, selectItem } = createDropdown({
      items: ['Paris', 'Paris', 'London'],
      activeItems: []
    })
    selectItem('Paris')
    expect(itemActivatedAtIndex(0)).toBe(true)
    expect(itemActivatedAtIndex(1)).toBe(false)
    expect(itemActivatedAtIndex(2)).toBe(false)
  })

  it('selects a single item', () => {
    const { selectItem, activeItems } = createDropdown()
    selectItem('Senegal')
    expect(activeItems.value).toEqual(['Senegal'])
  })

  it('toggles off the only active item when reselected', () => {
    const { selectItem, activeItems } = createDropdown({
      activeItems: ['Senegal']
    })
    selectItem('Senegal')
    expect(activeItems.value).toEqual([])
  })

  it('adds and removes items in multiple mode', () => {
    const { addItem, activeItems } = createDropdown({ multiple: true })
    addItem('Lesotho')
    addItem('Senegal')
    expect(activeItems.value).toEqual(['Lesotho', 'Senegal'])
    addItem('Lesotho')
    expect(activeItems.value).toEqual(['Senegal'])
  })

  it('selects a contiguous range up to an item', () => {
    const { selectRangeToItem, activeItems } = createDropdown({
      multiple: true,
      activeItems: ['Lesotho']
    })
    selectRangeToItem('Djibouti')
    expect(activeItems.value).toEqual(STRING_ITEMS)
  })

  it('navigates to the next and previous item', () => {
    const { activateNextItem, activatePreviousItem, activeItems } = createDropdown({
      activeItems: ['Lesotho']
    })
    activateNextItem()
    expect(activeItems.value).toEqual(['Senegal'])
    activateNextItem()
    expect(activeItems.value).toEqual(['Djibouti'])
    activatePreviousItem()
    expect(activeItems.value).toEqual(['Senegal'])
  })

  it('clears the active set', () => {
    const { clearActiveItems, activeItems } = createDropdown({
      activeItems: ['Lesotho']
    })
    clearActiveItems()
    expect(activeItems.value).toEqual([])
  })

  it('projects the active set into the single model value', async () => {
    const { selectItem, modelValue } = createDropdown()
    selectItem('Senegal')
    await nextTick()
    expect(modelValue.value).toBe('Senegal')
  })

  it('projects the active set into the array model value in multiple mode', async () => {
    const { addItem, modelValue } = createDropdown({ multiple: true })
    addItem('Lesotho')
    await nextTick()
    expect(modelValue.value).toEqual(['Lesotho'])
  })

  it('mirrors the model value into the active set', async () => {
    const { modelValue, activeItems } = createDropdown()
    modelValue.value = 'Djibouti'
    await nextTick()
    expect(activeItems.value).toEqual(['Djibouti'])
  })
})
