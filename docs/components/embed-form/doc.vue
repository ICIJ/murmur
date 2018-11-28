<template>
  <div>
    <h3 id="section-embedform">Embed Form</h3>
    <sample-card :component="sample" :code="code"></sample-card>
    <sample-card :component="samplePreview" :code="codePreview"></sample-card>
  </div>
</template>

<script>
  import SampleCard from '../SampleCard.vue'

  import sample from './sample.vue'
  import samplePreview from './sample-preview.vue'
  import code from '!!raw-loader!./sample.vue'
  import codePreview from '!!raw-loader!./sample.vue'

  export default {
    components: {
      SampleCard
    },
    data () {
      return {
        sample,
        samplePreview,
        code,
        codePreview,
      }
    }
  }
</script>
