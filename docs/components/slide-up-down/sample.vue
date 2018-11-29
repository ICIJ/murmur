<template>
  <div class="card card-xs mx-auto m-4">
    <slide-up-down :active="show">
      <div class="card-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </slide-up-down>
    <div class="card-footer text-center">
      <button @click="show = !show" type="button" class="btn btn-info">
        Click to toggle
      </button>
    </div>
  </div>
</template>

<script>
  import { SlideUpDown } from '@/main'

  export default {
    components: {
      SlideUpDown
    },
    data () {
      return {
        show: true
      }
    }
  }
</script>
