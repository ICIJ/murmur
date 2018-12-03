<template>
  <div>
    <h3>Content Placeholder</h3>
    <p class="text-muted">A component to fill empty spaces with animated placeholders until content is loaded.</p>
    <sample-card title="" description="" :component="sample" :code="code"></sample-card>
    <api-table :api="api"></api-table>
  </div>
</template>

<script>
  import ApiTable from '../ApiTable.vue'
  import SampleCard from '../SampleCard.vue'

  import api from '!!vue-docgen-loader!@/components/ContentPlaceholder.vue'
  import sample from './sample.vue'
  import code from '!!raw-loader!./sample.vue'


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
