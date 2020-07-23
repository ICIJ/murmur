---
badge: WIP
---

Component do draw dead simple line charts.

:::sample-card
<div class="m-4">
  <h4>
    High-risk devices are being approved faster in the US
  </h4>
  <p class="text-muted">
    The average time that it takes the Food and Drug Administration to review and approve a device through its pre-market   approval process has dropped by more than 200 days since 1996.
  </p>
  <line-chart :data="data" class="my-4" />
  <p class="text-muted small">
    Note: This chart shows the time, in days, between an application being received by the FDA and the device being approved. Source: U.S. Food and Drug Administration, ICIJ and AP analysis
  </p>
</div>
:::

<collapsible-block label="Show the data structure">
```json
[
  {
    "date": "1995",
    "data": 284.1733871
  },
  {
    "date": "1996",
    "data": 262.2768595
  },
  {
    "date": "1997",
    "data": 196.8200456
  },
  {
    "date": "1998",
    "data": 162.8752475
  },
  {
    "date": "1999",
    "data": 136.9506399
  },
  {
    "date": "2000",
    "data": 124.3350877
  },
  {
    "date": "2001",
    "data": 125.4939024
  },
  {
    "date": "2002",
    "data": 122.1694656
  },
  {
    "date": "2003",
    "data": 111.5
  },
  {
    "date": "2004",
    "data": 127.8108974
  },
  {
    "date": "2005",
    "data": 96.66352624
  },
  {
    "date": "2006",
    "data": 94.98603352
  },
  {
    "date": "2007",
    "data": 104.7544803
  },
  {
    "date": "2008",
    "data": 100.3127517
  },
  {
    "date": "2009",
    "data": 96.34450402
  },
  {
    "date": "2010",
    "data": 85.1799458
  },
  {
    "date": "2011",
    "data": 96.70278777
  },
  {
    "date": "2012",
    "data": 88.19991705
  },
  {
    "date": "2013",
    "data": 79.83682187
  },
  {
    "date": "2014",
    "data": 78.45282258
  },
  {
    "date": "2015",
    "data": 84.64591978
  },
  {
    "date": "2016",
    "data": 79.61724542
  },
  {
    "date": "2017",
    "data": 68.62495399
  },
  {
    "date": "2018",
    "data": 67.30243261
  }
]
```
</collapsible-block>

::: api-table datavisualisations/ColumnChart.vue :::

<script>
  export default {
    data () {
      return {
        data: [
          {
            "date": "1995",
            "value": 284.1733871
          },
          {
            "date": "1996",
            "value": 262.2768595
          },
          {
            "date": "1997",
            "value": 196.8200456
          },
          {
            "date": "1998",
            "value": 162.8752475
          },
          {
            "date": "1999",
            "value": 136.9506399
          },
          {
            "date": "2000",
            "value": 124.3350877
          },
          {
            "date": "2001",
            "value": 125.4939024
          },
          {
            "date": "2002",
            "value": 122.1694656
          },
          {
            "date": "2003",
            "value": 111.5
          },
          {
            "date": "2004",
            "value": 127.8108974
          },
          {
            "date": "2005",
            "value": 96.66352624
          },
          {
            "date": "2006",
            "value": 94.98603352
          },
          {
            "date": "2007",
            "value": 104.7544803
          },
          {
            "date": "2008",
            "value": 100.3127517
          },
          {
            "date": "2009",
            "value": 96.34450402
          },
          {
            "date": "2010",
            "value": 85.1799458
          },
          {
            "date": "2011",
            "value": 96.70278777
          },
          {
            "date": "2012",
            "value": 88.19991705
          },
          {
            "date": "2013",
            "value": 79.83682187
          },
          {
            "date": "2014",
            "value": 78.45282258
          },
          {
            "date": "2015",
            "value": 84.64591978
          },
          {
            "date": "2016",
            "value": 79.61724542
          },
          {
            "date": "2017",
            "value": 68.62495399
          },
          {
            "date": "2018",
            "value": 67.30243261
          }
        ]
      }
    }
  }
</script>
