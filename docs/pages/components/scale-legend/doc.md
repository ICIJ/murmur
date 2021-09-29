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
