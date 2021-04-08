---
title: Custom Pagination
description: A BootstrapVue-based pagination component with the option to jump ahead to a specific page.
---

:::sample-card
<div class="p-2 text-center">
  <custom-pagination v-model="currentPage" :per-page="10" :total-rows="200" />
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
