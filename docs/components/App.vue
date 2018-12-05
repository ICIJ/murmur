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
    <div class="row no-gutters">
      <div class="col app__menu" :class="{ 'app__menu--collapse': collapseMenu }">
        <docs-menu></docs-menu>
        <div @click="toggleMenu" class="app__menu__overlay"></div>
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
  methods: {
    toggleMenu () {
      this.collapseMenu = !this.collapseMenu
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

    &__menu {
      max-width: $app-menu-max-width;
      min-width: $app-menu-max-width;
      background: $docs-menu-bg;

      &__overlay {
        display: none;
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba($docs-menu-bg, 0.5);
      }
      
      @include media-breakpoint-down(sm) {
        z-index: $zindex-modal-backdrop;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: auto;
        overflow: auto;

        &__overlay {
          display: block;
        }

        &--collapse &__overlay {
          display: none;
        }

        &--collapse {
          display: none;
        }
      }
    }

    &__main {
      min-height: 100vh;
      border: $spacer solid $docs-menu-bg;
      position: relative;

      &__view {
        max-width: $app-main-max-width;
        padding: 0 $spacer;
        margin: auto;
      }
    }
  }
</style>
