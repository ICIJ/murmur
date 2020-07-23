---
badge: unstable
---

Component do draw dead simple stacked bar charts.

:::sample-card
<div class="m-4">
  <h4>
    Medical device companies reported tens of thousands of incidents in 2017  
  </h4>
  <p class="text-muted">
    Companies must report when a patient has potentially been hurt or killed by one of their medical devices.
  </p>
  <stacked-bar-chart :data="data" class="my-4" />  
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

<script>
  export default {
    data () {
      return {        
        data: [
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
      }
    }
  }
</script>
