---
title: Sharing Options Link
---

A link to share a page on a given social network:

:::sample-card
<div class="p-2 text-center">
  <sharing-options-link network="twitter" url="https://www.icij.org" class="btn btn-outline-primary mx-1" />
  <sharing-options-link network="facebook" url="https://www.icij.org" class="btn btn-outline-primary mx-1" />
  <sharing-options-link network="linkedin" url="https://www.icij.org" class="btn btn-outline-primary mx-1" />
  <sharing-options-link network="email" url="https://www.icij.org" class="btn btn-outline-primary mx-1" />
</div>
:::

Without icon and a custom slot:

:::sample-card
<div class="p-2 text-center">
  <sharing-options-link network="twitter" url="https://www.icij.org" no-icon class="btn btn-info">
    Share twitter
  </sharing-options-link>
</div>
:::

With a custom tag and a custom slot:

:::sample-card
<div class="p-2 text-center">
  <sharing-options-link network="twitter" title="Murmur Design System" tag="button" class="btn btn-warning" no-icon>
    Twitter Button
  </sharing-options-link>
</div>
:::

::: api-table components/SharingOptionsLink.vue :::
