<template>
  <div class="card m-4">
    <responsive-iframe url="https://projects.icij.org/the-implant-files/graphics/#/adverse-events?no-embeddable-footer=1"></responsive-iframe>
  </div>
</template>

<script>
  import { ResponsiveIframe } from '@root/main'

  export default {
    components: {
      ResponsiveIframe
    }
  }
</script>
