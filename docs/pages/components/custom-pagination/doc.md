---
title: Custom Pagination
description: A custom pagination component with the option to jump ahead to a specific page using a form input.
---

Default styling:

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :per-page="10" :total-rows="200" />
</div>
:::

Default styling for the pagination element, while using a `small` layout:

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :per-page="10" :total-rows="200" small />
</div>
:::

With pills:

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :pages="3" pills :total-rows="200" />
</div>
:::

With pills, using a `sm` layout:

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :per-page="10" pills :total-rows="200" size="sm" />
</div>
:::

Or a `compact` layout:

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :per-page="50" :pages="3" compact />
</div>
:::

::: api-table components/CustomPagination.vue :::

<script>
  export default {
    data () {
      return {
        currentPage: 1
      }
    },
    watch: {
      currentPage (page) {
        this.$router.push({ query: { page } })
      }
    }
  }
</script>
