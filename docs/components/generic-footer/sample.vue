<template>
  <div class="card m-4">
    <generic-footer></generic-footer>
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

<style lang="scss" scoped>
  .card {
    width: 100vw;
  }
</style>
