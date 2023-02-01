---
badge: unstable
---

Component do draw dead simple bar charts.

:::sample-card
<div class="m-4">
  <h4>Breast implant patients kept in the dark about potential risks</h4>
  <p class="text-muted">
    More than 300 people around the world who responded to an ICIJ survey said they were not aware of the dangers of breast implants prior to their surgeries.
  </p>
  <bar-chart :data="dataUrl" class="mt-4" />
</div>
:::

<collapsible-block label="Show the data structure">

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

</collapsible-block>

It's also possible to highlight a value:

:::sample-card
<div class="m-4">
  <h4>Breast implant patients kept in the dark about potential risks</h4>
  <p class="text-muted">
    More than 300 people around the world who responded to an ICIJ survey said they were not aware of the dangers of breast implants prior to their surgeries.
  </p>
  <bar-chart :data="dataWithHighlight" class="mt-4" />
</div>
:::

<collapsible-block label="Show the data structure">

```json
[
  {
    "label": "Warned about local complications",
    "value": 52
  },
  {
    "label": "Not warned",
    "value": 42,
    "highlight": true
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

</collapsible-block>


::: api-table datavisualisations/BarChart.vue :::

<script>
  export default {
    data () {
      return {
        dataUrl: "https://gist.githubusercontent.com/pirhoo/2308336d5f067ef7d84fec348fd63e29/raw/c0135f11e54e757187163dd0722b149a456c64b1/bars-icij-survey.json",
        dataWithHighlight: [
          {
            "label": "Warned about local complications",
            "value": 52
          },
          {
            "label": "Not warned",
            "value": 42,
            "highlight": true
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
