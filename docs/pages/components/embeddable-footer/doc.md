::: sample-card
<div class="p-4">
  <embeddable-footer class="position-relative card"></embeddable-footer>
</div>
:::

Main slot is displayed as "lead" text:

::: sample-card
<div class="p-4">
  <embeddable-footer class="position-relative card">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </embeddable-footer>
</div>
:::

This can be used for more complex structures:

::: sample-card
<div class="p-4">
  <embeddable-footer class="position-relative card">
    <div class="d-flex align-items-center">
      <div class="flew-grow-1 mr-2">
        This is an helpful text.
      </div>
      <b-button variant="info" pill size="sm" class="ml-auto mr-2">
        Help
      </b-button>
    </div>
  </embeddable-footer>
</div>
:::

Finally, you can overide the "sharing-button" slot to use your own:

::: sample-card
<div class="p-4">
  <embeddable-footer class="position-relative card" :sharing-options-values="{ url: 'https://www.reddit.com/submit?url=https%3A%2F%2Ficij.org' }">
    <template #sharing-button="{ sharingOptionsValues }">
      <b-button variant="primary" pill size="sm" class="ml-auto mr-2" :href="sharingOptionsValues.url" target="_blank">
        Share on Reddit
      </b-button>
    </template>
  </embeddable-footer>
</div>
:::


::: api-table components/EmbeddableFooter.vue :::
