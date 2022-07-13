## Headings

All HTML headings, `<h1>` through `<h6>`, are available with the same font.

Heading | Example
--- | ---
`<h1></h1>` | <h1>h1. Bootstrap heading</h1>
`<h2></h2>` | <h2>h2. Bootstrap heading</h2>
`<h3></h3>` | <h3>h3. Bootstrap heading</h3>
`<h4></h4>` | <h4>h4. Bootstrap heading</h4>
`<h5></h5>` | <h5>h5. Bootstrap heading</h5>
`<h6></h6>` | <h6>h6. Bootstrap heading</h6>

## Font utilities

Alternativly you can specify which font use with a class:


Class | Example | Font
--- | --- | ---
`text-jumbotron` | <div class="text-jumbotron">div. Text with font jumbotron</div> | {{ jumbotronFontFamily }}
`text-serif` | <div class="text-serif">div. Text with font serif</div> | {{ serifFontFamily }}
`text-sans-serif` | <div class="text-sans-serif">div. Text with font sans-serif</div> | {{ sansSerifFontFamily }}
`text-monospace` | <div class="text-monospace">div. Text with font monospace</div> | {{ monospaceFontFamily }}

<script>
  import { trim } from 'lodash'
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!@styles/variables.scss'

  export default {
    computed: {
      jumbotronFontFamily () {
        const [ font ] = mainVariables.global["$jumbotron-font-family"].value
        return trim(font.value, '\'"')
      },
      serifFontFamily () {
        const [ font ] = mainVariables.global["$font-family-serif"].value
        return trim(font.value, '\'"')
      },
      sansSerifFontFamily () {
        const [ font ] = mainVariables.global["$font-family-sans-serif"].value
        return trim(font.value, '\'"')
      },
      monospaceFontFamily () {
        const [ font ] = mainVariables.global["$font-family-monospace"].value
        return trim(font.value, '\'"')
      },
    }
  }
</script>
