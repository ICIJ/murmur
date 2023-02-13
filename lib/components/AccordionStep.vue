<template>
  <b-card
      :class="{
      'accordion-wrapper__content__step--active': isActive,
      'accordion-wrapper__content__step--previous': isPrevious,
    }"
      class="accordion-wrapper__content__step"
      no-body
  >
    <h4 class="card-body accordion-wrapper__content__step__heading m-0">
      <!-- @slot Title of the step -->
      <slot name="title">{{ title }}</slot>
    </h4>
    <b-collapse :visible="isActive">
      <div class="accordion-wrapper__content__step__main card-body row no-gutters">
        <!-- @slot Content of the step with props {isFirst:boolean, isLast:boolean, step:Step, nextStep:Function}-->
        <slot name="content" v-bind="{isFirst, isLast, step, previousStep, nextStep }">
          {{ content }}
        </slot>
      </div>
      <div class="card-footer">
        <!-- @slot Previous step button with props {isFirst:boolean, isLast:boolean, step:Step, nextStep:Function} -->
        <slot name="previousStepButton" v-bind="{ isFirst, isLast, step, previousStep }">
          <b-button
              v-if="!isFirst"
              class="accordion-wrapper__content__step__back-button"
              type="button"
              variant="link"
              @click="previousStep"
          >
            Back
          </b-button>
        </slot>
        <!-- @slot Next step button with props {isFirst:boolean, isLast:boolean, step:Step, nextStep:Function} }-->
        <slot name="nextStepButton" v-bind="{ isFirst, isLast, step, nextStep }">
          <b-button
              v-if="!isLast"
              class="accordion-wrapper__content__step__continue-button"
              type="button"
              variant="primary"
              @click="nextStep"
          >
            Continue
          </b-button>
        </slot>
      </div>
    </b-collapse>
  </b-card>
</template>

<script lang="ts">
import Vue, { VueConstructor} from "vue"
import {AccordionKey} from "@lib/keys"
import {Accordion, Step} from "@lib/types";

interface AccordionMixin {
  accordion: Accordion
}

export default (Vue as VueConstructor<Vue & AccordionMixin>).extend({
  name: "AccordionStep",
  inject: {
    accordion: {from: AccordionKey}
  },
  props: {
    /**
     * Step name
     */
    step: {
      type: [String, Object as ()=>Step, Symbol],
      required: true
    },
    /**
     * Title of the step card
     */
    title: {
      type: String,
    },
    /**
     * Content of the step card
     */
    content: {
      type: String,
    },
    /**
     * Force card expansion/collapse
     */
    active: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    nextStep() {
      this.accordion?.emitAccordionNextStepEvent()
      /**
       * Fired when the nextStep function is called
       * either by clicking on the next button or in the next step slot
       * with the new value as parameter
       * @event next-step
       * @param Mixed New step value.
       */
      this.$emit("next-step")
    },
    previousStep() {
      this.accordion?.emitAccordionPreviousStepEvent()
      /**
       * Fired when the previousStep function is called
       * either by clicking on the previous button or in the previous step slot
       * with the new value as parameter
       * @event previous-step
       * @param Mixed New step value.
       */
      this.$emit("previous-step")
    },
  },
  computed: {
    isActive(): boolean {
      const fromAccordion = !!this.accordion?.isActiveStep(this.step)
      const fromSelf = this.active !== undefined ? this.active : false
      return fromSelf || fromAccordion
    },
    isPrevious(): boolean {
      // see slot props in Accordion.vue
      return !!this.accordion?.isPreviousStep(this.step)
    },
    isFirst(): boolean {
      return !!this.accordion?.isFirstStep(this.step)
    },
    isLast(): boolean {
      return !!this.accordion?.isLastStep(this.step)
    }
  }
})
</script>