---
title: Custom Pagination
description: A BootstrapVue-based pagination component with the option to jump ahead to a specific page.
---

:::sample-card
<div class="p-2 text-center">
  <custom-pagination :current-page.sync="currentPage" :link-gen.sync="linkGen" :number-of-pages="numberOfPages"></custom-pagination>
</div>
:::

::: api-table components/CustomPagination.vue :::

<script>
  export default {
    data () {
      return {
        numberOfPages: 10,
        currentPage: 1
      }
    },
    methods: {
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      }
    }

  }
</script>
