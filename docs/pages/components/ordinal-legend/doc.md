---
badge: unstable
---

A quick way to create orginal legend:

:::sample-card
<div class="bg-light p-5">
  <ordinal-legend :data="icijOffices" value="paris" />
</div>
:::

Or horizontal:

:::sample-card
<div class="bg-light p-5">
  <ordinal-legend :data="icijOffices" :highlight.sync="highlighthed" horizontal />
</div>
:::

It also works with a custom marker path:

:::sample-card
<div class="bg-light p-5">
  <ordinal-legend :data="icijOffices" marker-path="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z" />
</div>
:::

::: api-table components/OrdinalLegend.vue :::

<script>
  export default {
    data () {
      return {
        highlighthed: 'dc',
        icijOffices: [
          { id: 'paris', color: '#6e40aa', label: 'Paris, France' },
          { id: 'sydney', color: '#ff5e63', label: 'Sydney, Australia' },
          { id: 'dc', color: '#aff05b', label: 'Washington DC, USA' }
        ]
      }
    }
  }
</script>
