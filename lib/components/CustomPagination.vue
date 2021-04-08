<template>
  <div class="custom-pagination">

      <b-pagination
        id="custom-pagination-pills"
       :total-rows="totalRows"
       :per-page="perPage"
       :value="value"
       :pills="pills"
       @input="value => $emit('input', value)"
       first-text="First"
       prev-text="Prev"
       next-text="Next"
       last-text="Last">
     </b-pagination>

     Total {{ numberOfPages }} pages

     <form class="input-group mb-3" @submit.prevent="applyJumpFormPage">
      <input v-model="currentPageInput" type="number" class="form-control" placeholder="Enter page number" aria-label="Enter page number" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="submit" >Button</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { BPagination } from 'bootstrap-vue'
  import { BInputGroup, BLink } from 'bootstrap-vue'
  import { computeHref } from 'bootstrap-vue/src/utils/router'

  export default {
    name: 'CustomPagination',
    components: {
      BPagination,
      BInputGroup
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      totalRows: {
        type: Number,
        default: 0
      },
      perPage: {
        type: Number,
        default: 20
      },
      value: {
        type: Number,
        default: 1
      },
      pills: {
        type: Boolean
      }
    },
    data() {
      return {
        currentPageInput: null
      }
    },
    methods: {
      applyJumpFormPage (event) {
        this.$emit('input', parseInt(this.currentPageInput))
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.totalRows / this.perPage)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
