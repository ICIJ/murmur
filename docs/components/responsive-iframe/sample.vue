<template>
  <div class="card m-4">
    <responsive-iframe url="http://blog.apps.npr.org/pym.js/examples/table/child.html"></responsive-iframe>
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
