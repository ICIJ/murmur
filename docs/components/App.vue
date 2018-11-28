<template>
  <div id="app">
    <div class="row no-gutters">
      <div class="col-2 d-none d-md-block">
        <docs-menu></docs-menu>
      </div>
      <div class="col">
        <div class="app__main">
          <div class="border-bottom py-4 my-4">
            <h1>ICIJ Vue Collection</h1>
            <p class="lead m-0">
              A collection of Vue components and utilities function by the ICIJ team.
            </p>
          </div>
          <router-view class="mb-4"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocsMenu from './DocsMenu.vue'

export default {
  name: 'app',
  components: {
    DocsMenu
  }
}
</script>

<style lang="scss" scoped>
  .app {
    &__main {
      max-width: 770px;
      margin: auto;
    }
  }
</style>
