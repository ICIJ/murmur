<template>
  <div>
    <p class="text-muted">A component to create responsive iframe with Pym.js</p>
    <sample-card title="" description="" :component="sample" :code="code"></sample-card>
    <api-table path="components/ResponsiveIframe.vue"></api-table>
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
