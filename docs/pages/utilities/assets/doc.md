Some components like `textured-deck` need to load images. Those images are not bundled with Murmur anymore and are available throught a public URL. Therefore, you might need to customize how those image are loaded.

## TexturedDeck

The `TexturedDeck` components allow you to quickly create a textured block following ICIJ branding with zero configuration:

<div class="row">
  <div class=" col-6">
    <textured-deck class="p-4 mb-3" value="carbon">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </textured-deck>
  </div>
  <div class=" col-6">
    <textured-deck class="p-4 mb-3" black value="carbon">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </textured-deck>
  </div>
  <div class=" col-6">
    <textured-deck class="p-4 mb-3" value="sand">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </textured-deck>
  </div>
  <div class=" col-6">
    <textured-deck class="p-4 mb-3" black value="sand">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </textured-deck>
  </div>
  <div class=" col-6">
    <textured-deck class="p-4 mb-3" value="rock">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </textured-deck>
  </div>
  <div class=" col-6">
    <textured-deck class="p-4 mb-3" black value="rock">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </textured-deck>
  </div>
</div>

Those background are currently loaded from a remote location:

<p><b-input type="text" :value="texturedDeckBackgroundBaseUrl" readonly /></p>

So everytime you pick a textured deck, the background is created using this host, such as:

<p><b-input type="text" :value="texturedDeckBackgroundRockUrl" readonly /></p>

This base location is configured using Murmur config object, in the property 
called `textured-deck.background-base-url`. If for any reason you need to avoid
loading the image from a remote location, you can always change the base URL (please 
ensure your base URL has not tailing slash):

```js
Murmur.config.set('textured-deck.background-base-url', 'https://projects.icij.org')
// Or from inside a Vue component:
this.$config.set('textured-deck.background-base-url', 'https://projects.icij.org')
```

## ChoroplethMap and SymbolMap

Both `ChoroplethMap` and `SymbolMap` use a remote topojson file to draw the background 
of the map. This topojson contains the features for every countries except Antarctica.

<symbol-map class="bg-light p-5 mb-3" hide-legend feature-color="#333" />

This topojson is currently loaded from a remote location:

<p><b-input type="text" :value="mapTopojsonWorldCountriesSansAntarctica" readonly /></p>

The default topojson is configured globally using Murmur config object, in the property 
called `map.topojson.world-countries-sans-antarctica`. If for any reason you need to 
use a different topojson by default **on every maps** you can change the configuration:

```js
Murmur.config.set('map.topojson.world-countries-sans-antarctica', 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json')
// Or from inside a Vue component:
this.$config.set('map.topojson.world-countries-sans-antarctica', 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json')
```

Alternativly, if you want to change the topojson on a specify maps, both  `ChoroplethMap` and 
`SymbolMap` can receive a `topojsonUrl` property. 

::: sample-card
<div class="row">
  <div class="col-6 text-center mb-3">
    <symbol-map class="p-3"
      feature-color="#333"
      hide-legend
      topojson-url="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/italy/italy-provinces.json"
      topojson-objects="ITA_adm2"
      topojson-objects-path="properties.ID_2" />
    Italy
  </div>
  <div class="col-6 text-center mb-3">
    <symbol-map class="p-3"
      feature-color="#333"
      hide-legend
      topojson-url="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/japan/jp-prefectures.json"
      topojson-objects="JPN_adm1"
      topojson-objects-path="properties.ID_1" />
    Japan
  </div>
  <div class="col-6 text-center mb-3">
    <symbol-map class="p-3"
      feature-color="#333"
      hide-legend
      topojson-url="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-counties.json"
      topojson-objects="GBR_adm2"
      topojson-objects-path="properties.ID_2" />
    United Kingdom
  </div>
  <div class="col-6 text-center mb-3">
    <symbol-map class="p-3"
      feature-color="#333"
      hide-legend
      topojson-url="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/venezuela/venezuela-estados.json"
      topojson-objects="VEN_adm1"
      topojson-objects-path="properties.ID_1" />
    Venezuela
  </div>
</div>
:::


<script>
  import config from '@/config.default'

  export default {
    data () {
      return {
        texturedDeckBackgroundBaseUrl: config['textured-deck.background-base-url'],
        texturedDeckBackgroundRockUrl: `${config['textured-deck.background-base-url']}/assets/img/texture-rock.jpg`,
        mapTopojsonWorldCountriesSansAntarctica: config['map.topojson.world-countries-sans-antarctica']
      }
    }
  }
</script>

