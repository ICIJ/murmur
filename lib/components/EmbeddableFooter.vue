<template>
  <div class="embeddable-footer p-2 text-nowrap">
    <a :href="homeUrl" target="_blank" class="text-white embeddable-footer__brand">
      <brand :size="40" no-border class="mr-2" color="white" />
      {{ title }}
    </a>
    <div class="embeddable-footer__lead small text-truncate">
      <!-- @slot Main slot to redefine lead text display -->
      <slot v-bind:lead="lead">
        <span v-html="lead"></span>
      </slot>
    </div>
    <!-- @slot Overide the sharing button -->
    <slot name="sharing-button" v-bind="{ sharingOptionsValues }">
      <button class="btn btn-link text-white btn-sm py-0 embeddable-footer__share-btn" @click="showShareOptions = !showShareOptions" :class="{ active: showShareOptions }">
        <fa icon="share-alt" />
        <span class="sr-only">{{ $t('embeddable-footer.share') }}</span>
      </button>
    </slot>
    <sharing-options :values="sharingOptionsValues" v-if="showShareOptions" direction="column-reverse" :iframe-min-height="iframeMinHeight" :iframe-min-width="iframeMinWidth"></sharing-options>
  </div>
</template>

<script>
  import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt'

  import i18n from '@/i18n'
  import IframeResizer from '@/utils/iframe-resizer'
  import Brand from './Brand'
  import SharingOptions from './SharingOptions'
  import config from '@/config'

  import { library } from './Fa'

  /**
   * EmbeddableFooter
   */
  export default {
    i18n,
    name: 'EmbeddableFooter',
    beforeMount() {
      library.add(faShareAlt)
    },
    components: {
      /** Prevent a bug with vue-docgen-api
       * @see https://github.com/vue-styleguidist/vue-docgen-api/issues/23
       */
      Fa: require('./Fa').default,
      SharingOptions,
      Brand
    },
    props: {
      /**
       * Title to display next to ICIJ logo.
       */
      title: {
        type: String,
        default: () => config.get('project.name')
      },
      /**
       * Lead sentence to display next to the title.
       */
      lead: {
        type: String,
        default: ''
      },
      /**
       * Minimum height for the iframe generated in the embed form.
       */
      iframeMinHeight: {
        type: Number
      },
      /**
       * Minimum width for the iframe generated in the embed form.
       */
      iframeMinWidth: {
        type: Number
      },
      /**
       * Target of the ICIJ logo and title links.
       */
      homeUrl: {
        type: String,
        default: () => config.get('app.home')
      },
      /**
       * Sharing option values to bind to the sharing-options component on the bottom-right corner.
       */
      sharingOptionsValues: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        showShareOptions: false
      }
    },
    mounted () {
      IframeResizer.create();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/lib';
  @import '../styles/mixins';

  @include keyframes(slideup) {
    0% {
      transform: translateY(100%);
      opacity:0;
    }

    100% {
      transform: translateY(0%);
      opacity:1;
    }
  }

  .embeddable-footer {
    display: flex;
    flex-direction: row;
    align-items: center;

    z-index: $zindex-sticky;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: black;
    color: white;
    // Magic technique to have a minimum font-size (10px-ish)
    font-size: calc(10px + 1.5vh);

    @media screen and (min-height: 800px) {
      font-size: 1rem;
    }

    &__brand {
      padding-right: $spacer;
      margin-right: $spacer;
      border-right: 2px solid white;
      font-family: $jumbotron-font-family;
      font-size: 1.1em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__lead {
      flex-grow: 1;
      min-width: 0;
      font-size: 0.9em;
    }

    &__share-btn {
      border:1px solid transparent;
      height: 2.5em;
      line-height: 2.5em;
      width: 2.5em;
      font-size: 80%;
      text-align: center;
      border-radius: 50%;

      &.active {
        border-color: white;
      }

      &:hover {
        background: rgba(white, .1);
      }
    }

    .sharing-options {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin: $spacer * 0.25;

      .sharing-options__link {
        opacity: 0;
        animation:slideup 200ms forwards;
        @include animation-delay-loop(0, 10, 50ms);
      }
    }
  }
</style>
