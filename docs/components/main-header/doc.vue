<template>
  <div>
    <h3>Main Header</h3>
    <p class="text-muted">A component to create header with generic features.</p>
    <component :is="sample" class="mb-4"></component>
    <sample-card title="" description="" :code="code"></sample-card>
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
