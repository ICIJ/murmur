<template>
  <div>
    <h3 id="section-sharingoptions">Sharing Options</h3>
    <sample-card :component="sample" :code="code"></sample-card>
  </div>
</template>

<script>
  import SampleCard from '../SampleCard.vue'

  import sample from './sample.vue'
  import code from '!!raw-loader!./sample.vue'

  export default {
    components: {
      SampleCard
    },
    data () {
      return { sample, code }
    }
  }
</script>
