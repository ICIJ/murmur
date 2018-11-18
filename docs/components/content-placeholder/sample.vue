<template>
  <div class="card card-xs py-2 px-3 mx-auto m-4">
    <content-placeholder class="my-1" />
    <content-placeholder class="my-1" />
    <content-placeholder class="my-1" />
    <content-placeholder class="my-1"/>
  </div>
</template>

<script>
  import { ContentPlaceholder } from '@/main'

  export default {
    components: {
      ContentPlaceholder
    }
  }
</script>
