<template>
  <div>
    <component :is="rootElement" id="imddb-header" data-turbolinks-permanent class="navbar navbar-expand-lg navbar-light imddb-header" :offset="100" :z-index="1020" :on-unpin="closeFollowUsPopover" :class="{ 'headroom--frozen': !collapseNavbar }" :style="{ position: position }">
      <!-- @slot Redefines brand -->
      <slot name="brand">
        <a :href="homeUrl" class="navbar-brand imddb-header__brand">
          <img src="../assets/images/icij-black@2x.png" height="25" class="mr-3" />
          {{ project }}
        </a>
      </slot>
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" :class="{ collapse: collapseNavbar }">
        <div class="imddb-header__site-switch mr-auto">
          <!-- @slot Redefines the main navbar block (containing the dropdown) -->
          <slot name="navbar">
            <ul class="navbar-nav">
              <b-nav-item-dropdown @show="$root.$emit('bv::hide::popover')">
                <template slot="button-content">
                  {{ title }}
                </template>
                <b-dropdown-item v-for="(item, $index) in dropdownItems"  :key="$index" :href="item.href" v-bind="{ active: !!item.active }">
                  {{ item.label }}
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </ul>
          </slot>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="hasLanguagesDropdown">
            <b-nav-item-dropdown @show="$root.$emit('bv::hide::popover')">
              <template slot="button-content">
                <fa icon="globe" />
                {{ currentLanguage }}
              </template>
              <b-dropdown-item v-for="(item, $index) in languages"  :key="$index" :href="item.href" v-bind="{ active: !!item.active }">
                {{ item.label }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </li>
          <li class="nav-item">
            <a href="https://www.icij.org/leak/" target="_blank" class="nav-link">
              {{ $t('imddb-header.navbar.leak') }}
            </a>
          </li>
          <li class="nav-item mr-lg-3">
            <a @click.prevent="$refs.donateFormModal.show()" href="#" class="nav-link">
              {{ $t('imddb-header.navbar.support') }}
            </a>
          </li>
          <li class="nav-item">
            <button class="btn btn-primary btn-block font-weight-bold" id="follow-icij">
              {{ $t('imddb-header.navbar.follow') }}
            </button>
            <b-popover container="imddb-header" target="follow-icij" placement="bottomleft" :show.sync="showFollowUsPopover">
              <follow-us-popover :show.sync="showFollowUsPopover"></follow-us-popover>
            </b-popover>
          </li>
        </ul>
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
  import { BDropdownItem } from 'bootstrap-vue/esm/components/dropdown/dropdown-item'
  import { BModal } from 'bootstrap-vue/esm/components/modal/modal'
  import { BNavItemDropdown } from 'bootstrap-vue/esm/components/nav/nav-item-dropdown'
  import { BPopover } from 'bootstrap-vue/esm/components/popover/popover'
  import { headroom } from 'vue-headroom'

  import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'

  import find from 'lodash/find'
  import get from 'lodash/get'

  import i18n from '@/i18n'
  import DonateForm from './DonateForm.vue'
  import { library } from './Fa'
  import FollowUsPopover from './FollowUsPopover.vue'
  import config from '../config'

  /**
   * ImddbHeader
   */
  export default {
    i18n,
    name: 'ImddbHeader',
    components: {
      BDropdownItem,
      BModal,
      BNavItemDropdown,
      BPopover,
      headroom,
      DonateForm,
      FollowUsPopover,
      /** Prevent a bug with vue-docgen-api
       * @see https://github.com/vue-styleguidist/vue-docgen-api/issues/23
       */
      Fa: require('./Fa').default
    },
    beforeMount () {
      library.add(faGlobe)
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
       * Project name, to display next to ICIJ logo
       */
      project: {
        type: String,
        default: () => config.get('project.name')
      },
      /**
       * App name, to display next to project name
       */
      title: {
        type: String,
        default: () => config.get('app.name')
      },
      /**
       * An array of objects defining dropdown items. Each item defines a <em>label</em> and a <em>href</em>.
       */
      dropdownItems: {
        type: Array,
        default: () => config.get('imddb-header.dropdown.items')
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
        showFollowUsPopover: false,
        collapseNavbar: true,
        languages: []
      }
    },
    mounted () {
      this.setLanguages(config.get('imddb-header.languages.items'))
    },
    methods: {
      closeFollowUsPopover ()  {
        this.showFollowUsPopover = false
      },
      toggleNavbar () {
        this.collapseNavbar = !this.collapseNavbar
        this.$root.$emit('bv::hide::popover')
        this.$root.$emit('bv::hide::dropdwon')
      },
      setLanguages (languages = []) {
        this.$set(this, 'languages', languages)
      }
    },
    computed: {
      rootElement () {
        return this.noHeadroom ? 'div' : 'headroom'
      },
      hasLanguagesDropdown () {
        return !!this.languages.length
      },
      currentLanguage () {
        return get(find(this.languages, { active: true }), 'label', 'Language')
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/lib';

  .imddb-header {
    background: rgba($gray-400, 0.8);
    box-shadow: 0 0 6px 0 rgba(#000, .1);
    position: relative;
    top:0;
    width: 100%;
    z-index: $zindex-sticky;

    .popover {
      width: 100%;
    }

    @include media-breakpoint-down(md) {
      background: $gray-400;
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
      background: $gray-400;
      position: absolute;
      right: $spacer;
      top: $spacer / 2;
      margin: 0;
    }

    &__site-switch  {

      .dropdown-item {
        white-space: normal;
        width: 440px;
        max-width: 90vw;

        @include media-breakpoint-down(sm) {
          width: 100%;
        }
      }

      .dropdown .nav-link {

        @include media-breakpoint-up(lg) {
          font-size: 1.2rem;
          font-family: $headings-font-family;
        }
      }
    }
  }
</style>
