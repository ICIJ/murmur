<template>
  <div class="custom-pagination container-fluid">
    <div class="row mr-2">
      <div class="col m-1 border-right ml-n1">
        <b-pagination :size="small ? 'sm' : 'md'"
         :class="paginationClasses"
         :total-rows="totalRows"
         :per-page="perPage"
         :value="value"
         :pills="pills"
         @input="value => $emit('input', value)"
         first-number
         last-number>
       </b-pagination>
      </div>

      <div class="col my-1 float-right">
        <div class="mt-2">
          <form class="input-group" @submit.prevent="applyJumpFormPage">
            <b-input-group :size="small ? 'sm' : 'md'"
            >
              <input v-model="currentPageInput" type="number" class="form-control" :placeholder="$t('custom-pagination.placeholder')" aria-label="Jump to page" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-secondary btn-sm" type="submit">
                  <span class="px-1 py-3">
                    Go
                  </span>
                </button>
              </div>
            </b-input-group>
         </form>
         <small class="float-left mt-1 ml-1 text-danger" id="invalid-number-error" v-if="errors.length">
           {{ errors[0] }}
         </small>
         <small class="float-left mt-1 ml-1 text-muted" v-else>
           {{numberOfPages}} {{ $t('custom-pagination.total-pages') }}
         </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { BPagination } from 'bootstrap-vue'
  import { BCol } from 'bootstrap-vue'
  import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons/faExchangeAlt'
  import { library } from './Fa'
  import i18n from '@/i18n'

  export default {
    i18n,
    name: 'CustomPagination',
    beforeMount() {
      library.add(faExchangeAlt)
    },
    components: {
      Fa: require('./Fa').default,
      BPagination,
      BCol
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      /**
      * Total items to be stored in pages
      */
      totalRows: {
        type: Number,
        default: 0
      },
      /**
      * Sets the quantity of items per page
      */
      perPage: {
        type: Number,
        default: 20
      },
      /**
      * Grabs and syncs the currentPage variable passed down from the parent in v-model
      */
      value: {
        type: Number,
        default: 1
      },
      /**
      * Displays the pagination element in pills styling as opposed to the default boxes
      */
      pills: {
        type: Boolean
      },
      /**
      * Makes the pagination and input field smaller
      */
      small: {
        type: Boolean
      }
    },
    data() {
      return {
        currentPageInput: null,
        invalidNumberError: this.$t('custom-pagination.invalid-number-error'),
        errors: []
      }
    },
    methods: {
      applyJumpFormPage (event) {
        const number = isNaN(parseInt(this.currentPageInput)) ? 0 : parseInt(this.currentPageInput)
        this.errors = []
        if (number > this.numberOfPages || number < 1 ) {
          this.errors.push(this.invalidNumberError)
        }
        if (this.errors.length == 0) {
          this.$emit('input', parseInt(this.currentPageInput))
        }
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.totalRows / this.perPage)
      },
      paginationClasses () {
        let base = "mt-2"

        return this.small ? base + " float-right mr-1" : base
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
