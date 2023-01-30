Component do draw dead simple stacked column charts.

:::sample-card
<div class="m-4">
  <h4>
    Breast implant companies buried evidence of injuries for years
  </h4>
  <p class="text-muted">
    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  </p>
  <stacked-column-chart
    :data="incidentReportsUrl"
    :groups="incidentReportsGroups"
    class="my-4"
    y-axis-tick-format=",.0f" />  
  <p class="text-muted small">
    Source: U.S. Food and Drug Administration, ICIJ analysis
  </p>
</div>
:::

Or without direct-labeling:

:::sample-card
<div class="m-4">
  <div class="d-flex align-items-baseline">
    <h4>
      Breast implant companies buried evidence of injuries for years
    </h4>
    <b-form-checkbox class="text-nowrap ml-4" switch v-model="socialMode">
      Social mode
    </b-form-checkbox>
  </div>
  <p class="text-muted">
    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  </p>
  <stacked-column-chart :social-mode="socialMode" no-direct-labeling :data="incidentReportsUrl" y-axis-tick-format=",.0f" class="my-4" />  
  <p class="text-muted small">
    Source: U.S. Food and Drug Administration, ICIJ analysis
  </p>
</div>
:::

<collapsible-block label="Show the data structure">
```json
[
   {
      "date":2008,
      "death":0,
      "injury":300,
      "malfunction":49
   },
   {
      "date":2009,
      "death":2,
      "injury":138,
      "malfunction":37
   },
   {
      "date":2010,
      "death":3,
      "injury":109,
      "malfunction":44
   },
   {
      "date":2011,
      "death":1,
      "injury":141,
      "malfunction":29
   },
   {
      "date":2012,
      "death":0,
      "injury":175,
      "malfunction":32
   },
   {
      "date":2013,
      "death":4,
      "injury":130,
      "malfunction":40
   },
   {
      "date":2014,
      "death":6,
      "injury":122,
      "malfunction":33
   },
   {
      "date":2015,
      "death":1,
      "injury":163,
      "malfunction":29
   },
   {
      "date":2016,
      "death":5,
      "injury":304,
      "malfunction":28
   },
   {
      "date":2017,
      "death":8,
      "injury":2082,
      "malfunction":48
   },
   {
      "date":2018,
      "death":7,
      "injury":5185,
      "malfunction":86
   }
]
```
</collapsible-block>

You can also set the maximum value and use a different field for column's label:

:::sample-card
<div class="m-4">
  <h4>
    ICIJ Staff by office
  </h4>
  <p class="text-muted">As of April 2021. This list is more or less accurate.</p>
  <stacked-column-chart :data="icijStaff" :max-value="10" no-tooltips labelField="city" hide-empty-values class="my-4" />  
</div>
:::


<collapsible-block label="Show the data structure">
```json
[
  { "city": "Washington DC", "developers": 1, "journalists": 6, "devops": 1, "finance": 1 },
  { "city": "Paris ", "developers": 5, "journalists": 1, "devops": 0, "finance": 0 },
  { "city": "Madrid ", "developers": 1, "journalists": 0, "devops": 4, "finance": 0 },
  { "city": "New York City", "developers": 0, "journalists": 3, "devops": 0, "finance": 1 },
  { "city": "Syndey", "developers": 0, "journalists": 2, "devops": 0, "finance": 1 },
]
```
</collapsible-block>

It also work with single-value groups:


:::sample-card
<div class="m-4">
  <h4>Leaks size</h4>
  <p class="text-muted">
    Size of ICIJ's leak.
  </p>
  <stacked-column-chart
    :data="leaksSize"
    :y-axis-tick-format="humanReadableGb"
    :max-value="3000"
    label-field="leak"
    class="my-4"
    bar-max-width="50%"
    hide-legend
    no-tooltips />
  <p class="text-muted small">
    Source: ICIJ
  </p>
</div>
:::

::: api-table datavisualisations/StackedColumnChart.vue :::

<script>
  export default {
    data () {
      return {
        socialMode: false,
        incidentReportsUrl: 'https://gist.githubusercontent.com/pirhoo/4055e8d1ee3016805eaf1d2feabdd895/raw/a3d2ba8e9d19fcd9fc659dab50ec075248178238/stacked-colums-incidents.json',
        incidentReportsGroups: ['Deaths', 'Injuries', 'Malfunctions'],
        icijStaff: [
          { "city": "Washington DC", "developers": 1, "journalists": 6, "devops": 1, "finance": 1 },
          { "city": "Paris ", "developers": 5, "journalists": 1, "devops": 0, "finance": 0 },
          { "city": "Madrid ", "developers": 1, "journalists": 0, "devops": 4, "finance": 0 },
          { "city": "New York City", "developers": 0, "journalists": 3, "devops": 0, "finance": 1 },
          { "city": "Syndey", "developers": 0, "journalists": 2, "devops": 0, "finance": 1 },
        ],
        leaksSize: [        
          { leak: 'Offshore Leaks (2013)', size: 260 },
          { leak: 'Panama Papers (2016)', size: 2.6 * 1e3 },
          { leak: 'Paradise Papers (2017)', size: 1.4 * 1e3 }
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
