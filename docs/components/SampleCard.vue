<template>
  <div class="sample-card mb-5">
    <h4 class="sample-card__title" v-if="title">
      {{ title }}
    </h4>
    <p class="sample-card__description" v-if="description">
      {{ description }}
    </p>
    <div class="sample-card__body card">
      <slide-up-down :active="collapseCode" :duration="200">
        <div class="sample-card__body__render bg-light">
          <component :is="component" />
        </div>
      </slide-up-down>
      <div class="sample-card__body__actions border-top row no-gutters">
        <button class="btn btn-sm font-weight-bold btn-primary col" @click="toggleCode()" :class="{ active: !collapseCode }">
          <i class="fas fa-code mr-1"></i>
          <span v-if="collapseCode">Show code</span>
          <span v-if="!collapseCode">Hide code</span>
        </button>
        <button class="btn btn-sm font-weight-bold btn-primary col" @click="$copyText(code)">
          <i class="fas fa-paste"></i>
          Copy
        </button>
      </div>
      <slide-up-down :active="!collapseCode" class="sample-card__body__code bg-dark" :duration="200">
        <pre class="text-light p-2 m-0"><code>{{ code }}</code></pre>
      </slide-up-down>
    </div>
  </div>
</template>

<script>
  import SlideUpDown from 'vue-slide-up-down'

  export default {
    name: 'SampleCard',
    components: {
      SlideUpDown
    },
    props: {
      title: {
        type: String
      },
      description: {
        type: String
      },
      component: {
        type: [Object, Function],
        required: true
      },
      code: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        collapseCode: true
      }
    },
    methods: {
      toggleCode (toggle = !this.collapseCode) {
        this.collapseCode = toggle
      }
    }
  }
</script>

<style lang="scss">
  .sample-card {

    &__body {

      &__render {
        overflow: auto;
        max-width: 100%;
      }
    }
  }
</style>
