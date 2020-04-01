<template>
  <div>
    <p>
      A component to create a list of rounded sharing buttons.
    </p>
    <sample-card :component="sample" :code="code"></sample-card>
    <api-table path="components/SharingOptions.vue"></api-table>
  </div>
</template>

<script>
  import ApiTable from '$components/ApiTable.vue'
  import SampleCard from '$components/SampleCard.vue'

  import sample from './sample.vue'
  import code from '!!highlight-loader?lang=html!./sample.vue'

  export default {
    components: {
      SampleCard,
      ApiTable
    },
    data () {
      return { sample, code }
    }
  }
</script>
