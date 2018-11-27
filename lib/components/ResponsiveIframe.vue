<template>
  <div :id="iframeId"></div>
</template>

<script>
  import { injectAssets } from '../utils/assets'

  var iframeUniqueIdCounter = 0;

  export default {
    name: 'ResponsiveIframe',
    props: {
      url: {
        type: String,
        required : true
      },
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
        new pym.Parent(this.iframeId, this.url, this.options)
      })
    }
  }
</script>
