<template>
  <div>
    <h3>Theme</h3>
    <palette-presenter :colors="mainColors"></palette-presenter>
    <h3>Grays</h3>
    <palette-presenter :colors="graysColors"></palette-presenter>
    <h3>Doc</h3>
    <palette-presenter :colors="docColors"></palette-presenter>
  </div>
</template>

<script>
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!../../../lib/styles/variables.scss'
  import docVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!../../styles/variables.scss'
  import PalettePresenter from '../../components/PalettePresenter.vue'

  export default {
    components: {
      PalettePresenter,
    },
    computed: {
      mainColors () {
        return mainVariables.global["$theme-colors"].value
      },
      graysColors () {
        return mainVariables.global["$grays"].value
      },
      docColors () {
        return docVariables.global["$theme-colors"].value
      }
    }
  }
</script>
