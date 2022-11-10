<template>
  <div class="accordion-wrapper">
    <div class="accordion-wrapper__content ml-5">
      <!-- @slot Content with all the steps declarations -->
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {AccordionKey} from "@/keys"
import type {AccordionProvide, Step} from "@/types";
const STEP_CHANGE_EVENT:string = 'step-change'
export default Vue.extend({
  name: "AccordionWrapper",
  model: {
    prop: 'step',
    event: STEP_CHANGE_EVENT
  },
  props: {
    /**
     * Current active step value. Modified on "step-change" event.
     */
    step: {
      type: [String, Symbol, Object as ()=>Step ],
      required: true
    },
    /**
     * List of the steps. Numbering respects the array positions
     */
    steps: {
      type: Array as PropType<Step[]>,
      required: true
    },
  },
  provide(): AccordionProvide {
    return {
      [AccordionKey]: {
        emitAccordionNextStepEvent: this.emitAccordionNextStepEvent,
        emitAccordionPreviousStepEvent: this.emitAccordionPreviousStepEvent,
        isActiveStep: this.isActiveStep,
        isPreviousStep: this.isPreviousStep,
        isFirstStep: this.isFirstStep,
        isLastStep: this.isLastStep,
        step: this.step,
        steps: this.steps
      }
    }
  },
  computed: {
    activeStepIndex(): number {
      return this.steps.indexOf(this.step)
    },
  },
  methods: {
    isFirstStep(step: Step): boolean {
      return this.steps.indexOf(step) === 0
    },
    isLastStep(step: Step): boolean {
      return this.steps.indexOf(step) === this.steps.length - 1
    },
    isActiveStep(step: Step): boolean {
      return this.step === step
    },
    isPreviousStep(step: Step): boolean {
      return this.steps.indexOf(step) < this.activeStepIndex
    },
    emitAccordionNextStepEvent(): void {
      /**
       * When the step is changed it updates the step v-model value.
       * @event step-change
       * @param Mixed New step value.
       */
      this.$emit(STEP_CHANGE_EVENT, this.steps[this.activeStepIndex + 1] || this.step)
    },
    emitAccordionPreviousStepEvent(): void {
      this.$emit(STEP_CHANGE_EVENT, this.steps[this.activeStepIndex - 1] || this.step)
    }
  },
})

</script>


<style lang="scss" scoped>
@use "sass:math";
@import '~@/styles/variables.scss';


.accordion-wrapper {
  $step-bullet-size: 2rem;
  $step-bullet-font-size: math.div($step-bullet-size, 2);

  &__content {
    counter-reset: step 0;
    max-width: 550px;

    &__step {
      margin-bottom: $spacer;
      position: relative;
      opacity: $btn-disabled-opacity;
      transition: $transition-base;

      &--active, &--previous {
        opacity: 1;
      }

      &__heading + .collapse > .card-body {
        padding-top: 0;
      }

      &:before {
        counter-increment: step;
        content: counter(step);
        z-index: 10;
        line-height: $step-bullet-size;
        height: $step-bullet-size;
        width: $step-bullet-size;
        text-align: center;
        font-size: $step-bullet-font-size;
        border-radius: 50%;
        display: block;
        color: white;
        font-weight: bolder;
        position: absolute;
        right: calc(100% + #{$spacer});
        top: $spacer * 1.25;
        background: $text-muted;
        transition: background $transition-base;
      }

      &--active:before, &--previous:before {
        background: $info;
      }

      &:not(:last-of-type):after {
        content: "";
        z-index: 0;
        position: absolute;
        top: $spacer * 1.25;
        right: calc(100% + #{$spacer} + #{math.div($step-bullet-size, 2)});
        transform: translateX(50%);
        bottom: -4rem;
        width: 3px;
        background: transparent;
        transition: background 400ms;
      }

      &--previous:not(:last-of-type):after {
        background: $info;
      }
    }
  }
}
</style>