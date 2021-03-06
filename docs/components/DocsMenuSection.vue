<template>
  <div class="docs-menu__section pb-2" :class="{ 'docs-menu__section--show-menu': showMenu }">
    <h4 class="docs-menu__section__heading" @click="showMenu = !showMenu">
      <fa :icon="headingIcon" class="float-right" />
      {{ name }}
    </h4>
    <b-collapse :visible="active" tag="ul" class="list-unstyled mb-0">
      <li v-for="route in routes" :key="route.name" class="docs-menu__section__item d-flex justify-content-between align-items-center mb-2">
        <router-link :to="route.path" class="docs-menu__link">
          <fa :icon="route.icon || icon" class="docs-menu__link__icon mr-1" />
          {{ routeTitle(route) }}
        </router-link>
        <span v-if="routeHasBadge(route)" class="badge badge-secondary docs-menu__badge">
          {{ route.meta.badge }}
        </span>
      </li>
    </b-collapse>
  </div>
</template>

<script>
  import some from 'lodash/some'
  import startCase from 'lodash/startCase'

  import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
  import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp'
  import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'

  import SlideUpDown from '@/components/SlideUpDown.vue'
  import { library, default as Fa } from '@/components/Fa'

  library.add(faAngleDown)
  library.add(faAngleUp)
  library.add(faBook)

  export default {
    name: 'DocsMenuSection',
    components: {
      Fa,
      SlideUpDown
    },
    data () {
      return {
        showMenu: this.hasActiveRoute
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      routes: {
        type: Array,
        default: () => ([])
      },
      icon: {
        type: Object,
        default: () => (faBook)
      }
    },
    watch: {
      $route () {
        this.showMenu = this.hasActiveRoute
      }
    },
    methods: {
      routeTitle(route) {
        return route.meta.title || startCase(route.name)
      },
      routeHasBadge(route) {
        return route.meta && route.meta.badge
      }
    },
    computed: {
      active () {
        return this.showMenu
      },
      hasActiveRoute () {
        return some(this.routes, (r) => r.path === this.$route.path)
      },
      headingIcon () {
        return this.showMenu ? faAngleUp : faAngleDown
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';
  @import '@/styles/variables.scss';

  .docs-menu__section {
    padding: 0 $spacer 0 $spacer;

    &__heading {
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 200;
      color: $docs-menu-muted;
      margin-bottom: $spacer;
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }
</style>
