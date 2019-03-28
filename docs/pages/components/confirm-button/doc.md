---
title: Confirm Button
---

A component to create button with a confirmation tooltip

:::sample-card
<div class="p-2 text-center">
  <confirm-button class="btn btn-info" no-close-button>
    Click to confirm
  </confirm-button>
</div>
:::

You can also add a description:

:::sample-card
<div class="p-2 text-center">
  <confirm-button class="btn btn-info" description="Do, or do not. There is no try.">
    Click to confirm
  </confirm-button>
</div>
:::

Or use different texts for the buttons:

:::sample-card
<div class="p-2 text-center">
  <confirm-button class="btn btn-info" label="Will you bilge Matey?" yes="Aye" no="Abandon ship!">
    Click to confirm
  </confirm-button>
</div>
:::

Finally, you can change the default placement of the tooltip:

:::sample-card
<div class="p-2 text-center">
  <confirm-button class="btn btn-outline-dark m-2" placement="top">
    On <code>top</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="bottom">
    On <code>bottom</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="left">
    On <code>left</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="right">
    On <code>right</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="auto">
    On <code>auto</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="topleft">
    On <code>topleft</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="topright">
    On <code>topright</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="bottomleft">
    On <code>bottomleft</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="bottomright">
    On <code>bottomright</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="lefttop">
    On <code>lefttop</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="leftbottom">
    On <code>leftbottom</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="righttop">
    On <code>righttop</code>
  </confirm-button>
  <confirm-button class="btn btn-outline-dark m-2" placement="rightbottom">
    On <code>rightbottom</code>
  </confirm-button>
</div>
:::

:::api-table lib/components/ConfirmButton.vue
