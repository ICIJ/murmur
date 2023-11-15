---
title: Choropleth Annotation
---

You can use them with complex layout, including spherical projections:

:::sample-card
<div class="bg-light p-4">
  <h4>ICIJ Offices</h4>
  <p class="mb-4">A non-exhaustive list of ICIJ offices and opperations.</p>
  <choropleth-map 
    color="#faa" 
    outline-color="#000" 
    graticule-color="#eee" 
    graticule outline hide-legend zoomable spherical 
    :zoom-min="0.9" 
    :projection="geoOrthographic"
  >
    <choropleth-map-annotation :latitude="38.9072" :longitude="-77.0369" placement="top">
      <p class="small mb-2">Washington DC. (Headquarter)</p>
    </choropleth-map-annotation>
    <choropleth-map-annotation v-for="(office, o) in offices" :latitude="office.latitude" :longitude="office.longitude" :key="o">
      <span :title="office.label">●</span>
    </choropleth-map-annotation>
  </choropleth-map>
</div>
:::

And combine annotation with different placements:

:::sample-card
<div class="bg-light p-4">
  <h4>Paris public swimming pools</h4>
  <p class="mb-4">Only 6 are olympic-size swimming pool (50m).</p>
  <choropleth-map
    :data="swimmingPoolsByArrondissement"
    :feature-color-scale="swimmingPoolsColorScale" 
    topojson-url="./assets/topojson/paris-arrondissements.json"
    topojson-objects="arrondissements"
    topojson-objects-path="properties.ar"
  >
    <choropleth-map-annotation v-for="pool in swimmingPools" :latitude="pool.latitude" :longitude="pool.longitude">
      <span :title="pool.name">●</span>
    </choropleth-map-annotation>
    <choropleth-map-annotation v-for="pool in swimmingPools50m" :latitude="pool.latitude" :longitude="pool.longitude" placement="topright">
      <div class="pl-1 small center">
        {{ pool.name.replace('Piscine', '') }}<br />
        <img src="/assets/img/arrow-bottom.svg" height="24px" />
      </div>
    </choropleth-map-annotation>
  </choropleth-map>
</div>
:::

<script>
import { scaleLinear } from 'd3'
import { iteratee } from 'lodash'
import { geoOrthographic } from 'd3-geo'

export default {
  computed: {
    swimmingPools50m() {
      return this.swimmingPools.filter(iteratee('m50'))
    }
  },
  data () {
    return {
      geoOrthographic,
      offices: [
        { latitude: 48.859116, longitude: 2.331839, label: 'Paris, France' },
        { latitude: 25.766368, longitude: -80.210268, label: 'Miami, FL, USA' },
        { latitude: 40.429913, longitude: -3.669245, label: 'Madrid, Spain' },
        { latitude: 35.128683, longitude: -106.579128, label: 'Alburquerque, USA' },
        { latitude: 44.80401, longitude: 20.46513, label: 'Belgrade, Serbia' },
        { latitude: 53.33928, longitude: -6.281314, label: 'Dublin, Ireland' },
        { latitude: -34.035875, longitude: 151.194191, label: 'Sydney, Australia' },
        { latitude: 38.9072, longitude: -77.0369, label: 'Washington DC, USA' }
      ],
      swimmingPoolsColorScale: scaleLinear([0, 7], ["#fff","#00f"]),
      swimmingPoolsByArrondissement: {
        '1':	1,
        '4':	1,
        '5':	1,
        '6':	1,
        '8':	1,
        '9':	2,
        '10':	1,
        '11':	2,
        '12':	2,
        '13':	4,
        '14':	3,
        '15':	7,
        '16':	1,
        '17':	1,
        '18':	2,
        '19':	4,
        '20':	3
      },
      swimmingPools: [
        {
          name: "Piscine Henry de Montherlant",
          address: "30, boulevard Lannes",
          ar: 16,
          latitude: 48.86729079,
          longitude: 2.271528354
        },
        {
          name: "Piscine Jean Taris",
          address: "16 rue Thouin",
          ar: 5,
          latitude: 48.84476225,
          longitude: 2.347867188
        },
        {
          name: "Piscine La Plaine",
          address: "13, rue du Général Guillaumat",
          ar: 15,
          latitude: 48.82768771,
          longitude: 2.293599716
        },
        {
          name: "Piscine Saint-Merri / Marie-Marvingt",
          address: "16 rue du renard",
          ar: 4,
          latitude: 48.85905965,
          longitude: 2.352828178
        },
        {
          name: "Piscine René et André Mourlon",
          address: "19, rue Gaston de Caillavet",
          ar: 15,
          latitude: 48.84873751,
          longitude: 2.284806858
        },
        {
          name: "Piscine Georges Hermant",
          m50: true,
          address: "8-10, rue David d Angers",
          ar: 19,
          latitude: 48.88236232,
          longitude: 2.389479392
        },
        {
          name: "Piscine Champerret",
          address: "36, boulevard de Reims",
          ar: 17,
          latitude: 48.888621,
          longitude: 2.295487774
        },
        {
          name: "Piscine Alfred Nakache",
          address: "4-12 rue Dénoyez",
          ar: 20,
          latitude: 48.87148306,
          longitude: 2.378677041
        },
        {
          name: "Piscine Rouvet",
          address: "1, rue Rouvet",
          ar: 19,
          latitude: 48.89308109,
          longitude: 2.384807396
        },
        {
          name: "Aquaboulevard",
          address: "4-6 Rue Louis Armand",
          ar: 15,
          latitude: 48.8318967,
          longitude: 2.276134007
        },
        {
          name: "Piscine Elisabeth",
          address: "1, place Edith Thomas",
          ar: 14,
          latitude: 48.82159805,
          longitude: 2.325900875
        },
        {
          name: "Piscine Roger Le Gall",
          m50: true,
          address: "34, boulevard Carnot",
          ar: 12,
          latitude: 48.84165419,
          longitude: 2.412576407
        },
        {
          name: "Piscine Georges Rigal",
          address: "115, boulevard de Charonne",
          ar: 11,
          latitude: 48.85659972,
          longitude: 2.39349913
        },
        {
          name: "Piscine Saint-Germain",
          address: "12, rue Lobineau",
          ar: 6,
          latitude: 48.85182487,
          longitude: 2.335852224
        },
        {
          name: "Piscine de la Cour des Lions",
          address: "9, rue Alphonse Baudin",
          ar: 11,
          latitude: 48.86062504,
          longitude: 2.37024622
        },
        {
          name: "Piscine Georges Drigny",
          address: "18, rue Bochart de Saron",
          ar: 9,
          latitude: 48.88203482,
          longitude: 2.342221979
        },
        {
          name: "Piscine de la Butte aux Cailles",
          address: "5, place Paul Verlaine",
          ar: 13,
          latitude: 48.82691355,
          longitude: 2.352891856
        },
        {
          name: "Piscine Yvonne Godard",
          address: "7 rue Serpollet",
          ar: 20,
          latitude: 48.8607863,
          longitude: 2.410606682
        },
        {
          name: "Piscine Hébert",
          address: "2, rue des Fillettes",
          ar: 18,
          latitude: 48.89396858,
          longitude: 2.363212372
        },
        {
          name: "Piscine Suzanne Berlioux",
          m50: true,
          address: "Forum des Halles",
          ar: 1,
          latitude: 48.86179397,
          longitude: 2.347164561
        },
        {
          name: "Piscine Aspirant Dunand",
          address: "20 Rue Saillard",
          ar: 14,
          latitude: 48.83182186,
          longitude: 2.326198443
        },
        {
          name: "Piscine Blomet",
          m50: true,
          address: "17, rue Blomet",
          ar: 15,
          latitude: 48.84330516,
          longitude: 2.307503743
        },
        {
          name: "Piscine Paul Valeyre",
          address: "24, rue Marguerite de Rochechouart",
          ar: 9,
          latitude: 48.87796727,
          longitude: 2.345021514
        },
        {
          name: "Piscine Georges-Vallerey",
          m50: true,
          address: "148, avenue Gambetta",
          ar: 20,
          latitude: 48.87548869,
          longitude: 2.406729763
        },
        {
          name: "Piscine Jacqueline Auriol",
          address: "7 Allée Louis de Funès",
          ar: 8,
          latitude: 48.87630719,
          longitude: 2.305894617
        },
        {
          name: "Piscine Armand Massard",
          address: "66 boulevard du Montparnasse",
          ar: 15,
          latitude: 48.84333328,
          longitude: 2.32336209
        },
        {
          name: "Piscine Catherine Lagatu",
          address: "155 avenue Parmentier",
          ar: 10,
          latitude: 48.87170298,
          longitude: 2.369271523
        },
        {
          name: "Piscine des Amiraux",
          address: "6, rue Hermann Lachapelle",
          ar: 18,
          latitude: 48.89435943,
          longitude: 2.351003515
        },
        {
          name: "Piscine Dunois",
          address: "70, rue Dunois",
          ar: 13,
          latitude: 48.83317033,
          longitude: 2.366278589
        },
        {
          name: "Piscine Emile Anthoine",
          address: "9, rue Jean Rey",
          ar: 15,
          latitude: 48.85569513,
          longitude: 2.290701301
        },
        {
          name: "Piscine Mathis",
          address: "15, rue Mathis",
          ar: 19,
          latitude: 48.8907392,
          longitude: 2.375062338
        },
        {
          name: "Piscine Edouard Pailleron",
          address: "32, rue Edouard Pailleron",
          ar: 19,
          latitude: 48.88051842,
          longitude: 2.377708927
        },
        {
          name: "Piscine Joséphine-Baker",
          address: "quai François Mauriac",
          ar: 13,
          latitude: 48.83606521,
          longitude: 2.376165739
        },
        {
          name: "Piscine Château des Rentiers",
          address: "184, rue du Château des Rentiers",
          ar: 13,
          latitude: 48.83070607,
          longitude: 2.363046188
        },
        {
          name: "Piscine Keller",
          m50: true,
          address: "14 Rue de l'Ingénieur Robert Keller",
          ar: 15,
          latitude: 48.84738721,
          longitude: 2.282124901
        },
        {
          name: "Piscine Jean Boiteux ex Reuilly",
          address: "13, rue Hénard",
          ar: 12,
          latitude: 48.84214721,
          longitude: 2.389397786
        },
        {
          name: "Piscine Didot",
          address: "22, avenue Georges Lafenestre",
          ar: 14,
          latitude: 48.82484218,
          longitude: 2.30975858
        }
      ]
    }
  }
}
</script>