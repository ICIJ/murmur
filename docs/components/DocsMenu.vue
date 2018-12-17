<template>
  <div class="docs-menu d-flex flex-column justify-content-between">
    <div>
      <div class="docs-menu__brand d-none d-md-flex">
        <router-link class="docs-menu__brand__logo" to="/">
          <img src="@/assets/images/murmur-white.svg" alt="ICIJ" />
        </router-link>
        <div class="docs-menu__brand__version">
          <a class="small d-block text-white" href="https://www.npmjs.com/package/@icij/murmur" target="_blank">
            <strong>Murmur</strong> {{ version }}
          </a>
        </div>
      </div>
      <docs-menu-section v-for="section in sections" :key="section.name" v-bind="section"></docs-menu-section>
    </div>
    <a class="docs-menu__footer d-flex align-items-center" href="https://icij.org" target="_blank">
      <img src="@/assets/images/icij-white.svg" alt="ICIJ" class="docs-menu__footer__logo mr-2" />
      <span>An open source project by ICIJ</span>
    </a>
  </div>
</template>

<script>
  import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece'
  import { version } from '@package'
  import { filterRoutes } from '../routes'
  import DocsMenuSection from './DocsMenuSection'
  import { library, default as Fa } from '@/components/Fa'

  library.add(faPuzzlePiece)

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
              name: 'Getting started',
              routes: filterRoutes({ meta: { section: 'getting-started' } })
            },
            {
              name: 'Visual guidelines',
              routes: filterRoutes({ meta: { section: 'visual' } })
            },
            {
              name: 'Components',
              routes: filterRoutes({ meta: { section: 'components' } }),
              icon: faPuzzlePiece
            },
            {
              name: 'Data Visualisation',
              routes: filterRoutes({ meta: { section: 'datavisualisation' } })
            },
            {
              name: 'utilities',
              routes: filterRoutes({ meta: { section: 'utilities' } })
            }
          ]
        }
      }
    },
    data () {
      return {
        version
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .docs-menu {
    padding:  $spacer * 1.5 $spacer $spacer;
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

    &__footer {
      padding: $spacer;
      background: rgba($light, .1);
      border-radius: $border-radius-sm;
      color: $light;
      font-size: 0.9em;

      &__logo {
        border: 1px solid $light;
        height: 2em;
      }

      &:hover {
        color: inherit;
        background: rgba($light, .2);
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

    &__badge {
      border-radius: $border-radius;
      opacity: 0.7;
    }
  }
</style>
