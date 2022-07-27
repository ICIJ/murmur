## Headings

All HTML headings, `<h1>` through `<h6>`, are available with the <strong>{{ headingsFontFamily }}</strong> font.

Heading | Example
--- | ---
`<h1></h1>` | <h1>h1. Bootstrap heading</h1>
`<h2></h2>` | <h2>h2. Bootstrap heading</h2>
`<h3></h3>` | <h3>h3. Bootstrap heading</h3>
`<h4></h4>` | <h4>h4. Bootstrap heading</h4>
`<h5></h5>` | <h5>h5. Bootstrap heading</h5>
`<h6></h6>` | <h6>h6. Bootstrap heading</h6>

## Jumbotron

A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site. Jumbotron main header uses the <strong>{{ jumbotronFontFamily }}</strong> font.

Bellow an example combined with a  `textured-deck`:

:::sample-card
<div>
  <textured-deck black value="brick">
    <b-jumbotron header="ICIJ" lead="For more information visit ICIJ website" bg-variant="transparent" class="m-0">
      <b-button variant="primary" href="https://icij.org">More Info</b-button>
    </b-jumbotron>
  </textured-deck>
</div>
:::

## Font utilities

Alternativly you can specify which font use with a class:


Class | Example | Font
--- | --- | ---
`text-jumbotron` | <div class="text-jumbotron">div. Text with font jumbotron</div> | {{ jumbotronFontFamily }}
`text-serif` | <div class="text-serif">div. Text with font serif</div> | {{ serifFontFamily }}
`text-sans-serif` | <div class="text-sans-serif">div. Text with font sans-serif</div> | {{ sansSerifFontFamily }}
`text-monospace` | <div class="text-monospace">div. Text with font monospace</div> | {{ monospaceFontFamily }}

<script>
  import { get, trim } from 'lodash'
  import mainVariables from '!!sass-extract-loader?{"includePaths": ["./"]}!@styles/variables.scss'

  export default {
    computed: {
      headingsFontFamily () {
        return this.getFontValue("$headings-font-family")
      },
      jumbotronFontFamily () {
        return this.getFontValue("$jumbotron-font-family")
      },
      serifFontFamily () {
        return this.getFontValue("$font-family-serif")
      },
      sansSerifFontFamily () {
        return this.getFontValue("$font-family-sans-serif")
      },
      monospaceFontFamily () {
        return this.getFontValue("$font-family-monospace")
      }
    },
    methods: {
      getFontValue (name) {
        const [ font ] = get(mainVariables, name, [null])
        return trim(font, '\'"')
      }
    }
  }
</script>
