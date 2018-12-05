<template>
  <div id="app" class="app">
    <div class="row no-gutters">
      <div class="col app__menu">
        <docs-menu></docs-menu>
      </div>
      <div class="col">
        <div class="app__main">
          <docs-header></docs-header>
          <router-view class="app__main__view py-4"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocsHeader from './DocsHeader.vue'
import DocsMenu from './DocsMenu.vue'

export default {
  name: 'app',
  components: {
    DocsHeader,
    DocsMenu
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .app {

    & /deep/ .hljs {
      background: $dark;
      padding: $spacer;
    }

    &__menu {
      max-width: 300px;
    }

    &__main {
      min-height: 100%;
      border: $spacer solid $docs-menu-bg;
      position: relative;

      &__view {
        max-width: 770px;
        margin: auto;
      }
    }
  }
</style>
