---
title: Brand Expansion
description: A component to create variations of ICIJ logo with text
---

### Short

A variation of the logo with only the acronym "ICIJ":

:::sample-card
<div class="text-center position-relative">
  <div class="position-absolute p-3">
    <b-form-checkbox v-model="animated" name="check-button" size="sm" switch>
      Animated
    </b-form-checkbox>
  </div>
  <brand-expansion class="p-4 d-block" :animated="animated" />
  <brand-expansion class="p-4 d-block" background="#000" dark />
  <brand-expansion class="p-4 d-block" background="#000" color="#FFFF" />
  <brand-expansion class="p-4 d-block" background="#FFF" color="#000" />
</div>
:::

### Medium

A variation of the logo with the definition of the acronym "ICIJ":

:::sample-card
<div class="text-center">
  <div class="position-absolute p-3">
    <b-form-checkbox v-model="animated" name="check-button" size="sm" switch>
      Animated
    </b-form-checkbox>
  </div>
  <brand-expansion class="p-4 d-block" mode="medium" :animated="animated" />
  <brand-expansion class="p-4 d-block" mode="medium" background="#000" dark />
  <brand-expansion class="p-4 d-block" mode="medium" background="#000" color="#FFFF" />
  <brand-expansion class="p-4 d-block" mode="medium" background="#FFF" color="#000" />
</div>
:::

### Long

A variation of the logo with ICIJ's punchline:

:::sample-card
<div class="text-center">
  <div class="position-absolute p-3">
    <b-form-checkbox v-model="animated" name="check-button" size="sm" switch>
      Animated
    </b-form-checkbox>
  </div>
  <brand-expansion class="p-4 d-block" mode="long" :animated="animated" />
  <brand-expansion class="p-4 d-block" mode="long" background="#000" dark />
  <brand-expansion class="p-4 d-block" mode="long" background="#000" color="#FFFF" />
  <brand-expansion class="p-4 d-block" mode="long" background="#FFF" color="#000" />
</div>
:::

::: api-table components/BrandExpansion.vue :::

<script>
  export default {
    data () {
      return {
        animated: false
      }
    }
  }
</script>