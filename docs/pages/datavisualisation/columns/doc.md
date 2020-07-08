---
badge: WIP
---

Component do draw dead simple column charts.

:::sample-card
<div class="m-4">
  <h4>Breast implant companies buried evidence of injuries for years</h4>
  <p class="text-muted">
    Incidents were reported as routine events that did not require public disclosure. After the U.S. Food and Drug Administration tightened enforcement of its reporting rules in 2017, reports of injuries soared.
  </p>
  <column-chart :data="data" class="my-4"></column-chart>
  <p class="text-muted small">
    Note: 2018 data includes January to June. Source: U.S. Food and Drug Administration, ICIJ analysis
  </p>
</div>
:::

With the following data structure:

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
    "value": 4642
  },
  {
    "date": 2018,
    "value": 8345
  }
]
```

::: api-table datavisualisations/ColumnChart.vue :::

<script>
  export default {
    data () {
      return {
        data: [
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
            "value": 4642
          },
          {
            "date": 2018,
            "value": 8345
          }
        ]
      }
    }
  }
</script>
