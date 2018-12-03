<template>
  <div>
    <h3 id="section-embedform">Embed Form</h3>
    <sample-card :component="sample" :code="code"></sample-card>
    <sample-card :component="samplePreview" :code="codePreview"></sample-card>
    <api-table :api="api"></api-table>
  </div>
</template>

<script>
  import ApiTable from '../ApiTable.vue'
  import SampleCard from '../SampleCard.vue'

  import api from '!!vue-docgen-loader!@/components/EmbedForm.vue'
  import sample from './sample.vue'
  import samplePreview from './sample-preview.vue'
  import code from '!!raw-loader!./sample.vue'
  import codePreview from '!!raw-loader!./sample.vue'

  export default {
    components: {
      SampleCard,
      ApiTable
    },
    data () {
      return {
        sample,
        samplePreview,
        code,
        codePreview,
        api
      }
    }
  }
</script>
