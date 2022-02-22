---
badge: unstable
---

By default, `SymbolMap` builds a map of the world.

:::sample-card
<div class="bg-white p-4">
  <h4>ICIJ Offices</h4>
  <p class="mb-4">A non-exhaustive list of ICIJ offices and opperations.</p>
  <symbol-map :data="icijOffices" horizontal-legend zoomable>
    <template #tooltip="{ category, label }">
      <span v-html="`${label} (${category})`"></span>
    </template>
  </symbol-map>
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
        { latitude: 48.859116, longitude: 2.331839, category: 'Technology', label: 'Paris, France' },
        { latitude: 25.766368, longitude: -80.210268, category: 'Technology', label: 'Miami, FL, USA' },
        { latitude: 40.429913, longitude: -3.669245, category: 'Technology', label: 'Madrid, Spain' },
        { color: '#aff05b', latitude: 35.128683, longitude: -106.579128, category: 'Data', label: 'Alburquerque, USA' },
        { color: '#aff05b', latitude: 44.80401, longitude: 20.46513, category: 'Data', label: 'Belgrade, Serbia' },
        { color: '#aff05b', latitude: 53.33928, longitude: -6.281314, category: 'Data', label: 'Dublin, Ireland' },
        { latitude: -34.035875, longitude: 151.194191, category: 'Finance', label: 'Sydney, Australia' },
        { latitude: 18.2076699, longitude: -67.1463184, category: 'Finance', label: 'Puerto Rico' },
        { color: '#6e40aa', latitude: 38.9072, longitude: -77.0369, category: 'Editorial', label: 'Washington DC, USA' },
        { color: '#6e40aa', latitude: 47.4808722, longitude: 18.8501225, category: 'Editorial', label: 'Budapest, Hungary' }
      ]
    }
  }
}
</script>

::: api-table maps/SymbolMap.vue :::