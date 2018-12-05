<template>
  <div v-if="path" class="edit-link mb-4 pt-4">
    <fa :icon="faGithub" />
    Want to help?
    <repository-link :path="path">
      Edit this page on GitHub!
    </repository-link>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'

  export default {
    props: {
      route: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        faGithub
      }
    },
    computed: {
      path () {
        return get(this.route || this.$route, 'meta.resourcePath')
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .edit-link {
    max-width: 770px;
    margin: auto;
    opacity: 0.5;
    border-top: 1px solid $card-border-color;

    &:hover {
      opacity: 1;
    }
  }
</style>
