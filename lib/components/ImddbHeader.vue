<template>
  <div>
    <component
      :is="rootElement"
      id="imddb-header"
      data-turbolinks-permanent
      class="navbar navbar-expand-lg navbar-light imddb-header"
      :offset="100"
      :z-index="1020"
      :on-unpin="closeFollowUsPopover"
      :class="{ 'headroom--frozen': !collapseNavbar }"
      :style="{ position: position }"
    >
      <!-- @slot Redefines brand -->
      <slot name="brand">
        <a :href="homeUrl" class="navbar-brand imddb-header__brand">
          <img src="../assets/images/icij@2x.png" height="25" class="mr-3" />
          {{ project }}
        </a>
      </slot>
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="navbar-collapse" :class="{ collapse: collapseNavbar }">
        <div class="imddb-header__site-switch mr-auto">
          <!-- @slot Redefines the main navbar block (containing the dropdown) -->
          <slot name="navbar">
            <ul class="navbar-nav">
              <b-nav-item-dropdown @show="$root.$emit('bv::hide::popover')">
                <template slot="button-content">
                  {{ title }}
                </template>
                <b-dropdown-item
                  v-for="(item, $index) in dropdownItems"
                  :key="$index"
                  :href="item.href"
                  v-bind="{ active: !!item.active }"
                >
                  {{ item.label }}
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </ul>
          </slot>
        </div>
        <ul class="navbar-nav">
          <li v-if="hasLanguagesDropdown" class="nav-item">
            <b-nav-item-dropdown @show="$root.$emit('bv::hide::popover')">
              <template slot="button-content">
                <fa icon="globe" />
                {{ currentLanguage }}
              </template>
              <b-dropdown-item
                v-for="(item, $index) in languages"
                :key="$index"
                :href="item.href"
                v-bind="{ active: !!item.active }"
              >
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
            <slot name="donate-link">
              <a target="_blank" :href="donateUrl" class="nav-link">
                {{ $t('imddb-header.navbar.support') }}
              </a>
            </slot>
          </li>
          <li class="nav-item">
            <button id="follow-icij" class="btn btn-primary btn-block font-weight-bold">
              {{ $t('imddb-header.navbar.follow') }}
            </button>
            <b-popover
              container="imddb-header"
              target="follow-icij"
              placement="bottomleft"
              :show.sync="showFollowUsPopover"
            >
              <follow-us-popover :show.sync="showFollowUsPopover" />
            </b-popover>
          </li>
        </ul>
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { BDropdownItem } from 'bootstrap-vue/esm/components/dropdown/dropdown-item'
import { BModal } from 'bootstrap-vue/esm/components/modal/modal'
import { BNavItemDropdown } from 'bootstrap-vue/esm/components/nav/nav-item-dropdown'
import { BPopover } from 'bootstrap-vue/esm/components/popover/popover'
import { headroom } from 'vue-headroom'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import find from 'lodash/find'
import get from 'lodash/get'
import { defineComponent } from 'vue'
import { PropType } from 'vue/types/v3-component-props'

import { library, default as Fa } from './Fa'
import FollowUsPopover from './FollowUsPopover.vue'
import config from '../config'

import i18n from '@/i18n'

type CssPosition = 'absolute' | 'relative' | 'fixed' | 'static'
type ImddHeaderItem = { label: string; href: string; active: boolean }
interface ImddHeaderData {
  showFollowUsPopover: boolean
  collapseNavbar: boolean
  languages: ImddHeaderItem[]
}
/**
 * ImddbHeader
 */
export default defineComponent({
  i18n,
  name: 'ImddbHeader',
  components: {
    BDropdownItem,
    BModal,
    BNavItemDropdown,
    BPopover,
    headroom,
    FollowUsPopover,
    Fa
  },
  props: {
    /**
     * CSS position of the header. Can be <em>absolute</em>, <em>relative</em>, <em>static</em> or <em>fixed</em> (default).
     */
    position: {
      type: String as PropType<CssPosition>,
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
      type: Array as PropType<ImddHeaderItem[]>,
      default: () => config.get('imddb-header.dropdown.items')
    },
    /**
     * Target link of the ICIJ logo and project name.
     */
    homeUrl: {
      type: String,
      default: () => config.get('app.home')
    },
    /**
     * Target link of the donate button.
     */
    donateUrl: {
      type: String,
      default: () => config.get('app.donate-url')
    }
  },
  data(): ImddHeaderData {
    return {
      showFollowUsPopover: false,
      collapseNavbar: true,
      languages: []
    }
  },
  computed: {
    rootElement(): string {
      return this.noHeadroom ? 'div' : 'headroom'
    },
    hasLanguagesDropdown(): boolean {
      return !!this.languages.length
    },
    currentLanguage(): string {
      return get(find(this.languages, { active: true }), 'label', 'Language')
    }
  },
  beforeMount(): void {
    library.add(faGlobe)
  },
  mounted(): void {
    this.setLanguages(config.get('imddb-header.languages.items'))
  },
  methods: {
    closeFollowUsPopover(): void {
      this.showFollowUsPopover = false
    },
    toggleNavbar(): void {
      this.collapseNavbar = !this.collapseNavbar
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::hide::dropdwon')
    },
    setLanguages(languages: ImddHeaderItem[] = []): void {
      this.$set(this, 'languages', languages)
    }
  }
})
</script>

<style lang="scss">
@import '../styles/lib';

.imddb-header {
  background: rgba($gray-400, 0.8);
  box-shadow: 0 0 6px 0 rgba(#000, 0.1);
  position: relative;
  top: 0;
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
      content: '';
      background: $body-color;
      width: 2px;
      height: 32px;
      position: absolute;
      right: 0;
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
    top: $spacer * 0.5;
    margin: 0;
  }

  &__site-switch {
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
