<template>
  <div class="digits-input">
    <div class="d-flex digits-input__container">
      <input
        :key="d - 1"
        :name="`digit-${d - 1}`"
        :class="`digits-input__container__input--${d - 1}`"
        @keyup.delete="focusToPreviousWhenEmpty(d - 1)"
        class="digits-input__container__input w-0 form-control"
        v-for="d in length"
        v-model="values[d - 1]"
      />
    </div>
  </div>  
</template>

<script lang="ts">
  import { filter, isEqual } from 'lodash'
  import { defineComponent } from 'vue'


  type DigitsInputData = { 
    mounted: boolean, 
    values: string[]
  }

  /**
   * Create an input for digits.
   */
  export default defineComponent({
    name: 'DigitsInput',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      /** 
       * Number of digits to display
       */
      length: {
        type: Number,
        default: 6
      },
      /**
       * Value enter by the user
       */
      value: {
        type: [String, Number],
        default: ''
      }
    },
    data(): DigitsInputData {
      return {
        mounted: false,
        values: String(this.value).split('').slice(0, this.length)
      }
    },  
    async mounted () {
      await this.$nextTick()
      this.mounted = true
    },
    watch: {
      values(values: number[] | null[]): void {
        // Copy the values
        const formattedValues = [...values]
        // Iterate over the values to be sure
        // they are not exceeding 10 and should 
        // be spread to the next inputs
        formattedValues.forEach((value, d) => {
          // Remove value that are not number
          if (value !== null && isNaN(value)) {
            formattedValues[d] = null
          // The value must be spread to the next input only
          // if it's higher than 9 (more than one digit)
          } else if (value !== null && value > 9) {
            // Split the number into an array of strings
            String(value).split('').forEach((nextValue, n) => {
              // Spread the value to the next inputs of the array
              formattedValues[d + n] = Number(nextValue)
            })
          }
        })
        // We update the values data attribute only if they changed 
        // to avoid an infinite update cycle
        if (!isEqual(this.values, formattedValues)) {
          this.$set(this, 'values', formattedValues.slice(0, this.length))
        }
        this.focusToNextInput()
      },
      joinedValues () {
        this.$emit('input', this.joinedValues)
      },
      value () {
        this.values = String(this.value).split('').slice(0, this.length)
      }
    },
    methods: {
      focusToNextInput () {
        if (this.hasNextInput) {
          this.nextInput?.focus()
        }
      },
      focusToPreviousWhenEmpty (d: number) {
        if (!this.values[d]) {
          this.inputs[d - 1]?.focus()
        }
      }
    },
    computed: {
      joinedValues (): string {
        return filter(this.values, v => !isNaN(v)).join('')
      },
      inputs(): NodeListOf<HTMLElement> | [] {
        if (!this.mounted) {
          return []
        }
        return this.$el.querySelectorAll<HTMLElement>('.digits-input__container__input')
      },
      nextInput(): HTMLElement | null {
        if (this.joinedValues.length == this.length) {
          return null
        }
        // Next input is the first non-empty input or the last input
        return this.inputs[this.joinedValues.length] || this.lastInput
      },
      hasNextInput (): boolean {
        return !!this.nextInput
      },
      lastInput(): HTMLElement | null {
        return this.inputs[this.inputs.length - 1]
      }
    }
  })
</script>

<style scoped lang="scss">
@import '../styles/lib.scss';

.digits-input {
  &__container {
    &__input {
      font-size: 3rem;
      height: 10rem;
      line-height: 10rem;
      text-align: center;
      padding: $spacer $spacer * 0.25;
      margin: 0 $spacer* 0.25;

      &:first-child {
        margin-left: 0;
      }
      
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>