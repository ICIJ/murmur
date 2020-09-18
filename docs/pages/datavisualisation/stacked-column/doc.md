---
badge: unstable
---

Component do draw dead simple stacked column charts.

:::sample-card
<div class="m-4">
  <h4>
    Breast implant companies buried evidence of injuries for years
  </h4>
  <p class="text-muted">
    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  </p>
  <stacked-column-chart :data="incidentReportsUrl" y-axis-tick-format=",.0f" class="my-4" />  
  <p class="text-muted small">
    Source: U.S. Food and Drug Administration, ICIJ analysis
  </p>
</div>
:::

Or without direct-labeling:

:::sample-card
<div class="m-4">
  <h4>
    Breast implant companies buried evidence of injuries for years
  </h4>
  <p class="text-muted">
    Incidents were reported as routine events that did not require public disclosure. After the FDA tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  </p>
  <stacked-column-chart no-direct-labeling :data="incidentReportsUrl" y-axis-tick-format=",.0f" class="my-4" />  
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

::: api-table datavisualisations/StackedColumnChart.vue :::

<script>
  export default {
    data () {
      return {
        incidentReportsUrl: 'https://gist.githubusercontent.com/pirhoo/4055e8d1ee3016805eaf1d2feabdd895/raw/a3d2ba8e9d19fcd9fc659dab50ec075248178238/stacked-colums-incidents.json'
      }
    }
  }
</script>
