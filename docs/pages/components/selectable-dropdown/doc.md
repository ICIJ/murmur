---
title: Selectable Dropdown
---

A component to create an interactive list.

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown v-model="country" :items="allCountries" />
    <button @click="country = 'Peru'" class="btn btn-outline-secondary mt-2 mx-2">Choose Peru</button>
    <button @click="country = 'France'" class="btn btn-outline-secondary mt-2 mx-2">Choose France</button>
  </div>
</template>
:::

With a serializer:

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown deactivate-keys :serializer="item => item.toUpperCase()" :items="allCountries"></selectable-dropdown>
  </div>
</template>
:::

With multiple values:

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown deactivate-keys v-model="countries" multiple :items="allCountries"></selectable-dropdown>
    <button class="btn btn-outline-secondary mt-2 mx-2" @click="countries = twoCountries">Choose two countries</button>
  </div>
</template>
:::

With a dynamic list:

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown deactivate-keys v-model="countries" multiple  :items="filteredCountries"></selectable-dropdown>
    <button class="btn btn-outline-secondary mt-2 mx-2" @click="filteredCountries = treeCountries">
      Tree countries
    </button>
    <button class="btn btn-outline-secondary mt-2 mx-2" @click="filteredCountries = twoCountries">
      Two countries
    </button>
  </div>
</template>
:::

## Collection

You can also use this component to build a list based from a collection of object:

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown deactivate-keys multiple :serializer="item => item.label" :items="countryCollection"></selectable-dropdown>
  </div>
</template>
:::

Some lists are not trivial and comparisons are not easy. For instance a games with similar name:

```js
const streetFighters = [
  { label: 'Street Fighter (I)',   uid: 'sf1' },
  { label: 'Street Fighter (II)',  uid: 'sf2' },
  { label: 'Street Fighter (III)', uid: 'sf3' },
  { label: 'Street Fighter (IV)',  uid: 'sf4' },
  { label: 'Street Fighter (V)',   uid: 'sf5' },
]
```

You might want to display a list and prove uniqueness using the `uid`:

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown 
      :eq="(item, other) => item.uid === other.uid" 
      :items="streetFighters" 
      :serializer="item => item.label" 
      deactivate-keys 
      multiple 
      v-model="selectedGames" 
    ></selectable-dropdown>
    Selected games: {{ selectedGames.join(', ') }}
  </div>
</template>
:::

When you want to display a very big list, like the 36,369 towns in France, the virtual scroller will help you deal with large amount of data:

:::sample-card
<template>
  <div class="p-2 text-center">
    <selectable-dropdown 
      :items="frenchCities" 
      deactivate-keys 
      multiple 
      scrollerHeight="500px"  
      v-model="selectedFrenchCities" 
    ></selectable-dropdown>
    Selected cities: {{ selectedFrenchCities.join(', ') }}
  </div>
</template>
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
        ],
        frenchCities:[],
        selectedFrenchCities:[]
      }
    },
    watch: {
      country () {
        console.log('Selected country:', this.country)
      },
      countries () {
        console.log('Selected countries:', this.countries.join(', '))
      }
    },
    async created(){
        const url = 'https://raw.githubusercontent.com/high54/Communes-France-JSON/master/france.json';
        const cities = await fetch(url).then(data=> data.json());
        this.frenchCities = [...new Set(cities.map(city=> city.Code_postal + ' - ' + city.Nom_commune).sort())];
    }
  }
</script>
