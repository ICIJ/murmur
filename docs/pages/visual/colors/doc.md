### Theme
    
The default theme is  extending Boostrap with custom colors. The primary color
comes from ICIJ graphical charter. Every color utility classes provided by
Boostrap (`bg-primary`, `text-primary`, ...) work as expected.

<palette-presenter :colors="themeColors" />

### Grays

The colour tones to be used are outlined below and are on a gray scale that
incorporates the new brand colour ways. Amount of gray was reduced
tones used in illustration to create higher contrast in images. Only the grays
outlined below should be used in any illustrations.

<palette-presenter :colors="grays" />

<script>
  import sassVars from '@styles/variables.scss?sass-vars'

  export default {
    computed: {
      themeColors () {
        return sassVars["$theme-colors"]
      },
      grays () {
        return sassVars["$brand-grays"]
      },
    }
  }
</script>
