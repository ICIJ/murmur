Component do draw dead simple stacked bar charts.

:::sample-card
<div class="m-4">
  <h4>
    Medical device companies reported tens of thousands of incidents in 2017  
  </h4>
  <p class="text-muted">
    Companies must report when a patient has potentially been hurt or killed by one of their medical devices.
  </p>
  <stacked-bar-chart :data="incidentReports" class="my-4" label-above />  
  <p class="text-muted small">
    Note: The companies shown here are 10 of the biggest participants in the medical device industry. Numbers for Becton, Dickinson and Company include adverse events reported by C. R. Bard, which was acquired in 2017. Source: U.S. Food and Drug Administration, ICIJ analysis
  </p>
</div>
:::

<collapsible-block label="Show the data structure">
```json
[
   {
      "label":"Medtronic PLC",
      "injury":71444,
      "death":1828
   },
   {
      "label":"Abbott Laboratories",
      "injury":40200,
      "death":2816
   },
   {
      "label":"Johnson & Johnson",
      "injury":25863,
      "death":104
   },
   {
      "label":"Boston Scientific",
      "injury":20509,
      "death":725
   },
   {
      "label":"Zimmer Biomet Holdings",
      "injury":15733,
      "death":146
   },
   {
      "label":"Tandem Diabetes Care, Inc.",
      "injury":13658,
      "death":26
   },
   {
      "label":"Stryker",
      "injury":5102,
      "death":90
   },
   {
      "label":"Becton, Dickinson and Company",
      "injury":3569,
      "death":130
   },
   {
      "label":"DexCom, Inc.",
      "injury":1198,
      "death":25
   },
   {
      "label":"Philips",
      "injury":450,
      "death":268
   }
]
```
</collapsible-block>

Or a more advanced example:

:::sample-card
<div class="m-4">
  <h4>
    How high-budget movies score in the box office?
  </h4>
  <stacked-bar-chart :data="moviesUrl" label-field="movie" class="my-4" :sort-by="sortKey" :groups="['Budget', 'Box Office']" :relative="isRelative">  
    <template #header-right>    
      <div class="ml-auto d-flex border align-items-center p-0">
        <div class="border-right">
          <b-form-checkbox v-model="isRelative" class="m-2">
            Relative
          </b-form-checkbox>
        </div>
        <label class="m-2 d-flex align-items-center">
          Sort by
          <b-form-select v-model="sortKey" :options="sortKeys" size="sm" class="w-auto ml-2" required></b-form-select>
        </label>
      </div>
    </template>
  </stacked-bar-chart>
</div>
:::

::: api-table datavisualisations/StackedBarChart.vue :::

<script>
  export default {
    data () {
      return {        
        incidentReports: [
           {
              "label":"Medtronic PLC",
              "injury":71444,
              "death":1828
           },
           {
              "label":"Abbott Laboratories",
              "injury":40200,
              "death":2816
           },
           {
              "label":"Johnson & Johnson",
              "injury":25863,
              "death":104
           },
           {
              "label":"Boston Scientific",
              "injury":20509,
              "death":725
           },
           {
              "label":"Zimmer Biomet Holdings",
              "injury":15733,
              "death":146
           },
           {
              "label":"Tandem Diabetes Care, Inc.",
              "injury":13658,
              "death":26
           },
           {
              "label":"Stryker",
              "injury":5102,
              "death":90
           },
           {
              "label":"Becton, Dickinson and Company",
              "injury":3569,
              "death":130
           },
           {
              "label":"DexCom, Inc.",
              "injury":1198,
              "death":25
           },
           {
              "label":"Philips",
              "injury":450,
              "death":268
           }
         ],
         moviesUrl: "https://gist.githubusercontent.com/pirhoo/20ce1b795555210c926967a291f8a7ad/raw/13d972b7d2b98b174c33fff38aac2b7d69c85fa7/stacked-bars-movies.json",
         movies: [
           {
             "movie": "Avatar",
             "budget": "237",
             "box_office": "2784"
           },
           {
             "movie": "ET: The Extra-Terrestrial",
             "budget": "11",
             "box_office": "793"
           },
           {
             "movie": "Finding Nemo",
             "budget": "94",
             "box_office": "940"
           },
           {
             "movie": "Ghostbusters",
             "budget": "144",
             "box_office": "229"
           },
           {
             "movie": "Iron Man 3",
             "budget": "178",
             "box_office": "1215"
           },
           {
             "movie": "Jurassic Park",
             "budget": "53",
             "box_office": "1030"
           },
           {
             "movie": "King Kong",
             "budget": "207",
             "box_office": "551"
           },
           {
             "movie": "Monsters, Inc.",
             "budget": "115",
             "box_office": "577"
           },
           {
             "movie": "Oz the Great and Powerful",
             "budget": "160",
             "box_office": "493"
           },
           {
             "movie": "Pirates of the Caribbean: Dead Man's Chest",
             "budget": "225",
             "box_office": "1066"
           },
           {
             "movie": "Quantum of Solace",
             "budget": "200",
             "box_office": "586"
           },
           {
             "movie": "Raiders of the Lost Ark",
             "budget": "18",
             "box_office": "390"
           },
           {
             "movie": "Star Wars Ep. I: The Phantom Menace",
             "budget": "115",
             "box_office": "1027"
           },
           {
             "movie": "The Blind Side",
             "budget": "29",
             "box_office": "309"
           },
           {
             "movie": "The Dark Knight",
             "budget": "185",
             "box_office": "1005"
           },
           {
             "movie": "The Hunger Games",
             "budget": "78",
             "box_office": "649"
           },
           {
             "movie": "The Lion King",
             "budget": "45",
             "box_office": "968"
           },
           {
             "movie": "The Twilight Saga: New Moon",
             "budget": "50",
             "box_office": "710"
           },
           {
             "movie": "The Vow",
             "budget": "30",
             "box_office": "196"
           },
           {
             "movie": "The War of the Worlds",
             "budget": "132",
             "box_office": "704"
           },
           {
             "movie": "Titanic",
             "budget": "200",
             "box_office": "2187"
           },
           {
             "movie": "Up",
             "budget": "175",
             "box_office": "735"
           },
           {
             "movie": "X-Men: The Last Stand",
             "budget": "210",
             "box_office": "459"
           },
           {
             "movie": "You've Got Mail",
             "budget": "65",
             "box_office": "251"
           },
           {
             "movie": "Zookeeper",
             "budget": "80",
             "box_office": "170"
           }
         ],
         isRelative: true,
         sortKeys: ['movie', 'budget', 'box_office'],
         sortKey: ['movie']
      }
    }
  }
</script>
