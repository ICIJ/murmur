<template>
  <div>
    <p class="text-muted">A component to create header with generic features.</p>
    <sample-card title="" description="" :component="sample" :code="code"></sample-card>
    <api-table :api="api"></api-table>
  </div>
</template>

<script>
  import ApiTable from '../ApiTable.vue'
  import SampleCard from '../SampleCard.vue'

  import api from '!!vue-docgen-loader!@/components/MainHeader.vue'
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
