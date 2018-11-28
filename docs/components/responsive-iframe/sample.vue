<template>
  <div class="card m-4">
    <responsive-iframe url="https://projects-staging.cloud.icij.org/the-implant-files/graphics/#/adverse-events?no-embeddable-footer=1"></responsive-iframe>
  </div>
</template>

<script>
  import { ResponsiveIframe } from '@/main'

  export default {
    components: {
      ResponsiveIframe
    }
  }
</script>
