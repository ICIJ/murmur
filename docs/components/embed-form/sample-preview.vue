<template>
  <div class="sample">
    <embed-form url="https://projects.icij.org/the-implant-files/graphics/#/device-related-incidents-in-europe?no-embeddable-footer=1" :height="440" class="card m-4 py-2"></embed-form>
  </div>
</template>

<script>
  import EmbedForm from '@/components/EmbedForm'

  export default {
    components: {
      EmbedForm
    }
  }
</script>

<style scoped>
  .sample {
    overflow: auto;
  }

  .card {
    min-width: 990px;
  }
</style>
