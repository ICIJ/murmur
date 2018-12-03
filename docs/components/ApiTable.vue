<template>
  <section class="api-table">
    <h3 class="api-table__heading mb-3">
      API
    </h3>
    <div :key="docgen.title" class="api-table__component">
      <b-tabs class="api-table__component__tabs">
        <b-tab v-if="hasItems(docgen.props)" title="Properties" class="api-table__component__tabs__container">
          <b-table :items="toItems(docgen.props)" :fields="propsFields" small class="m-0 small">
            <template v-for="{ key } in propsFields" :slot="key" slot-scope="{ value }">
              <span v-html="value"></span>
            </template>
          </b-table>
        </b-tab>

        <b-tab v-if="hasItems(docgen.slots)" title="Slots" class="api-table__component__tabs__container">
          <b-table :items="toItems(docgen.slots)" :fields="slotsFields" small class="m-0 small">
            <template v-for="{ key } in slotsFields" :slot="key" slot-scope="{ value }">
              <span v-html="value"></span>
            </template>
          </b-table>
        </b-tab>

        <b-tab v-if="hasItems(docgen.events)" title="Events" class="api-table__component__tabs__container">
          <b-table :items="toItems(docgen.events)" :fields="eventsFields" small class="m-0 small">
            <template v-for="{ key } in eventsFields" :slot="key" slot-scope="{ value }">
              <span v-html="value"></span>
            </template>
          </b-table>
        </b-tab>

        <b-tab v-if="hasItems(docgen.methods)" title="Methods" class="api-table__component__tabs__container">
          <b-table :items="toItems(docgen.methods)" :fields="methodsFields" small class="m-0 small">
            <template v-for="{ key } in methodsFields" :slot="key" slot-scope="{ value }">
              <span v-html="value"></span>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </div>
  </section>
</template>

<script>
  import reduce from 'lodash/reduce'
  import keys from 'lodash/keys'
  import isObject from 'lodash/isObject'

  import bTabs from 'bootstrap-vue/es/components/tabs/tabs'
  import bTab from 'bootstrap-vue/es/components/tabs/tab'
  import bTable from 'bootstrap-vue/es/components/table/table'

  export default {
    components: {
      bTabs,
      bTab,
      bTable,
    },
    props: {
      api: {
        type: [Object, String],
        default: () => {}
      }
    },
    methods: {
      toItems(docgen = {}) {
        return reduce(keys(docgen), (items, name) => {
          items.push({ name, ...docgen[name] })
          return items
        }, [])
      },
      hasItems(docgen = {}) {
        return !!keys(docgen).length
      },
      codeFormatter (v = '—') {
        return `<code>${v}</code>`
      },
      varFormatter (v = '—') {
        if (v.indexOf('function() {') === 0) {
          return 'computed'
        }
        return `<var>${v}</var>`
      }
    },
    computed: {
      docgen () {
        return isObject(this.api) ? this.api : JSON.parse(this.api)
      }
    },
    data() {
      return {
        propsFields: [
          { label: 'Name', key: 'name', formatter: this.codeFormatter },
          { label: 'Description', key: 'description', class: 'description' },
          { label: 'Type', key: 'type.name' },
          { label: 'Default', key: 'defaultValue.value', formatter: this.varFormatter }
        ],
        slotsFields: [
          { label: 'Slot name', key: 'name', formatter: this.codeFormatter },
          { label: 'Description', key: 'description', class: 'description' }
        ],
        eventsFields: [
          { label: 'Name', key: 'name', formatter: this.codeFormatter },
          { label: 'Description', key: 'description' , class: 'description'},
          { label: 'Parameters', key: 'type.names', formatter: this.varFormatter }
        ],
        methodsFields: [
          { label: 'Name', key: 'name', formatter: this.codeFormatter },
          { label: 'Description', key: 'description', class: 'description' },
          { label: 'Return', key: 'return', formatter: this.varFormatter }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '../../lib/styles/lib.scss';

  .api-table {

    &__component {

      &__tabs {

        .nav-item {
          text-transform: uppercase;
          font-size: 0.9rem;

          .active {
            font-weight: bolder;
          }
        }

        &__container {
          padding: $spacer / 2;
          overflow: auto;
          width: 100%;
          border: 1px solid $table-border-color;
          border-top: 0;

          .table {
            thead th {
              border-top: 0;

              &.description {
                min-width: 330px;
              }
            }

            td > span > code {
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
