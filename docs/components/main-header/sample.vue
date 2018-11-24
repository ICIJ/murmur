<template>
  <main-header no-headroom position="relative">
    <template slot="navbar">
      <ul class="navbar-nav mr-auto">
        <b-nav-dropdown @show="$root.$emit('bv::hide::popover')">
          <template slot="button-content">
            A long project name
          </template>
          <b-dropdown-item v-for="(item, $index) in dropdownItems"  :key="$index" :href="item.href" v-bind="{ active: !!item.active }">
            {{ item.label }}
          </b-dropdown-item>
        </b-nav-dropdown>
      </ul>
    </template>
  </main-header>
</template>



<script>
  import { MainHeader } from '@/main'
  import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
  import bNavDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown'

  export default {
    components: {
      MainHeader,
      bDropdownItem,
      bNavDropdown
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
    }
  }
</script>
