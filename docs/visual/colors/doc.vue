<template>
  <div>
    <h3>Theme</h3>
    <palette-presenter :colors="themeColors"></palette-presenter>
    <h3>Grays</h3>
    <palette-presenter :colors="graysColors"></palette-presenter>
  </div>
</template>

<script>
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!../../../lib/styles/variables.scss'

  export default {
    computed: {
      themeColors () {
        return mainVariables.global["$theme-colors"].value
      },
      graysColors () {
        return mainVariables.global["$grays"].value
      },
    }
  }
</script>
