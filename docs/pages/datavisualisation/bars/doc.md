---
badge: WIP
---

Component do draw dead simple bar charts.

:::sample-card
<div class="m-4">
  <h4>Breast implant patients kept in the dark about potential risks</h4>
  <p class="text-muted">
    More than 300 people around the world who responded to an ICIJ survey said they were not aware of the dangers of breast implants prior to their surgeries.
  </p>
  <bar-chart :data="data" class="mt-4" />
</div>
:::

With the following data structure:

```json
[
  {
    "label": "Warned about local complications",
    "value": 52
  },
  {
    "label": "Not warned",
    "value": 42
  },
  {
    "label": "Warned thoroughly",
    "value": 1
  },
  {
    "label": "Other",
    "value": 6
  }
]
```

<script>
  export default {
    data () {
      return {
        data: [
          {
            "label": "Warned about local complications",
            "value": 52
          },
          {
            "label": "Not warned",
            "value": 42
          },
          {
            "label": "Warned thoroughly",
            "value": 1
          },
          {
            "label": "Other",
            "value": 6
          }
        ]
      }
    }
  }
</script>

::: api-table datavisualisations/BarChart.vue :::
