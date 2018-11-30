<template>
  <div class="embedable-footer p-2 text-nowrap">
    <a :href="homeUrl" target="_blank" class="text-white embedable-footer__brand">
      <img src="../assets/images/icij-white@2x.png" height="20" class="mr-2" />
      {{ title }}
    </a>
    <div class="embedable-footer__lead small text-truncate" v-html="lead"></div>
    <button class="btn btn-link text-white btn-sm py-0 embedable-footer__share-btn" @click="showShareOptions = !showShareOptions" :class="{ active: showShareOptions }">
      <fa icon="share-alt" />
      <span class="sr-only">Share</span>
    </button>
    <sharing-options :values="sharingOptionsValues" v-if="showShareOptions" direction="column-reverse" :iframe-min-height="iframeMinHeight" :iframe-min-width="iframeMinWidth"></sharing-options>
  </div>
</template>

<script>
  import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt'

  import IframeResizer from '../utils/iframe-resizer'
  import SharingOptions from './SharingOptions'
  import config from '../config'

  import { library, default as Fa } from '@/components/Fa'
  library.add(faShareAlt)

  export default {
    name: 'EmbedableFooter',
    components: {
      Fa,
      SharingOptions
    },
    props: {
      title: {
        type: String,
        default: () => config.get('project.name')
      },
      lead: {
        type: String,
        default: ''
      },
      iframeMinHeight: {
        type: Number
      },
      iframeMinWidth: {
        type: Number
      },
      homeUrl: {
        type: String,
        default: () => config.get('app.home')
      },
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

  .embedable-footer {
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
      font-family: $headings-font-family;
      font-size: 1.1em;
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

    & /deep/ .sharing-options {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin: $spacer * 0.25;

      &__link {
        opacity: 0;
        animation:slideup 200ms forwards;
        @include animation-delay-loop(0, 10, 50ms);
      }
    }

  }
</style>
