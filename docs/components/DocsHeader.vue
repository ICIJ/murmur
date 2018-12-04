<template>
  <div class="docs-header" v-if="showHeader">
    <div class="docs-header__container">
      <div class="docs-header__container__breadcrumb" v-if="showBreadcrumb">
        <a v-for="item in breadcrumb" class="docs-header__container__breadcrumb">
          {{ item }}
        </a>
      </div>
      <h1 class="docs-header__container__title">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import startCase from 'lodash/startCase'

  export default {
    name: 'DocsMenu',
    computed: {
      title () {
        return get(this, '$route.meta.title', '')
      },
      section () {
        return get(this, '$route.meta.section')
      },
      breadcrumb () {
        return get(this, '$route.meta.breadcrumb', [this.section]).map(startCase)
      },
      showHeader () {
        return this.title !== ''
      },
      showBreadcrumb () {
        return this.breadcrumb.length > 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  $docs-header-bg: $light;
  $docs-header-border-color: darken($docs-header-bg, 10);

  .docs-header {
    background: $docs-header-bg;
    border-bottom: 1px solid $docs-header-border-color;

    &__container {
      max-width: 770px;
      margin: auto;
      padding: $spacer * 1.5 0;

      &__title {
        padding: 0;
      }
    }

  }
</style>
