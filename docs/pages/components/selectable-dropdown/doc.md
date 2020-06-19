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
        allCountries: ['France', 'United State of America', 'Spain', 'Peru']
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
