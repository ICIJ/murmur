---
title: Brand
description: A component to create variations of ICIJ logo.
---

:::sample-card
<div class="text-center position-relative">
  <div class="position-absolute p-3">
    <b-form-checkbox v-model="animated" name="check-button" size="sm" switch>
      Animated
    </b-form-checkbox>
  </div>
  <brand class="p-1 m-3" square :animated="animated" />
  <brand class="p-1 m-3" square background="#000" color="#FFFF" :animated="animated" />
  <brand class="p-1 m-3" square background="#FFF" color="#000" :animated="animated" />
</div>
:::

::: api-table components/Brand.vue :::


<script>
  export default {
    data () {
      return {
        animated: false
      }
    }
  }
</script>