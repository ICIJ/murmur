---
badge: unstable
---

A quick way to create scale legend:

:::sample-card
<div class="bg-light p-5 text-center">
  <scale-legend :width="200" />
</div>
:::

Or use different colors

:::sample-card
<div class="bg-light p-5 text-center">
  <scale-legend :width="200" color-scale-start="#fafa6e" color-scale-end="teal" />
</div>
:::

And a non linear scale

:::sample-card
<div class="bg-light p-5 text-center">
  <scale-legend :min="0" :max="6e4" :color-scale="thresholdScale" />
</div>
:::

You can highlight a specific value:

:::sample-card
<div class="bg-light p-5 text-center">
  <scale-legend :width="200" :cursor-value="46" />
</div>
:::

The cursor can be customized with slot:

:::sample-card
<div class="bg-light p-5 text-center">
  <scale-legend :width="200" :cursor-value="10">
    <template #cursor="{ value }">
      <div class="bg-dark text-light px-3 py-2">
        <span v-html="`${value}€`"></span>
      </div>
    </template>
  </scale-legend>
</div>
:::

::: api-table components/ScaleLegend.vue :::

<script>
import * as d3 from 'd3'

export default {
  computed: {
    thresholdScale () {
      return d3.scaleThreshold()
        .domain([1e4, 2e4, 3e4, 4e4, 5e4])
        .range(["#D12229", "#F68A1E", "#FDE01A", "#007940", "#24408E", "#732982"])
    }
  }
}
</script>