<template>
  <div>
    <div class="p-4 text-center">
      <button class="btn btn-info font-weight-bold" @click="$refs.formModal.show()">
        Click to see the form with preview
      </button>
    </div>
    <b-modal hide-footer lazy title="Embed form with a preview" ref="formModal" size="lg">
      <embed-form no-title url="https://projects.icij.org/the-implant-files/graphics/#/device-related-incidents-in-europe?no-embeddable-footer=1" :height="550"></embed-form>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import EmbedForm from '@/components/EmbedForm'

  export default {
    components: {
      EmbedForm,
      bModal
    }
  }
</script>
