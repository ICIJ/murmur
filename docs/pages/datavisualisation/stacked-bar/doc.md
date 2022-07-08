Component do draw dead simple stacked bar charts.

:::sample-card
<div class="m-4">
  <h4>
    Medical device companies reported tens of thousands of incidents in 2017  
  </h4>
  <p class="text-muted">
    Companies must report when a patient has potentially been hurt or killed by one of their medical devices.
  </p>
  <stacked-bar-chart
    :data="incidentReports"
    class="my-4"
    label-above />  
  <p class="text-muted small">
    Note: The companies shown here are 10 of the biggest participants in the medical device industry. Numbers for Becton, Dickinson and Company include adverse events reported by C. R. Bard, which was acquired in 2017. Source: U.S. Food and Drug Administration, ICIJ analysis.
  </p>
  <p class="text-muted form-inline align-items-center">
    <span class="ml-auto mr-3 d-inline-flex align-items-center">
      Height: 
      <b-form-select class="ml-2" size="sm" v-model="fixedHeight" :options="[150, 300, 450]" />
    </span>
    Source: ICIJ
  </p>
</div>
:::

<collapsible-block label="Show the data structure">
```json
{{ incidentReports }}
```
</collapsible-block>

Or a more advanced example:

:::sample-card
<div class="m-4">
  <h4>
    How high-budget movies score in the box office?
  </h4>
  <stacked-bar-chart hide-empty-values :data="moviesUrl" label-field="movie" class="my-4" :sort-by="sortKey" :groups="['Budget', 'Box Office']" :relative="isRelative">  
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

Or with a fixed height:

:::sample-card
<div class="m-4">
  <h4>Leaks size</h4>
  <p class="text-muted">
    Size of each leak in GB.
  </p>
  <stacked-bar-chart 
    class="mb-4" 
    hide-legend 
    :data="leakSizes" 
    :fixed-height="fixedHeight" 
    :x-axis-tick-format="humanReadableGb" />
  <p class="text-muted form-inline align-items-center">
    <span class="ml-auto mr-3 d-inline-flex align-items-center">
      Height: 
      <b-form-select class="ml-2" size="sm" v-model="fixedHeight" :options="[200, 300, 400]" />
    </span>
    Source: ICIJ
  </p>
</div>
:::

::: api-table datavisualisations/StackedBarChart.vue :::

<script>
  export default {
    data () {
      return {        
        fixedHeight: 400,
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
         isRelative: true,
         sortKeys: ['movie', 'budget', 'box_office'],
         sortKey: ['movie'],
         leakSizes: [
           { label: 'Paradise Papers', value: 1.4 * 1e3 },
           { label: 'Panama Papers', value: 2.6 * 1e3 },
           { label: 'Swiss Leaks', value: 3.3 },
           { label: 'LuxLeaks', value: 4 },
           { label: 'Offshore Leaks', value: 260 }
         ]
      }
    },
    methods: {
      humanReadableGb (size) {
        if (size >= 1e3) {
          return `${size/1e3}TB`          
        } else {          
          return `${size}GB`
        }
      }
    }
  }
</script>
