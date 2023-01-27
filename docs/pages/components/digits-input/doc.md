---
title: Digits Input
description: An multiple-digits input to
---

## 6 digits

By default, this components displays 6 digits and has no value.

:::sample-card
<div class="p-5">
  <digits-input />
</div>
:::

## 4 digits with initial value

You can use any number of digits you like, and specify a `value` or a `v-model`. 
The value of the component is always converted to string to allow user to specify 
number starting with "0".

:::sample-card
<div class="p-5">
  <digits-input :length="4" value="2017" />
</div>
:::

::: api-table components/DigitsInput.vue :::
