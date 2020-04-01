---
title: Selectable Dropdown
---

A component to create an interactive list.

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown v-model="country" :items="[ 'France', 'United State of America', 'Spain', 'Peru' ]"></selectable-dropdown>
  <button @click="country = 'Peru'" class="btn btn-outline-secondary mt-2 mx-2">Choose Peru</button>
  <button @click="country = 'France'" class="btn btn-outline-secondary mt-2 mx-2">Choose France</button>
</div>
:::

With a serializer:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys :serializer="item => item.toUpperCase()" :items="[ 'France', 'United State of America', 'Spain', 'Peru' ]"></selectable-dropdown>
</div>
:::

With multiple values:

:::sample-card
<div class="p-2 text-center">
  <selectable-dropdown deactivate-keys v-model="countries" multiple :items="[ 'France', 'United State of America', 'Spain', 'Peru' ]"></selectable-dropdown>
  <button class="btn btn-outline-secondary mt-2 mx-2" @click="countries = ['Peru', 'France']">Choose Peru and France</button>
</div>
:::

::: api-table components/SelectableDropdown.vue :::

<script>
  export default {
    data () {
      return {
        country: 'Peru',
        countries: [],
        a: 2
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
