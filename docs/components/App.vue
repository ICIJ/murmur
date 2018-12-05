<template>
  <div id="app" class="app">
    <div class="app__navbar d-block d-md-none bg-dark px-3 pt-3 clearfix">
      <router-link to="/">
        <img src="@/assets/images/icij-white.svg" alt="ICIJ" class="border border-primary d-inline-block" height="30px" />
      </router-link>
      <button class="btn btn-link text-white float-right" @click="toggleMenu">
        <fa icon="bars" />
      </button>
    </div>
    <div @click="toggleMenu" class="app__overlay" v-if="!collapseMenu"></div>
    <div class="row no-gutters">
      <div class="col app__menu" :class="{ 'app__menu--collapse': collapseMenu }">
        <docs-menu></docs-menu>
      </div>
      <div class="col">
        <div class="app__main">
          <docs-header></docs-header>
          <router-view class="app__main__view py-4"></router-view>
          <edit-link></edit-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { library, default as Fa } from '@/components/Fa'

import DocsHeader from './DocsHeader.vue'
import DocsMenu from './DocsMenu.vue'
import EditLink from './EditLink.vue'

export default {
  name: 'app',
  components: {
    DocsHeader,
    DocsMenu,
    EditLink
  },
  data () {
    return {
      collapseMenu: true
    }
  },
  beforeCreate () {
    library.add(faBars)
  },
  watch: {
    '$route.name': function () {
      this.collapseMenu = true
    }
  },
  methods: {
    toggleMenu () {
      this.collapseMenu = !this.collapseMenu
      // Use bootstrap's class to disable scrolling on the body
      document.body.classList.toggle('modal-open', !this.collapseMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';
  @import 'node_modules/bootstrap/scss/_mixins.scss';

  .app {

    & /deep/ .hljs {
      background: $dark;
      padding: $spacer;
    }

    &__overlay {
      z-index: $zindex-modal-backdrop;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $modal-backdrop-bg;
    }

    &__menu {
      max-width: $app-menu-max-width;
      min-width: $app-menu-max-width;
      background: $docs-menu-bg;

      @include media-breakpoint-down(sm) {
        z-index: $zindex-modal;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: auto;
        overflow: auto;

        &--collapse {
          visibility: hidden;
        }
      }
    }

    &__main {
      min-height: 100%;
      border: $spacer solid $docs-menu-bg;

      @include media-breakpoint-down(sm) {
        min-height: 100vh;
      }

      &__view {
        max-width: $app-main-max-width;
        padding: 0 $spacer;
        margin: auto;
      }
    }
  }
</style>
