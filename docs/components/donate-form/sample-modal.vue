<template>
  <div>
    <div class="p-4 text-center">
      <button class="btn btn-info font-weight-bold" @click="$refs.formModal.show()">
        Click to see the form
      </button>
    </div>
    <b-modal hide-footer lazy title="Support ICIJ" ref="formModal" size="lg" no-headings>
      <donate-form no-title></donate-form>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import { DonateForm } from '@/main'

  export default {
    components: {
      DonateForm,
      bModal
    }
  }
</script>
