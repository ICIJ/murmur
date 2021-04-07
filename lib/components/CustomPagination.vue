<template>
  <div class="custom-pagination">

      <b-pagination-nav
        id="custom-pagination-pills"
       :link-gen="linkGen"
       :number-of-pages="numberOfPages"
       v-model="currentPage"
       first-text="First"
       prev-text="Prev"
       next-text="Next"
       last-text="Last"
       use-router
       >
     </b-pagination-nav>

       Total {{numberOfPages}} pages

     <div class="input-group mb-3">
      <input v-model="currentPageInput" type="text" class="form-control" placeholder="Enter page number" aria-label="Enter page number" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" @click="emitPageClick" type="button" >Button</button>
      </div>
     </div>
  </div>
</template>

<script>
  import { BPaginationNav } from 'bootstrap-vue'
  import { BInputGroup } from 'bootstrap-vue'

  export default {
    name: 'CustomPagination',
    components: {
      BPaginationNav,
      BInputGroup
    },
    props: {
      numberOfPages: {
        type: Number
      },
      linkGen: {
        type: Function
      }
    },
    data() {
      return {
        currentPage: 1,
        currentPageInput: null
      }
    },
    watch: {
      currentPageInput: function (newCurrentPageInput, oldCurrentPageInput) {
        if (newCurrentPageInput) {
          this.currentPage = newCurrentPageInput
        }
      }
    },
    methods: {
      emitPageClick () {
        // this.currentPage = value
        // console.log('emit');
        const selector = '.active'
        const el = this.$el.querySelector(selector)

        // el.click()
        // this.$emit('page-click', this.currentPage)

     }
    }
  }
</script>

<style lang="scss" scoped>
</style>
