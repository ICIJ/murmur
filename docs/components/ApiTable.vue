<template>
  <section class="api-table">
    <h3 class="api-table__heading mb-3">
      API
    </h3>
    <template v-for="component in api">
      <div :key="component.title" class="api-table__component">
        <h4 v-if="component.title" class="api-table__component__heading">
          {{ component.title }}
        </h4>
        <b-tabs class="api-table__component__tabs">
          <b-tab v-if="component.props && component.props.length" title="Properties" class="api-table__component__tabs__container">
            <b-table :items="component.props" :fields="propsFields" small class="m-0 small">
              <template v-for="{ key } in propsFields" :slot="key" slot-scope="{ value }">
                <span v-html="value"></span>
              </template>
            </b-table>
          </b-tab>

          <b-tab v-if="component.slots && component.slots.length" title="Slots" class="api-table__component__tabs__container">
            <b-table :items="component.slots" :fields="slotsFields" small class="m-0 small">
              <template v-for="{ key } in slotsFields" :slot="key" slot-scope="{ value }">
                <span v-html="value"></span>
              </template>
            </b-table>
          </b-tab>

          <b-tab v-if="component.events && component.events.length" title="Events" class="api-table__component__tabs__container">
            <b-table :items="component.events" :fields="eventsFields" small class="m-0 small">
              <template v-for="{ key } in eventsFields" :slot="key" slot-scope="{ value }">
                <span v-html="value"></span>
              </template>
            </b-table>
          </b-tab>

          <b-tab v-if="component.methods && component.methods.length" title="Methods" class="api-table__component__tabs__container">
            <b-table :items="component.methods" :fields="methodsFields" small class="m-0 small">
              <template v-for="{ key } in methodsFields" :slot="key" slot-scope="{ value }">
                <span v-html="value"></span>
              </template>
            </b-table>
          </b-tab>
        </b-tabs>
      </div>
    </template>
  </section>
</template>

<script>
  import $ from 'jquery'
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
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        propsFields: [
          { label: 'Name', key: 'name' },
          { label: 'Description', key: 'description', class: 'description' },
          { label: 'Type', key: 'type' },
          { label: 'Default', key: 'default' }
        ],
        slotsFields: [
          { label: 'Slot name', key: 'name' },
          { label: 'Description', key: 'description', class: 'description' }
        ],
        eventsFields: [
          { label: 'Name', key: 'name' },
          { label: 'Description', key: 'description' , class: 'description'},
          { label: 'Parameters', key: 'parameters' }
        ],
        methodsFields: [
          { label: 'Name', key: 'name' },
          { label: 'Description', key: 'description', class: 'description' },
          { label: 'Return', key: 'return' }
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