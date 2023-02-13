<template>
  <div>
    <component :is="rootElement" id="generic-header" data-turbolinks-permanent class="navbar navbar-expand-lg navbar-light generic-header" :offset="100" :z-index="1020" :on-unpin="closeFollowUsPopover" :class="{ 'headroom--frozen': !collapseNavbar, 'generic-header--collapsed': collapseNavbar }" :style="{ position: position }">
      <!-- @slot Redefines brand -->
      <slot name="brand">
        <a :href="homeUrl" class="navbar-brand generic-header__brand">
          <brand-expansion :size="45"  mode="short" class="d-inline-block d-sm-none" />
          <brand-expansion :size="45"  mode="long" class="d-none d-sm-inline-block" />
          <span class="sr-only">International Consortium of Investigative Journalists</span>
        </a>
      </slot>
      <button class="navbar-toggler border-0" type="button" aria-label="Toggle navigation" @click="toggleNavbar">
        <fa icon="bars" size="xl" class="text-primary" />
      </button>
      <div class="navbar-collapse" :class="{ collapse: collapseNavbar }">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="https://www.icij.org/investigations/" target="_blank" class="nav-link text-uppercase">
              {{ $t('generic-header.navbar.investigations') }}
            </a>
          </li>
          <li class="nav-item">
            <a href="https://www.icij.org/leak/" target="_blank" class="nav-link text-uppercase">
              {{ $t('generic-header.navbar.leak') }}
            </a>
          </li>
          <li class="nav-item">
            <a id="follow-us-toggler" class="nav-link text-uppercase">
              {{ $t('generic-header.navbar.follow') }}
            </a>
          </li>
          <li class="nav-item mr-lg-3">
            <slot name="donate-link">
              <a class="text-uppercase btn btn-primary font-weight-bold" target="_blank" :href="donateUrl">
                {{ $t('generic-header.navbar.support') }}
              </a>
            </slot>
          </li>
        </ul>
        <b-popover id="follow-us-popover" ref="followUsPopover" container="generic-header" target="follow-us-toggler" placement="bottomleft" :show.sync="showFollowUsPopover">
          <follow-us-popover :show.sync="showFollowUsPopover"></follow-us-popover>
        </b-popover>
      </div>
    </component>
  </div>
</template>

<script>
  import { BModal } from 'bootstrap-vue/esm/components/modal/modal'
  import { BPopover } from 'bootstrap-vue/esm/components/popover/popover'
  import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

  import i18n from '@lib/i18n'
  import { headroom } from 'vue-headroom'
  import BrandExpansion from './BrandExpansion.vue'
  import Fa from './Fa.js'
  import FollowUsPopover from './FollowUsPopover.vue'
  import config from '../config'

  import { library } from './Fa'

  /**
   * GenericHeader
   */
  export default {
    i18n,
    name: 'GenericHeader',
    beforeMount() {
      library.add(faBars)
    },
    components: {
      BModal,
      BPopover,
      BrandExpansion,
      headroom,
      Fa,
      FollowUsPopover
    },
    props: {
      /**
       * CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default).
       */
      position: {
        type: String,
        default: 'fixed'
      },
      /**
       * Disable Headroom for hiding header until needed.
       */
      noHeadroom: {
        type: Boolean
      },
      /**
       * Target link of the ICIJ logo and project name.
       */
      homeUrl: {
        type: String,
        default: () => config.get('app.home')
      },
      /**
       * Default options to pass to the brand component
       */
      brandOptions: {
        type: Object,
        default: () => ({})
      },
      /**
       * Target link of the donate button.
       */
      donateUrl: {
        type: String,
        default: () => config.get('app.donate-url')
      }
    },
    data () {
      return {
        showFollowUsPopover: false,
        collapseNavbar: true
      }
    },
    methods: {
      closeFollowUsPopover ()  {
        this.showFollowUsPopover = false
      },
      toggleNavbar () {
        this.collapseNavbar = !this.collapseNavbar
        this.$root.$emit('bv::hide::popover')
        this.$root.$emit('bv::hide::dropdwon')
      }
    },
    computed: {
      rootElement () {
        return this.noHeadroom ? 'div' : 'headroom'
      },
      appliedBrandOptions () {
        return Object.assign(this.defaultBrandOptions, this.brandOptions)
      },
      defaultBrandOptions () {
        return  {
          noBorder: true,
          size: 50,
          color: 'white',
          background: '#A10207'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/lib';

  .generic-header {
    background: white;
    position: relative;
    top:0;
    width: 100%;
    z-index: $zindex-sticky;

    .popover {
      width: 100%;
    }

    &.headroom {
      will-change: transform;
      transition: transform 200ms linear;

      &--unpinned {
        transform: translateY(-100%) !important;
      }

      &--pinned {
        transform: translateY(0%);
      }

      &--frozen {
        transform: translateY(0%) !important;
      }
    }

    &__brand {
      position: relative;
      font-weight: bolder;
      padding-right: $spacer;
      font-size: 1rem;
    }

    .navbar-toggler {
      position: absolute;
      right: $spacer;
      top: $spacer;
      margin: 0;
      margin-top: 1px;
    }

    .nav-item {
      margin: 0 $spacer * 0.5;
      font-weight: bold;
      text-transform: uppercase;
      color: black;

      .nav-link {
        color: inherit;
        cursor: pointer;
      }
    }
  }
</style>
