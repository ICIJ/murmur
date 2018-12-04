---
title: Colors
---

## Theme

<palette-presenter :colors="themeColors"></palette-presenter>

## Grays

<palette-presenter :colors="graysColors"></palette-presenter>

<script>
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!../../../lib/styles/variables.scss'

  export default {
    computed: {
      themeColors () {
        return mainVariables.global["$theme-colors"].value
      },
      graysColors () {
        return mainVariables.global["$grays"].value
      }
    },
    mounted () {
      console.log(this.$route.meta)
    }
  }
</script>
