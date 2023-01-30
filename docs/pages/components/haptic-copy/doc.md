---
title: Haptic Copy
---

A button to copy text with an haptic feedback:

:::sample-card
<div class="p-2 text-center">
  <haptic-copy text="Lorem info sit amet" class="btn-info" />
</div>
:::

:::sample-card
<template>
  <div class="p-2 text-center">
    <haptic-copy
      class="btn-secondary"
      hide-label
      tooltip-placement="right"
      v-b-tooltip.hover.right
      title="Click to copy"
      text="Lorem secondary sit amet" />
  </div>
</template>
:::

::: api-table components/HapticCopy.vue :::
