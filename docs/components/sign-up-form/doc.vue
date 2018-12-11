<template>
  <div>
    <sample-card :component="sample" :code="code"></sample-card>
    <api-table :api="api"></api-table>
  </div>
</template>

<script>
  import ApiTable from '../ApiTable.vue'
  import SampleCard from '../SampleCard.vue'

  import api from '!!vue-docgen-loader!@/components/SignUpForm.vue'
  import sample from './sample.vue'
  import code from '!!highlight-loader?lang=html!./sample.vue'

  export default {
    components: {
      SampleCard,
      ApiTable
    },
    data () {
      return { sample, code, api }
    }
  }
</script>
