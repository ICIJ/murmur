---
badge: unstable
---


<div class="bg-dark text-light p-3 mb-5 sticky-top">
  <b-form-checkbox class="text-nowrap" switch v-model="black">
    Use black monochromic version of each texture.
  </b-form-checkbox>
</div>

:::sample-card
<div>
  <textured-deck class="p-5 m-4" :black="black">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </textured-deck>
</div>
:::

:::sample-card
<div>
  <textured-deck value="brick" class="p-5 m-4 row no-gutters align-items-center" :black="black">
    <div class="col">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div class="col-4 text-center">
      <b-button variant="primary" class="text-dark">
        Donate now  
      </b-button>
    </div>
  </textured-deck>
</div>
:::

:::sample-card
<div>
  <textured-deck value="rock" class="p-5 m-4" :black="black">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </textured-deck>
</div>
:::

:::sample-card
<div>
  <textured-deck tag="router-link" value="sand" class="p-5 m-4 d-block" to="/" :black="black">
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </textured-deck>
</div>
:::

:::sample-card
<div>
  <textured-deck value="crack" class="p-5 m-4 d-flex align-items-center" :black="black">
    <brand class="mr-5" />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </textured-deck>
</div>
:::


:::sample-card
<div>
  <textured-deck value="carbon" class="p-5 m-4" :black="black">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </textured-deck>
</div>
:::


::: api-table components/TexturedDeck.vue :::

<script>
  export default {
    data () {
      return { black: false }
    }
  }
</script>