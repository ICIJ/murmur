<template>
  <div>
    <h3 id="section-mainheader">Main Header</h3>
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div class="card d-inline-block w-100">
      <main-header no-headroom position="relative"></main-header>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/MainHeader'

  export default {
    components: {
      MainHeader
    }
  }
</script>
