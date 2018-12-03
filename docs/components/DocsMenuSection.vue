<template>
  <div class="docs-menu__section pb-2" :class="{ 'docs-menu__section--show-menu': showMenu }">
    <h4 class="docs-menu__section__heading" @click="showMenu = !showMenu">
      <fa :icon="headingIcon" class="float-right" />
      {{ name }}
    </h4>
    <slide-up-down :active="active" tag="ul" class="list-unstyled mb-0">
      <li v-for="route in routes" :key="route.name" class="docs-menu__section__item">
        <router-link :to="route.path" class="docs-menu__link">
          <fa :icon="route.icon || icon" class="docs-menu__link__icon mr-1" />
          {{ label(route.name) }}
        </router-link>
      </li>
    </slide-up-down>
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
    methods: {
      label (name) {
        return startCase(name)
      }
    },
    watch: {
      $route () {
        this.showMenu = this.hasActiveRoute
      }
    },
    computed: {
      active () {
        return this.showMenu
      },
      hasActiveRoute () {
        return some(this.routes, (r) => r.name === this.$route.name)
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
