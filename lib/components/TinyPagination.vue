<template>
  <div
    class="tiny-pagination"
    :class="paginationClassList"
  >
    <b-button 
      class="tiny-pagination__nav" 
      :size="size" 
      :disabled="!hasPrevious"
      :variant="navVariant" 
      @click="applyPreviousPage"
    >
      <!-- @slot Previous button content -->
      <slot
        name="previous"
        v-bind="{ value, numberOfPages, hasPrevious, hasNext }"
      >
        <fa :icon="previousPageIcon" />
        <span class="sr-only">{{ $tc('tiny-pagination.previous') }}</span>
      </slot>
    </b-button>
    <form
      class="tiny-pagination__form form-inline"
      @submit.prevent="applyPageForm"
    >
      <label class="tiny-pagination__form__label mr-1">
        <!-- @slot Display page label -->
        <slot
          name="page"
          v-bind="{ value, numberOfPages }"
        >
          {{ $t('tiny-pagination.page') }}
        </slot>
      </label>
      <b-form-input 
        v-model="currentPageInput"
        :size="size"
        class="tiny-pagination__form__input mr-1" 
        type="number" 
        step="1" 
        :min="1"
        :max="numberOfPages"
        :aria-label="$tc('tiny-pagination.aria')"
      />
      <!-- @slot Display number of pages -->
      <slot
        name="number-of-pages"
        v-bind="{ value, numberOfPages }"
      >
        {{ $tc('tiny-pagination.total', numberOfPages, { numberOfPages }) }}
      </slot>
    </form>
    <b-button 
      class="tiny-pagination__nav" 
      :size="size" 
      :disabled="!hasNext"
      :variant="navVariant" 
      @click="applyNextPage"
    >
      <!-- @slot Next button content -->
      <slot
        name="next"
        v-bind="{ value, numberOfPages, hasPrevious, hasNext }"
      >
        <fa :icon="nextPageIcon" />
        <span class="sr-only">{{ $tc('tiny-pagination.next') }}</span>
      </slot>
    </b-button>
  </div>
</template>

<script lang="ts">
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { BButton, BFormInput } from 'bootstrap-vue'
import i18n from '@/i18n'
import { defineComponent } from 'vue'
import { Size } from "@/enums"
import { library, default as Fa } from './Fa'

interface TinyPaginationData {
  currentPageInput: number
}

export default defineComponent({
  i18n,
  name: 'TinyPagination',
  components: {
    BButton,
    BFormInput,
    Fa
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
      type: [Number, String],
      default: 1
    },
    /**
    * Set the size of the input: 'sm', 'md' (default), or 'lg'.
    */
    size: {
      type: String,
      default: Size.md,
      validator: (value: Size) => Object.values(Size).includes(value)
    },
    /**
     * (Optional) Number of page. Propety `size` is required for this to work
     * properly. If `pages` is empty, it will be calculated using the size.
     */
    pages: {
      type: [Number, String],
      default: null
    },
    /**
    * Hide navigation buttons (next and previous)
    */
    noNav: {
      type: Boolean
    },
    /**
    * FontAwesome icon of the previous page button
    */
    previousPageIcon: {
      type: [String, Array, Object],
      default: 'angle-left'
    },
    /**
    * FontAwesome icon of the next page button
    */
    nextPageIcon: {
      type: [String, Array, Object],
      default: 'angle-right'
    },
    /**
    * Navigation button variants
    */
    navVariant: {
      type: String,
      default: 'link'
    },
    /**
     * Display pagination as a block (full width)
     */
    block: {
      type: Boolean
    }
  },
  data(): TinyPaginationData {
    return {
      currentPageInput: +this.value
    }
  },
  computed: {
    numberOfPages(): number {
      if (this.pages === null) {
        return Math.ceil(this.totalRows / this.perPage)
      }
      return Number(this.pages)
    },
    paginationClassList(): object {
      return {
        [`tiny-pagination--${this.size}`]: true,
        [`tiny-pagination--no-nav`]: this.noNav,
        [`tiny-pagination--block`]: this.block
      }
    },
    hasPrevious(): boolean {
      return +this.value > 1
    },
    hasNext(): boolean {
      return +this.value < this.numberOfPages
    }
  },
  watch: {
    value (value: number|string) {
      this.currentPageInput = +value
    }
  },
  beforeMount() {
    library.add(faAngleLeft, faAngleRight)
  },
  methods: {
    applyPageForm(): void {
      if (!isNaN(this.currentPageInput)) {
        this.$emit('input', this.currentPageInput)
      }
    },
    applyPreviousPage(): void {
      this.$emit('input', +this.value - 1)
    },
    applyNextPage(): void {
      this.$emit('input', +this.value + 1)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/lib';

.tiny-pagination {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &--block {
    display: flex;
  }

  &--sm {
    font-size: $font-size-sm;
  }
  
  &--lg {
    font-size: $font-size-lg;
  }

  &--no-nav &__nav {
    display: none
  }

  &--no-nav &__form {
    margin: 0;
  }


  &__form {
    margin: 0 $spacer * .25;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &__input {
      max-width: 2.5rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      text-align: center;

      &[type=number] {
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
      }
    }
  }
}
</style>
