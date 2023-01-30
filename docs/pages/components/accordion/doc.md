---
title: Accordion
description: Display a step by step accordion
---

Accordion and accordion steps. 


Accordion "provides" functions and current step to accordion steps. Therefore, each accordion steps has the accordion methods and attributes "injected". 

The AccordionWrapper provides the step numbering and animation. It will also provide the current steps to all children.
The AccordionStep component can be used independently of the AccordionWrapper component and the AccordionWrapper component can use other children components than the AccordionStep component we provide.

## AccordionWrapper 

:::sample-card
<div class="p-4">
  <accordion-wrapper :steps="steps" v-model="step" class="p-2">
    <accordion-step
      :step="$options.stepsEnum.MAILVELOPE"
      class="accordion-step__mailvelope"
      title="Install Mailvelope"
      content="Install Mailvelope and create your key"
    />
    <accordion-step
      :step="$options.stepsEnum.EXPORT_PUBLIC_KEY"
      title="Export your public key"
    >
      <template #content>
        <p>
          Export your public PGP key as a .asc file and download on your
          computer
        </p>
      </template>
    </accordion-step>
    <accordion-step
      :active="active"
      :step="$options.stepsEnum.UPLOAD_PUBLIC_KEY"
    >
      <template #title>
        Upload your publickey
      </template>
      <template #nextStepButton>
        <b-button variant="info">The end!</b-button>
      </template>
    </accordion-step>
</accordion-wrapper>
</div>
:::

<api-table path="components/AccordionWrapper.vue"></api-table>
<br/>

## AccordionStep

A single AccordionStep component with the possibility to collapse/expand the content


:::sample-card
<div class="p-4">
  <accordion-step :active="active"
        :step="$options.stepsEnum.MAILVELOPE"
        content="Install Mailvelope and create your key"
      ><template #title>
      <b-button @click="active = !active">{{active?'Expanded':'Collapsed'}}</b-button> Install Mailvelope 
      </template>
      </accordion-step>

</div>
:::

<api-table path="components/AccordionStep.vue"></api-table>

<style>
  .bg-striped {
    background: repeating-linear-gradient(45deg, #dfdddd, #dfdddd 10px, #cfcccc 10px, #cfcccc 20px)    
  }
</style>

<script>

  export default {
    data () {
      return {
        step: this.$options.stepsEnum.MAILVELOPE,
        steps: Object.values(this.$options.stepsEnum),
        active: false
      }
    },
    stepsEnum:Object.freeze({
      MAILVELOPE: Symbol("MAILVELOPE"),
      EXPORT_PUBLIC_KEY: Symbol("EXPORT_PUBLIC_KEY"),
      UPLOAD_PUBLIC_KEY: Symbol("UPLOAD_PGP"),
    })
  }
</script>
