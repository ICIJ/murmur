<template>
  <div class="full-width">
    <generic-footer class="card m-4"></generic-footer>
  </div>
</template>

<script>
  import { GenericFooter } from '@root/main'

  export default {
    components: {
      GenericFooter
    }
  }
</script>

<style lang="scss" scoped>
  .full-width {
    overflow: auto;
    .generic-footer {
      width: 100vw;
    }
  }
</style>
