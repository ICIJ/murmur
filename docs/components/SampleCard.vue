<template>
  <div class="sample-card mb-5">
    <h4 class="sample-card__title" v-if="title">
      {{ title }}
    </h4>
    <p class="sample-card__description text-muted" v-if="description">
      {{ description }}
    </p>
    <div class="sample-card__body card">
      <slide-up-down :active="collapseCode" class="sample-card__body__render bg-light">
        <slot v-if="useSlot"></slot>
        <template v-else-if="component">
          <component :is="component" />
        </template>
      </slide-up-down>
      <div class="sample-card__body__actions border-top row no-gutters">
        <button class="btn btn-sm font-weight-bold btn col" @click="toggleCode()" :class="{ active: !collapseCode }">
          <fa icon="code" class="mr-1" />
          <span v-if="collapseCode">Show code</span>
          <span v-if="!collapseCode">Hide code</span>
        </button>
        <haptic-copy class="btn-sm font-weight-bold btn col" :text="extractedCode" v-if="extractedCode" />
      </div>
      <slide-up-down :active="!collapseCode" class="sample-card__body__code bg-dark">
        <slot name="code">
          <pre><code :class="lang" v-html="code"></code></pre>
        </slot>
      </slide-up-down>
    </div>
  </div>
</template>

<script>
  import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'

  import { library, default as Fa } from '@/components/Fa'
  import SlideUpDown from '@/components/SlideUpDown.vue'

  export default {
    name: 'SampleCard',
    components: {
      SlideUpDown,
      Fa
    },
    beforeMount () {
      library.add(faCode)
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
        default: () => null
      },
      code: {
        type: String,
        default: null
      },
      lang: {
        type: String,
        default: 'html'
      }
    },
    data () {
      return {
        collapseCode: true,
        extractedCode: null
      }
    },
    async mounted () {
      await this.$nextTick()
      const codeElement = this.$el.querySelector('.sample-card__body__code code')
      this.extractedCode = this.code || codeElement?.textContent?.replace(/\\/, '')
    },
    methods: {
      toggleCode (toggle = !this.collapseCode) {
        this.collapseCode = toggle
      }
    },
    computed: {
      useSlot () {
        return !!this.$slots.default && !!this.$slots.default.length
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .sample-card {

    &__body {

      &__render {
        overflow: visible;
        max-width: 100%;
      }

      &__actions .btn {
        background: darken($light, 5%);
        &:not(:last-of-type) {
          border-right: $border-width solid $border-color;
        }
      }

      &__code {
        pre {
          padding: $spacer * 0.5;
          margin: 0;
        }
      }
    }
  }
</style>
