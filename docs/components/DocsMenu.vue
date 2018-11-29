<template>
  <div class="docs-menu">
    <router-link class="docs-menu__brand" :to="{ name: 'home-page' }">
      <img src="@/assets/images/icij-white.svg" />
    </router-link>
    <h4 class="docs-menu__heading">
      Components
    </h4>
    <ul class="docs-menu__list list-unstyled">
      <li v-for="route in componentsRoutes" :key="route.path" class="docs-menu__list__item">
        <router-link :to="route.path">
          <span class="docs-menu__list__item__icon">
            <fa icon="puzzle-piece" class="mr-1" />
          </span>
          {{ label(route.name) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import startCase from 'lodash/startCase'
  import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece'

  import { componentsRoutes } from '../routes'
  import { library, default as Fa } from '@/components/Fa'
  library.add(faPuzzlePiece)

  export default {
    name: 'DocsMenu',
    components: {
      Fa
    },
    data () {
      return { componentsRoutes }
    },
    methods: {
      label (name) {
        return startCase(name)
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
    padding:  $spacer * 2;
    min-height: 100vh;
    height: 100%;
    color: $docs-menu-color;

    &__brand {
      display: block;
      border:1px solid $primary;
      margin-bottom: $spacer * 3;
      max-width: 110px;

      img {
        width: 100%;
      }
    }

    &__heading {
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 200;
      color: $docs-menu-muted;
      margin-bottom: $spacer;
    }

    &__list {

      &__item {
        padding-bottom: $spacer;

        &__icon {
          color: $docs-menu-muted;
          margin-left: 0.25 * $spacer;

          .router-link-active & {
            color: $primary;
          }
        }

        a {
          color: $docs-menu-color;
          position: relative;

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
            top: -0.5 * $spacer;
            bottom: -0.5 * $spacer;
            left: -0.5 * $spacer;
            right: -0.5 * $spacer;
            border-radius: 1em;
          }

          &.router-link-active:before {
            border: 1px solid rgba(white, 0.5);
            background: rgba($docs-menu-muted, 0.2);
          }
        }
      }
    }

  }
</style>
