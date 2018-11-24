<template>
  <div class="sample-card mb-5">
    <h4 class="sample-card__title" v-if="title">
      {{ title }}
    </h4>
    <p class="sample-card__description" v-if="description">
      {{ description }}
    </p>
    <div class="sample-card__body card">
      <div v-if="collapseCode">
        <div class="sample-card__body__render bg-light">
          <component :is="component" />
        </div>
      </div>
      <div class="sample-card__body__actions border-top row no-gutters">
        <button class="btn btn-sm font-weight-bold btn-primary col" @click="toggleCode()" :class="{ active: !collapseCode }">
          <fa icon="code" class="mr-1" />
          <span v-if="collapseCode">Show code</span>
          <span v-if="!collapseCode">Hide code</span>
        </button>
        <button class="btn btn-sm font-weight-bold btn-primary col" @click="$copyText(code)">
          <fa icon="paste" class="mr-1" />
          Copy
        </button>
      </div>
      <div v-if="!collapseCode" class="sample-card__body__code bg-dark">
        <pre class="text-light p-2 m-0"><code>{{ code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
  import SlideUpDown from 'vue-slide-up-down'
  import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
  import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste'

  import { library, default as Fa } from '@/components/Fa'
  library.add(faCode, faPaste)

  export default {
    name: 'SampleCard',
    components: {
      SlideUpDown,
      Fa
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
