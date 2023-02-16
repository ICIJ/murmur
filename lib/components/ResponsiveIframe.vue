<template>
  <div :id="iframeId" />
</template>

<script>
  import { injectAssets } from '../utils/assets'

  var iframeUniqueIdCounter = 0;

  /**
   * ResponsiveIframe
   */
  export default {
    name: 'ResponsiveIframe',
    props: {
      /**
       * URL of the generated iframe code.
       */
      url: {
        type: String,
        required : true
      },
      /**
       * Option to pass to the constructor of the pymParent instance
       */
      options: {
        type: Object,
        default: () => ({ })
      },
    },
    data () {
      return {
        iframeId: `icij-iframe-${++iframeUniqueIdCounter}`
      }
    },
    mounted () {
      injectAssets('https://pym.nprapps.org/pym.v1.min.js').then(() => {
        new window.pym.Parent(this.iframeId, this.url, this.options)
      })
    }
  }
</script>
