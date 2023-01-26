<template>
  <div class="custom-pagination container-fluid" :class="{ 'custom-pagination--compact': compact, 'custom-pagination--pills': pills }">
    <div class="row justify-content-center align-items-stretch" :class="{ 'no-gutters': compact && !pills }">
      <div class="col-auto custom-pagination__pages">
        <b-pagination @input="updateValue"
         :total-rows="perPage * numberOfPages"
         :per-page="perPage"
         :value="value"
         :pills="pills"
         :class="paginationClassList"
         :size="size"
         class="m-0"
         first-number
         last-number>
          <template #prev-text="{ disabled, index, page }">
            <!-- @slot The 'Go to previous page' button content -->
            <slot name="prev-text" v-bind="{ disabled, index, page }" />
          </template>
          <template #next-text="{ disabled, index, page }">
            <!-- @slot The 'Go to next page' button content -->
            <slot name="next-text" v-bind="{ disabled, index, page }" />
          </template>
          <template #page="{ active, content, disabled, index, page }">
            <!-- @slot Page number button content -->
            <slot name="page" v-bind="{ active, content, disabled, index, page }" />
          </template>
          <template #ellipsis-text>
            <!-- @slot The '...' indicator content. Overrides the `ellipsis-text` prop -->
            <slot name="ellipsis-text" />
          </template>
         </b-pagination>
      </div>
      <div class="col-auto">
        <div class="custom-pagination__form">
          <form class="input-group" @submit.prevent="applyJumpFormPage">
            <b-input-group :size="size">
              <input v-model="currentPageInput" type="number" class="form-control" :placeholder="inputPlaceholder" aria-label="Jump to page" />
              <div class="input-group-append" v-if="!compact">
                <button class="btn btn-secondary btn-sm" type="submit">
                  <span class="px-1 py-3">
                    Go
                  </span>
                </button>
              </div>
            </b-input-group>
         </form>
         <template v-if="!compact">
           <small class="float-left mt-1 ml-1 text-danger" id="invalid-number-error" v-if="errors.length">
             {{ errors[0] }}
           </small>
           <small class="float-left mt-1 ml-1 text-muted" v-else>
             {{ $tc('custom-pagination.total-pages', numberOfPages, { count: numberOfPages }) }}
           </small>
         </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { BPagination, BInputGroup } from 'bootstrap-vue'
  import i18n from '@/i18n'
  import { defineComponent } from 'vue'
  import { Size } from  "@/enums"
  import { TranslateResult } from 'vue-i18n'

  interface CustomPaginationData {
    currentPageInput: string,
    invalidNumberError: TranslateResult,
    errors: TranslateResult[]
  }


  export default defineComponent({
    i18n,
    name: 'CustomPagination',
    components: {
      BInputGroup,
      BPagination,
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
      * Set the size of the input: 'sm', 'md' (default), or 'lg'.
      */
      size: {
        type: String,
        default: Size.md,
        validator: (value:Size)=> Object.values(Size).includes(value)
      },
      /**
       * Compact layout
       */
      compact: {
        type: Boolean
      },
      /**
       * (Optional) Number of page. Propety `size` is required for this to work
       * properly. If `pages` is empty, it will be calculated using the size.
       */
      pages: {
        type: [Number, String],
        default: null
      }
    },
    data() : CustomPaginationData {
      return {
        currentPageInput: '',
        invalidNumberError: this.$t('custom-pagination.invalid-number-error'),
        errors: []
      }
    },
    methods: {
      applyJumpFormPage () : void{
        const number = isNaN(parseInt(this.currentPageInput)) ? 0 : parseInt(this.currentPageInput)
        this.errors = []
        if (number > this.numberOfPages || number < 1 ) {
          this.errors.push(this.invalidNumberError)
        }
        if (this.errors.length == 0) {
          this.$emit('input', parseInt(this.currentPageInput))
        }
      },
      updateValue(value:string) : void{
        this.$emit('input', value)
      }
    },
    computed: {
      inputPlaceholder (): string {
        const compact = this.compact ? 'compact-' : ''
        return this.$t(`custom-pagination.${compact}placeholder`) as string
      },
      numberOfPages (): number {
        if (this.pages === null) {
          return Math.ceil(this.totalRows / this.perPage)
        }
        return Number(this.pages)
      },
      paginationClassList(): string[] {
        return this.size === Size.sm ? ['float-right', 'mr-1']: []
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../styles/lib';

  .custom-pagination {

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

    &:not(.custom-pagination--compact) &__pages {
      border-right: 1px solid $border-color;
    }

    &--compact &__pages:deep(.page-item:last-of-type .page-link) {
      border-right: 0;
      border-radius: 0;
    }

    &--compact &__form {
      max-width: 105px;

      &, & > .input-group {
        height: 100%;
      }
    }

    &--compact &__form input {
      height: 100%;
    }

    &--compact > .row {
      align-items: center;
    }
  }
</style>
