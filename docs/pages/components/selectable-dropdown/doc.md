---
title: Selectable Dropdown
---

A component to create an interactive list.

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown v-model="country" :items="allCountries"></selectable-dropdown>
  <button @click="country = 'Peru'" class="btn btn-outline-secondary mt-2 mx-2">Choose Peru</button>
  <button @click="country = 'France'" class="btn btn-outline-secondary mt-2 mx-2">Choose France</button>
</div>
:::

With a serializer:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys :serializer="item => item.toUpperCase()" :items="allCountries"></selectable-dropdown>
</div>
:::

With multiple values:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys v-model="countries" multiple :items="allCountries"></selectable-dropdown>
  <button class="btn btn-outline-secondary mt-2 mx-2" @click="countries = twoCountries">Choose two countries</button>
</div>
:::

With a dynamic list:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys v-model="countries" multiple :items="filteredCountries"></selectable-dropdown>
  <button class="btn btn-outline-secondary mt-2 mx-2" @click="filteredCountries = treeCountries">
    Tree countries
  </button>
  <button class="btn btn-outline-secondary mt-2 mx-2" @click="filteredCountries = twoCountries">
    Two countries
  </button>
</div>
:::

## Collection

You can also use this component to build a list based from a collection of object:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys multiple :items="countryCollection">
    <template #item-label="{ item }">
      <span v-html="item.label"></span>
    </template>
  </selectable-dropdown>
</div>
:::

Some lists are not trivial and comparisons are not easy. For instance a games with similar name:

```js
const streetFighters = [
  { label: 'Street Fighter', episode: 'I',   uid: 'sf1' },
  { label: 'Street Fighter', episode: 'II',  uid: 'sf2' },
  { label: 'Street Fighter', episode: 'III', uid: 'sf3' },
  { label: 'Street Fighter', episode: 'IV',  uid: 'sf4' },
  { label: 'Street Fighter', episode: 'V',   uid: 'sf5' },
]
```

You might want to display a list and prove uniqueness using the `uid`:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys multiple :items="streetFighters" v-model="selectedGames" :eq="(item, other) => item.uid === other.uid">
    <template #item-label="{ item }">
      <span v-html="item.label"></span> (<span v-html="item.episode"></span>)
    </template>
  </selectable-dropdown>
  Selected games: <span v-html="selectedGames.map(g => g.uid).join(', ')"></span>
</div>
:::

::: api-table components/SelectableDropdown.vue :::

<script>
  export default {
    data () {
      return {
        country: 'Peru',
        countries: [],
        filteredCountries: ['Spain', 'Peru', 'France'],
        twoCountries: ['Spain', 'France'],
        treeCountries: ['Spain', 'Peru', 'France'],
        allCountries: ['France', 'United States of America', 'Spain', 'Peru'],
        countryCollection: [
          { label: 'Spain' },
          { label: 'Peru' },
          { label: 'France' }
        ],
        selectedGames: [],
        streetFighters: [
          { label: 'Street Fighter', episode: 'I',   uid: 'sf1' },
          { label: 'Street Fighter', episode: 'II',  uid: 'sf2' },
          { label: 'Street Fighter', episode: 'III', uid: 'sf3' },
          { label: 'Street Fighter', episode: 'IV',  uid: 'sf4' },
          { label: 'Street Fighter', episode: 'V',   uid: 'sf5' },
        ]
      }
    },
    watch: {
      country () {
        console.log('Selected country:', this.country)
      },
      countries () {
        console.log('Selected countries:', this.countries.join(', '))
      }
    }
  }
</script>
