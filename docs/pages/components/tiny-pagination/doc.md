---
title: Tiny Pagination
description: A tiny pagination component with the option to jump ahead to a specific page using a form input.
---

Default styling:

:::sample-card
<div class="p-2 text-center">
  <tiny-pagination v-model="currentPage" :per-page="10" :total-rows="200" />
</div>
:::

Different sizes:

:::sample-card
<div class="p-2 text-center">
  <p>
    <tiny-pagination v-model="currentPage" size="sm" :per-page="10" :total-rows="200" />
  </p>
  <p>
    <tiny-pagination v-model="currentPage" size="md" :per-page="10" :total-rows="200" />
  </p>
  <p>
    <tiny-pagination v-model="currentPage" size="lg" :per-page="10" :total-rows="200" />
  </p>
</div>
:::

Hide navigations buttons:

:::sample-card
<div class="p-2 text-center">
  <tiny-pagination v-model="currentPage" no-nav :per-page="10" :total-rows="200" />
</div>
:::

Use compact mode:

:::sample-card
<div class="p-2 text-center">
  <tiny-pagination v-model="currentPage" compact :per-page="10" :total-rows="200" />
</div>
:::

Or display as a block (here with some additional background and border):

:::sample-card
<div class="p-5 text-center">
  <tiny-pagination v-model="currentPage" block class="border bg-white p-1 shadow" :per-page="10" :total-rows="200" />
</div>
:::

And finally, with custom navigation button icons and variant:

:::sample-card
<div class="p-5 text-center">
  <tiny-pagination 
    v-model="currentPage" 
    block
    class="border bg-dark text-light p-1 shadow" 
    previous-page-icon="arrow-left"
    next-page-icon="arrow-right"
    nav-variant="dark"
    size="sm"
    :per-page="10" 
    :total-rows="200" />
</div>
:::

::: api-table components/TinyPagination.vue :::

<script>
  import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
  import { library } from '@/components/Fa'

  export default {
    data () {
      return {
        currentPage: 1
      }
    },
    beforeMount() {
      library.add(faArrowRight, faArrowLeft)
    },
    watch: {
      currentPage (page) {
        this.$router.push({ query: { page } })
      }
    }
  }
</script>
