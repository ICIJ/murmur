<template>
  <div>
    <h3>Theme</h3>
    <p>
      The default theme is  extending Boostrap with custom colors. The primary color
      comes from ICIJ graphical charter. Every color utility classes provided by
      Boostrap (<code>bg-primary</code>, <code>text-primary</code>, ...) work as expected.
    </p>
    <p>
      Additional namespaces are available to specificaly use the ICIJ colors within
      a custom theme: <code>selective-yellow</code> and <code>saddle-red</code>.
      Color utility classes are created as well for this colors.
    </p>
    <palette-presenter :colors="themeColors"></palette-presenter>
  </div>
</template>

<script>
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!../../../lib/styles/variables.scss'

  export default {
    computed: {
      themeColors () {
        return mainVariables.global["$theme-colors"].value
      },
    }
  }
</script>
