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
  <stacked-column-chart :data="incidentReports" class="my-4" />  
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
        incidentReports: [
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
      }
    }
  }
</script>
