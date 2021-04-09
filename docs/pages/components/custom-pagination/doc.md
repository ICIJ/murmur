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

With pills:

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :per-page="10" pills :total-rows="200" />
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
