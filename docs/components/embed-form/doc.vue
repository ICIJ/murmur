<template>
  <div>
    <h3 id="section-embedform">Embed Form</h3>
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div class="card card-sm py-2">
      <embed-form url="about:blank" no-preview></embed-form>
    </div>
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
