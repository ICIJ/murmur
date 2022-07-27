<template>
  <div>
    <h3>Theme</h3>
    <p>
      The default theme is  extending Boostrap with custom colors. The primary color
      comes from ICIJ graphical charter. Every color utility classes provided by
      Boostrap (<code>bg-primary</code>, <code>text-primary</code>, ...) work as expected.
    </p>
    <palette-presenter :colors="themeColors"></palette-presenter>
    <h3>Grays</h3>
    <p>
      The colour tones to be used are outlined below and are on a gray scale that
      incorporates the new brand colour ways. Amount of gray was reduced
      tones used in illustration to create higher contrast in images. Only the grays
      outlined below should be used in any illustrations.
    </p>
    <palette-presenter :colors="grays"></palette-presenter>
  </div>
</template>

<script>
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!@styles/variables.scss'

  export default {
    computed: {
      themeColors () {
        return mainVariables["$theme-colors"]
      },
      grays () {
        return mainVariables["$brand-grays"]
      },
    }
  }
</script>
