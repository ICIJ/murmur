---
title: IMDDB Header
---

A component to create header with generic features.

<sample-card title="" description="" :component="sample" :code="code"></sample-card>
<api-table :api="api"></api-table>


<script>
  import ApiTable from '$components/ApiTable.vue'
  import SampleCard from '$components/SampleCard.vue'

  import api from '!!vue-docgen-loader!@/components/ImddbHeader.vue'
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
