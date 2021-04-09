<template>
  <div class="custom-pagination container-fluid">
    <div class="row mr-2">
      <div class="col m-1 border-right ml-n1">
        <b-pagination
          class="mt-2"
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
            <input v-model="currentPageInput" type="number" class="form-control" placeholder="Jump to page" aria-label="Jump to page" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-secondary btn-sm" type="submit">
                <span class="px-1 py-3">
                  <fa icon="exchange-alt" />
                </span>
              </button>
            </div>
         </form>
         <small class="float-left mt-1 ml-1 text-danger" id="invalid-number-error" v-if="errors.length">
           {{ errors[0] }}
         </small>
         <small class="float-left mt-1 ml-1 text-muted" v-else>
           {{numberOfPages}} pages total
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

  export default {
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
        currentPageInput: null,
        invalidNumberError: "Invalid page number",
        errors: []
      }
    },
    methods: {
      applyJumpFormPage (event) {
        const number = parseInt(this.currentPageInput)
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
