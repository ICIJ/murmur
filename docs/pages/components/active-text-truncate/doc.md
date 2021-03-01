---
title: Active Text Truncate
description: Truncate text with an active display of the extended value
---

The end of the text will be truncated with an elegant gradient mask.

:::sample-card
<div class="p-4">
  <active-text-truncate class="p-2 bg-striped">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </active-text-truncate>
</div>
:::

This can be combined, for instance, with the haptic copy button for a subtle effect:

:::sample-card
<div class="p-4">
    <haptic-copy class="btn btn-link w-100 border" text="https://www.icij.org/investigations/luanda-leaks/banking-documents-reveal-consulting-giants-cash-windfall-under-angolan-billionaire-isabel-dos-santos/">
      <active-text-truncate>
        https://www.icij.org/investigations/luanda-leaks/banking-documents-reveal-consulting-giants-cash-windfall-under-angolan-billionaire-isabel-dos-santos/
      </active-text-truncate>
    </haptic-copy>
</div>
:::

Finally, this component can be used to truncate string from the start:

:::sample-card
<div class="p-4">
  <active-text-truncate class="p-2 bg-white text-monospace" direction="rtl">
    /secret-location/encrypted-disk/icij-investigations/leaks/luxleaks/v1/2001 and before/H4201030M.pdf
  </active-text-truncate>
</div>
:::

::: api-table components/ActiveTextTruncate.vue :::

<style>
  .bg-striped {
    background: repeating-linear-gradient(45deg, #dfdddd, #dfdddd 10px, #cfcccc 10px, #cfcccc 20px)    
  }
</style>
