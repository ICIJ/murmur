---
title: Range Picker
description: A component to wrap an HTML element with a range picker overlay.
---

:::sample-card
<div class="bg-light p-5">
  <range-picker v-model="range">
    <div class="bg-white p-3 text-center text-uppercase">
      <b-badge>{{ range[0] }}</b-badge> - <b-badge>{{ range[1] }}</b-badge>
    </div>
  </range-picker>
</div>
:::

You can add offsets (in pixels), a snap fraction or a variant (using Bootstrap theme):

:::sample-card
<div class="bg-light p-5">
  <range-picker v-model="range" :start-offset=30 :end-offset=30 :snap=.1 :precision=2 variant="info" hover rounded>
    <div class="bg-white p-3 text-center text-uppercase">
      <b-badge>{{ range[0] * 100 }}%</b-badge> - <b-badge>{{ range[1] * 100 }}%</b-badge>
    </div>
  </range-picker>
</div>
:::

Or in combination with a column chart

:::sample-card
<div class="bg-light p-5">
  <range-picker :snap="1 / dataPerYear.length" variant="dark" v-model="rangeYears" class="py-2" hover>
    <column-chart :bar-padding=0 :bar-margin=20 :highlights="higlightedYears" :data="dataPerYear" :fixed-height="200" no-y-axis no-tooltips />
  </range-picker>
</div>
:::

::: api-table components/RangePicker.vue :::

<script>
import { range } from 'lodash'

export default {
  data() {
    return {
      range: [.2, .8],
      rangeYears: [0, 1 / 5],
      dataPerYear: [
        { 
          date: 2018,
          value: 120
        },
        { 
          date: 2019,
          value: 100
        },
        { 
          date: 2020,
          value: 80
        },
        { 
          date: 2021,
          value: 110
        },
        { 
          date: 2022,
          value: 130
        }
      ]
    }
  },
  computed: {
    rangeStartYear() {
      const start = this.rangeYears[0]
      return this.dataPerYear[Math.ceil(start * (this.dataPerYear.length - 1))].date
    },
    rangeEndYear() {
      const end = this.rangeYears[1]
      return this.dataPerYear[Math.floor(end * (this.dataPerYear.length - 1))].date
    },
    higlightedYears() {
      return range(this.rangeStartYear, this.rangeEndYear + 1)
    }
  }
}
</script>