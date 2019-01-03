<template>
  <div>
    <component :is="rootElement" id="generic-header" data-turbolinks-permanent class="navbar navbar-expand-lg navbar-light generic-header" :offset="100" :z-index="1020" :on-unpin="closeFollowUsPopover" :class="{ 'headroom--frozen': !collapseNavbar }" :style="{ position: position }">
      <!-- @slot Redefines brand -->
      <slot name="brand">
        <a :href="homeUrl" class="navbar-brand generic-header__brand">
          <img src="../assets/images/icij@2x.png" height="50" class="mr-3" />
          International Consortium of Investigative Journalists
        </a>
      </slot>
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" :class="{ collapse: collapseNavbar }">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="https://www.icij.org/leak/" target="_blank" class="nav-link text-uppercase">
              {{ $t('imddb-header.navbar.leak') }}
            </a>
          </li>
          <li class="nav-item">
            <a id="follow-icij" class="nav-link text-uppercase">
              {{ $t('imddb-header.navbar.follow') }}
            </a>
          </li>
          <li class="nav-item mr-lg-3">
            <a @click.prevent="$refs.donateFormModal.show()" href="#" class="text-uppercase btn btn-saddle-red font-weight-bold">
              {{ $t('imddb-header.navbar.support') }}
            </a>
          </li>
        </ul>
        <b-popover container="generic-header" target="follow-icij" placement="bottomleft" :show.sync="showSignupPopover">
          <follow-us-popover :show.sync="showSignupPopover"></follow-us-popover>
        </b-popover>
      </div>
    </component>
    <b-modal hide-footer lazy ref="donateFormModal" size="lg">
      <span slot="modal-title" class="text-uppercase font-weight-bold text-primary">
        {{ $t('imddb-header.navbar.support') }}
      </span>
      <donate-form no-title></donate-form>
    </b-modal>
  </div>
</template>

<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import bPopover from 'bootstrap-vue/es/components/popover/popover'

  import i18n from '@/i18n'
  import { headroom } from 'vue-headroom'
  import DonateForm from './DonateForm.vue'
  import FollowUsPopover from './FollowUsPopover.vue'
  import config from '../config'

  /**
   * ImddbHeader
   */
  export default {
    i18n,
    name: 'ImddbHeader',
    components: {
      bModal,
      bPopover,
      headroom,
      DonateForm,
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
      }
    },
    data () {
      return {
        showSignupPopover: false,
        collapseNavbar: true
      }
    },
    methods: {
      closeFollowUsPopover ()  {
        this.showSignupPopover = false
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

    @include media-breakpoint-down(md) {
      background: $mercury;
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
      background: $mercury;
      position: absolute;
      right: $spacer;
      top: $spacer / 2;
      margin: 0;
    }

    .nav-item {
      margin: 0 $spacer * 0.5;
      font-weight: bold;
      text-transform: uppercase;
      color: black;

      .nav-link {
        color: inherit;
      }
    }
  }
</style>
