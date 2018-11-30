<template>
  <div class="docs-menu">
    <div class="docs-menu__brand">
      <router-link class="docs-menu__brand__logo" :to="{ name: 'home-page' }">
        <img src="@/assets/images/icij-white.svg" alt="ICIJ" />
      </router-link>
      <div class="docs-menu__brand__version">
        <div>{{ version }}</div>
      </div>
    </div>
    <router-link class="docs-menu__link mb-4" :to="{ name: 'home-page' }">
      <fa icon="rocket" class="docs-menu__link__icon mr-1" />
      Getting started
    </router-link>
    <docs-menu-section v-for="section in sections" :key="section.name" v-bind="section"></docs-menu-section>
  </div>
</template>

<script>
  import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece'
  import { faRocket } from '@fortawesome/free-solid-svg-icons/faRocket'

  import { componentsRoutes, visualRoutes, utilitiesRoutes, dataVisualisationRoutes } from '../routes'
  import DocsMenuSection from './DocsMenuSection'
  import { library, default as Fa } from '@/components/Fa'

  library.add(faPuzzlePiece)
  library.add(faRocket)

  export default {
    name: 'DocsMenu',
    components: {
      DocsMenuSection,
      Fa
    },
    props: {
      sections: {
        type: Array,
        default () {
          return [
            {
              name: 'Visual guidelines',
              routes: visualRoutes
            },
            {
              name: 'Components',
              routes: componentsRoutes,
              icon: faPuzzlePiece
            },
            {
              name: 'Data Visualisation',
              routes: dataVisualisationRoutes
            },
            {
              name: 'utilities',
              routes: utilitiesRoutes
            }
          ]
        }
      }
    },
    data () {
      return {
        version: require('../../package.json').version
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  $docs-menu-bg: $dark;
  $docs-menu-color: text-contrast(#46424C);
  $docs-menu-muted: mix($docs-menu-bg, $docs-menu-color, 50);

  .docs-menu {
    background: $docs-menu-bg;
    padding:  $spacer * 1.5 $spacer;
    min-height: 100vh;
    height: 100%;
    color: $docs-menu-color;

    &__brand {
      display: flex;
      margin-bottom: $spacer * 3;

      &__logo {
        display: block;
        border:1px solid $primary;

        img {
          width: 110px;
          max-width: 100%;
        }
      }

      &__version {
        background: $primary;
        width: 1em * $line-height-base;

        & > * {
          transform: rotate(90deg) translateY(-100%);
          transform-origin: left top;
          width: 110px;
          text-align: center;
        }
      }
    }

    &__heading {
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 200;
      color: $docs-menu-muted;
      margin-bottom: $spacer;
    }

    &__link {
      color: $docs-menu-color;
      position: relative;
      margin-bottom: $spacer * 0.5;
      padding: $spacer * 0.25 $spacer * 0.75;
      display: inline-block;

      &__icon {
        color: $docs-menu-muted;

        .router-link-exact-active & {
          color: $primary;
        }
      }

      &:hover {
        color: $docs-menu-color;
        text-decoration: none;

        &:before {
          background: rgba($docs-menu-muted, 0.1);
        }
      }

      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 1em * $line-height-base;
      }

      &.router-link-exact-active:before {
        border: 1px solid rgba(white, 0.5);
        background: rgba($docs-menu-muted, 0.2);
      }
    }
  }
</style>
