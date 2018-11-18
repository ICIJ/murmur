<template>
  <div>
    <h3>Content Placeholder</h3>
    <p class="text-muted">A component to fill empty spaces with animated placeholders until content is loaded.</p>
    <sample-card title="" description="" :component="sample" :code="code"></sample-card>
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
      return {
        sample,
        code
      }
    }
  }
</script>
