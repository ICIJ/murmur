<template>
  <div class="full-width">
    <generic-header no-headroom position="relative" class="card m-4"></generic-header>
  </div>
</template>

<script>
  import { GenericFooter } from '@/main'

  export default {
    components: {
      GenericFooter
    }
  }
</script>

<style lang="scss">
  .full-width {
    overflow: auto;

    .generic-header {
      width: 100vw;
      max-width: 1000px;
    }
  }
</style>
