Component do draw dead simple column charts.

:::sample-card
<div class="m-4">
  <h4>Breast implant companies buried evidence of injuries for years</h4>
  <p class="text-muted">
    Incidents were reported as routine events that did not require public disclosure. After the U.S. Food and Drug Administration tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  </p>
  <column-chart :data="dataUrl" class="my-4" x-axis-tick-collapse hover></column-chart>
  <p class="text-muted small">
    Note: 2018 data includes January to June. Source: U.S. Food and Drug Administration, ICIJ analysis
  </p>
</div>
:::

<collapsible-block label="Show the data structure">

```json
[
  {
    "date": 2008,
    "value": 371
  },
  {
    "date": 2009,
    "value": 187
  },
  {
    "date": 2010,
    "value": 188
  },
  {
    "date": 2011,
    "value": 191
  },
  {
    "date": 2012,
    "value": 237
  },
  {
    "date": 2013,
    "value": 193
  },
  {
    "date": 2014,
    "value": 171
  },
  {
    "date": 2015,
    "value": 206
  },
  {
    "date": 2016,
    "value": 339
  },
  {
    "date": 2017,
    "value": 4642,
    "highlight": true
  },
  {
    "date": 2018,
    "value": 8345,
    "highlight": true
  }
]

```
</collapsible-block>

Or with discrete series:

:::sample-card
<div class="m-4">
  <h4>Leaks size</h4>
  <p class="text-muted">
    Size of each ICIJ's leak.
  </p>
  <column-chart :data="discreteData" series-name="size" timeseries-key="leak" :y-axis-tick-format="humanReadableGb" :y-axis-ticks="4" :max-value="3000" class="my-4">
    <template #tooltip="{ datum: { leak, size } }">
      <span v-html="`The ${leak} investigation is ${humanReadableGb(size)}`"></span>
    </template>
  </column-chart>
  <p class="text-muted small">
    Source: ICIJ
  </p>
</div>
:::

<collapsible-block label="Show the data structure">

```json
[
  { "leak": "Paradise Papers", "size": 1400 },
  { "leak": "Panama Papers", "size": 2600 },
  { "leak": "Swiss Leaks", "size": 3.3 },
  { "leak": "LuxLeaks", "size": 4 },
  { "leak": "Offshore Leaks", "size": 260 }
]
```

</collapsible-block>

It also works with dynamic height

:::sample-card
<div class="m-4">
  <h4>Leaks size</h4>
  <p class="text-muted">
    Size of each ICIJ's leak.
  </p>
  <column-chart 
    stripped
    series-name="size" 
    timeseries-key="leak"
    @select="clicked = $event"
    :fixed-height="fixedHeight"
    :data="discreteData" 
    :y-axis-tick-format="humanReadableGb" 
    :y-axis-ticks="4" 
    :max-value="3000" class="my-4">
    <template #tooltip="{ datum: { leak, size } }">
      <span v-html="`The ${leak} investigation is ${humanReadableGb(size)}`"></span>
    </template>
  </column-chart>
  <p class="text-muted form-inline align-items-center">
    <span class="ml-auto mr-3 d-inline-flex align-items-center">
      Height: 
      <b-form-select class="ml-2" size="sm" v-model="fixedHeight" :options="[150, 300, 450]" />
    </span>
    Source: ICIJ
  </p>
</div>
:::


::: api-table datavisualisations/ColumnChart.vue :::

<script>
  export default {
    data () {
      return {
        clicked: null,
        fixedHeight: 300,
        dataUrl: "https://gist.githubusercontent.com/pirhoo/259a1a5159db4a665d0c043fac71beef/raw/e74087b06cd12be2b2d3a8ca995730e38719cd4b/colums-incidents.json",
        discreteData: [
          { leak: 'Paradise Papers', size: 1.4 * 1e3 },
          { leak: 'Panama Papers', size: 2.6 * 1e3 },
          { leak: 'Swiss Leaks', size: 3.3 },
          { leak: 'LuxLeaks', size: 4 },
          { leak: 'Offshore Leaks', size: 260 }
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
