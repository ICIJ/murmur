<template>
  <div>
    <h3 id="section-contentplaceholder">Content Placeholder</h3>
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div class="card card-block card-xs">
      <content-placeholder class="m-2"></content-placeholder>
      <content-placeholder class="m-2"></content-placeholder>
      <content-placeholder class="m-2"></content-placeholder>
      <content-placeholder class="m-2"></content-placeholder>
    </div>
  </div>
</template>

<script>
  import ContentPlaceholder from '@/components/ContentPlaceholder'

  export default {
    components: {
      ContentPlaceholder
    }
  }
</script>
