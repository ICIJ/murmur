<template>
  <div>
    <component :is="rootElement" id="main-header" data-turbolinks-permanent class="navbar navbar-expand-lg navbar-light main-header" :offset="100" :z-index="1020" :on-unpin="closeFollowUsPopover" :class="{ 'headroom--frozen': !collapseNavbar }" :style="{ position: position }">
      <slot name="brand">
        <a href="/" class="navbar-brand main-header__brand">
          <img src="~assets/images/icij-black@2x.png" height="25" class="mr-3" />
          {{ project }}
        </a>
      </slot>
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" :class="{ collapse: collapseNavbar }">
        <slot name="navbar">
          <ul class="navbar-nav mr-auto">
            <b-nav-dropdown>
              <template slot="button-content">
                {{ title }}
              </template>
              <b-dropdown-item href="#">
                Graphics
              </b-dropdown-item>
              <b-dropdown-item href="#">
                Overview
              </b-dropdown-item>
              <b-dropdown-item href="#">
                Visual overview
              </b-dropdown-item>
              <b-dropdown-item href="#">
                Backgrounder
              </b-dropdown-item>
              <b-dropdown-item href="#">
                About this project
              </b-dropdown-item>
            </b-nav-dropdown>
          </ul>
        </slot>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="https://www.icij.org/leak/" target="_blank" class="nav-link">
              Leak to us
            </a>
          </li>
          <li class="nav-item mr-lg-3">
            <a @click.prevent="$refs.donateFormModal.show()" href="#" class="nav-link">
              Support us
            </a>
          </li>
          <li class="nav-item">
            <button class="btn btn-icij-secondary btn-block font-weight-bold" id="follow-icij">
              Follow ICIJ
            </button>
            <b-popover container="main-header" target="follow-icij" placement="bottomleft" :show.sync="showSignupPopover">
              <follow-us-popover :show.sync="showSignupPopover"></follow-us-popover>
            </b-popover>
          </li>
        </ul>
      </div>
    </component>
    <b-modal hide-footer lazy ref="donateFormModal" size="lg">
      <span slot="modal-title" class="text-uppercase font-weight-bold text-primary">
        Support ICIJ
      </span>
      <donate-form no-title></donate-form>
    </b-modal>
  </div>
</template>

<script>
  import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import bNavDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown'
  import bPopover from 'bootstrap-vue/es/components/popover/popover'

  import { headroom } from 'vue-headroom'
  import DonateForm from './DonateForm.vue'
  import FollowUsPopover from './FollowUsPopover.vue'

  export default {
    name: 'MainHeader',
    components: {
      bDropdownItem,
      bModal,
      bNavDropdown,
      bPopover,
      headroom,
      DonateForm,
      FollowUsPopover
    },
    props: {
      position: {
        type: String,
        default: 'fixed'
      },
      noHeadroom: {
        type: Boolean
      },
      project: {
        type: String,
        default: 'Project'
      },
      title: {
        type: String,
        default: 'Awesome App'
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

  .main-header {
    background: rgba($mercury, 0.8);
    box-shadow: 0 0 6px 0 rgba(#000, .1);
    position: relative;
    top:0;
    width: 100%;
    z-index: $zindex-sticky;

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
      padding-right: $spacer * 1.5;

      &:after {
        content: "";
        background: $body-color;
        width: 2px;
        height: 32px;
        position: absolute;
        right:0;
        top: 50%;
        transform: translateY(-50%);

        @include media-breakpoint-down(md) {
          display: none;
        }
      }
    }

    .navbar-toggler {
      background: $mercury;
      position: absolute;
      right: $spacer;
      top: $spacer / 2;
      margin: 0;
    }

    .dropdown .nav-link {


      @include media-breakpoint-up(lg) {
        font-size: 1.2rem;
        font-family: $headings-font-family;
      }
    }
  }
</style>
