<template>
  <div class="full-width">
    <imddb-header no-headroom position="relative" ref="header">
      <template slot="navbar">
        <ul class="navbar-nav mr-auto">
          <b-nav-item-dropdown @show="$root.$emit('bv::hide::popover')">
            <template slot="button-content">
              A long project name
            </template>
            <b-dropdown-item v-for="(item, $index) in dropdownItems"  :key="$index" :href="item.href" v-bind="{ active: !!item.active }">
              {{ item.label }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </ul>
      </template>
    </imddb-header>
  </div>
</template>

<script>
  import { ImddbHeader } from '@root/main'
  import { BDropdownItem } from 'bootstrap-vue/esm/components/dropdown/dropdown-item'
  import { BNavItemDropdown } from 'bootstrap-vue/esm/components/nav/nav-item-dropdown'

  export default {
    components: {
      ImddbHeader,
      BDropdownItem,
      BNavItemDropdown
    },
    data () {
      return {
        dropdownItems: [
          { label: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit', href: "https://www.pirhoo.com" },
          { label: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ', href: "https://www.pirhoo.com" },
          { label: 'Lorem ipsum dolor sit amet', href: "https://www.pirhoo.com" },
          { label: 'culpa qui officia deserunt mollit anim id est laborum', href: "https://www.pirhoo.com" },
          { label: 'Lorem dolor sit amet', href: "https://www.pirhoo.com" },
        ]
      }
    },
    mounted () {
      // Add languages after a first delay (like )
      setTimeout(() => {
        this.$refs.header.setLanguages([
          { label: 'English', href: '/', active: true },
          { label: 'Français', href: '/' }
        ])
      }, 500)
    }
  }
</script>

<style lang="scss">
  .full-width {
    overflow: auto;

    .imddb-header {
      min-width: 990px;
    }
  }
</style>
