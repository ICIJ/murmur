---
badge: unstable
---

By default, `SymbolMap` builds a map of the world.

:::sample-card
<div class="bg-light p-4">
  <h4 class="mb-4">ICIJ Offices</h4>
  <symbol-map :data="icijOffices" clickable zoomable />
  <p class="text-right">
    <a href="#">
      Source
    </a>
  </p>
</div>
:::

All you have to do is to pass an array with coordinates:

<collapsible-block label="Show the data structure">
```json
{{ icijOffices }}
```
</collapsible-block>

<script>
export default {
  data () {
    return {
      icijOffices: [
        { latitude: 48.859116, longitude: 2.331839, color: '#6e40aa', category: 'TECH', label: 'Paris, France' },
        { latitude: -34.035875, longitude: 151.194191, color: '#ff5e63', category: 'FINANCE', label: 'Sydney, Australia' },
        { latitude: 38.9072, longitude: -77.0369, color: '#aff05b', category: 'EDITO', label: 'Washington DC, USA' }
      ]
    }
  }
}
</script>

::: api-table maps/SymbolMap.vue :::