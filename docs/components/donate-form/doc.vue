<template>
  <div>
    <h3>Donate Form</h3>
    <sample-card description="A form to encourage donations. We usualy put this form inside a modal." :component="sampleModal" :code="codeModal"></sample-card>
    <sample-card description="You can show it in the page directly." :component="sample" :code="code"></sample-card>
    <api-table :api="api"></api-table>
  </div>
</template>

<script>
  import SampleCard from '../SampleCard.vue'
  import ApiTable from '../ApiTable.vue'

  import sampleModal from './sample-modal.vue'
  import codeModal from '!!raw-loader!./sample-modal.vue'

  import api from '!!vue-docgen-loader!@/components/DonateForm.vue'
  import sample from './sample.vue'
  import code from '!!raw-loader!./sample.vue'

  export default {
    components: {
      SampleCard,
      ApiTable
    },
    data () {
      return {
        sampleModal,
        codeModal,
        sample,
        code,
        api
      }
    }
  }
</script>
