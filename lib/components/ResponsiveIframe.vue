<template>
  <div :id="iframeId" />
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { injectAssets } from '@/utils/assets'

  var iframeUniqueIdCounter = 0;
  type StartsWithIcijIframe = `icij-iframe-${string}`;
  type ResponsiveIframeData = { [iframeId:string] : StartsWithIcijIframe}

  /**
   * ResponsiveIframe
   */
  export default defineComponent({
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
    data (): ResponsiveIframeData {
      return {
        iframeId: `icij-iframe-${++iframeUniqueIdCounter}`
      }
    },
    async mounted (): Promise<void> {
      await injectAssets('https://pym.nprapps.org/pym.v1.min.js');
      new window.pym.Parent(this.iframeId, this.url, this.options);
    }
  })
</script>
