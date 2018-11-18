<template>
  <div>
    <h3 id="section-embedablefooter">Embedable Footer</h3>
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div class="card">
      <embedable-footer class="position-relative"></embedable-footer>
    </div>
  </div>
</template>

<script>
  import EmbedableFooter from '@/components/EmbedableFooter'

  export default {
    components: {
      EmbedableFooter
    }
  }
</script>
