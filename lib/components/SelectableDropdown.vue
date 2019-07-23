<template>
  <div class="selectable-dropdown show" v-if="!hide" :class="{ 'selectable-dropdown--multiple': multiple, [listClass]: true }">
    <span v-for="(item, index) in items"
          :key="index"
          @click.exact="selectItem(item)"
          @click.ctrl="addItem(item)"
          @click.shift="selectRangeToItem(item)"
          :class="{ active: itemActivated(item), [itemClass]: true }"
          class="selectable-dropdown__item px-3 d-flex">
      <!-- @slot Item content -->
      <slot name="item">
        <div class="selectable-dropdown__item__check" v-if="multiple">
          <fa :icon="indexIcon(item)" class="mr-2" />
        </div>
        <div class="flex-grow-1 text-truncate selectable-dropdown__item__label">
          <!-- @slot Item's label content -->
          <slot name="item-label">
            {{ serializer(item) }}
          </slot>
        </div>
      </slot>
    </span>
  </div>
</template>

<script>
  import identity from 'lodash/identity'
  import castArray from 'lodash/castArray'
  import isArray from 'lodash/isArray'
  import isEqual from 'lodash/isEqual'
  import last from 'lodash/last'
  import range from 'lodash/range'
  import without from 'lodash/without'

  import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

  const KEY_ESC_CODE = 27
  const KEY_UP_CODE = 38
  const KEY_DOWN_CODE = 40

  // This variable contains the last active component.
  // A component is activated when it's activeItemIndexes change.
  let activeComponent = null

  export default {
    name: 'SelectableDropdown',
    props: {
      /**
       * The items of the list.
       */
      items: {
        type: Array,
        default () { return [] }
      },
      /**
       * The actual selected item.
       */
      value: {
        type: [String, Object, Array, Number],
        default: null
      },
      /**
       * If true, the dropdown is hidden and deactivated.
       */
      hide: {
        type: Boolean
      },
      /**
       * If true, the key events won't be propagated.
       */
      propagate: {
        type: Boolean
      },
      /**
       * The user can select values.
       */
      multiple: {
        type: Boolean
      },
      /**
       * A function to change the label rendering.
       */
      serializer: {
        type: Function,
        default: identity
      },
      /**
       * The class to apply to the list.
       */
      listClass: {
        type: String,
        default: 'dropdown-menu'
      },
      /**
       * The class to apply to each item.
       */
      itemClass: {
        type: String,
        default: 'dropdown-item'
      }
    },
    data () {
      return {
        activeItemIndexes: []
      }
    },
    mounted () {
      this.activateItemOrItems()
      this.toggleKeys()
    },
    destroyed () {
      this.unbindKeys()
    },
    watch: {
      hide () {
        this.toggleKeys()
      },
      activeItemIndexes () {
        this.activateComponent()
        const items = this.activeItemIndexes.map(index => this.items[index])
        /**
         * Fired when the selected value change. It will pass a canonical value
         * or an array of values if the property `multiple` is set to true.
         *
         * @event input
         * @type {String, Object, Array, Number}
         */
        this.$emit('input', this.multiple ? items : items[0])
      },
      value (itemOrItems) {
        const items = castArray(itemOrItems)
        if (!isEqual(this.activeItems, items)) {
          this.activateItemOrItems(items)
          this.activateComponent()
        }
      }
    },
    methods: {
      activateComponent () {
        activeComponent = this
        /**
         * Fired when the component is activated, meaning it can handle key
         * events.
         *
         * @event input
         */
        this.$emit('activate')
      },
      indexIcon (item) {
        return this.itemActivated(item) ? faCheckSquare : faSquare
      },
      itemActivated (item) {
        const index = this.items.indexOf(item)
        return this.activeItemIndexes.indexOf(index) > -1
      },
      selectItem (item) {
        if (this.itemActivated(item) && this.activeItemIndexes.length === 1) {
          this.activeItemIndexes = without(this.activeItemIndexes, this.items.indexOf(item))
        } else {
          this.activeItemIndexes = [ this.items.indexOf(item) ]
        }
      },
      addItem (item) {
        if (!this.itemActivated(item) && this.multiple) {
          this.activeItemIndexes.push(this.items.indexOf(item))
        } else {
          this.selectItem(item)
        }
      },
      selectRangeToItem (item) {
        // No activated items
        if (!this.activeItemIndexes.length || !this.multiple) {
          this.selectItem(item)
        } else {
          const index = this.items.indexOf(item)

          if (index > this.firstActiveItemIndex) {
            this.activeItemIndexes = range(this.firstActiveItemIndex, index + 1)
          } else {
            this.activeItemIndexes = range(index, this.firstActiveItemIndex + 1)
          }
        }
      },
      activateItemOrItems (itemOrItems  = this.value) {
        const items = isArray(itemOrItems) ? itemOrItems : [ itemOrItems ]
        this.activeItemIndexes = items.map(item => this.items.indexOf(item))
      },
      activatePreviousItem () {
        this.activeItemIndexes = [ Math.max(this.firstActiveItemIndex - 1, -1) ]
      },
      activateNextItem () {
        this.activeItemIndexes = [ Math.min(this.firstActiveItemIndex + 1, this.items.length - 1) ]
      },
      deactivateItems () {
        this.activeItemIndexes = []
      },
      keydown (event) {
        // The dropdown must be active
        if (!this.isActive()) return
        if (!this.propagate && this.isKnownKey(event.which)) {
          event.stopPropagation()
          event.preventDefault()
        }
        switch(event.which) {
          case KEY_UP_CODE:
            this.activatePreviousItem()
            break
          case KEY_DOWN_CODE:
            this.activateNextItem()
            break
          case KEY_ESC_CODE:
            this.deactivateItems()
            break
        }
      },
      isKnownKey (keycode) {
        return [KEY_UP_CODE, KEY_DOWN_CODE, KEY_ESC_CODE].indexOf(keycode) > -1
      },
      unbindKeys () {
        window.removeEventListener("keydown", this.keydown)
        // The component might need to be dactivated
        if (activeComponent === this) {
          activeComponent = null
        }
      },
      bindKeys () {
        window.addEventListener("keydown", this.keydown)
      },
      toggleKeys () {
        if (this.hide) {
          this.unbindKeys()
        } else {
          this.bindKeys()
        }
      },
      isActive () {
        return activeComponent === this
      }
    },
    computed: {
      firstActiveItemIndex () {
        return this.activeItemIndexes.length ? this.activeItemIndexes[0] : -1
      },
      lastActiveItemIndex () {
        return this.activeItemIndexes.length ? this.activeItemIndexes.slice(-1) : -1
      },
      activeItems () {
        return this.activeItemIndexes.map(index => this.items[index])
      }
    }
  }
</script>

<style lang="scss">
  .selectable-dropdown {
    position: relative;
    top: 0;
    left: 0;
    float: none;
    user-select: none;
  }
</style>
