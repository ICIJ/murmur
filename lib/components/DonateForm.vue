<template>
  <div class="donate-form container-fluid py-2">
    <h2
      v-if="!noTitle"
      class="donate-form__title text-uppercase font-weight-bold text-primary h5"
    >
      {{ $t('donate-form.support') }}
    </h2>
    <!-- @slot Description of the form (bellow the title). -->
    <slot name="introduction">
      <!-- eslint-disable vue/no-v-html -->
      <p
        class="donate-form__introduction"
        v-html="$t('donate-form.introduction')"
      />
      <!-- eslint-enable -->
    </slot>

    <div class="donate-form__payment mb-4 text-center">
      <form
        action="//checkout.fundjournalism.org/memberform"
        method="get"
        target="_blank"
        class="donate-form__payment__form bg-light p-4"
      >
        <div class="donate-form__payment__levels row">
          <div
            class="col donate-form__payment__level"
            :class="{ active: level === 'conversation' }"
            @click="selectLevel('conversation')"
          >
            <h3 class="donate-form__payment__heading text-uppercase font-weight-bold text-primary h5">
              {{ $t('donate-form.benefits.impacts.conversation.heading') }}
            </h3>
            <div class="Article">
              <div>
                <!-- eslint-disable vue/no-v-html -->
                <p
                  class="donate-form__payment__highlight text-icij font-weight-bold"
                  v-html="$t('donate-form.benefits.impacts.conversation.highlight')"
                />
                <!-- eslint-enable -->
              </div>
            </div>
          </div>
          <div
            class="col donate-form__payment__level"
            :class="{ active: level === 'rules' }"
            @click="selectLevel('rules')"
          >
            <h3 class="donate-form__payment__heading text-uppercase font-weight-bold text-primary h5">
              {{ $t('donate-form.benefits.impacts.rules.heading') }}
            </h3>
            <div class="Article">
              <div>  
                <!-- eslint-disable vue/no-v-html -->
                <p
                  class="donate-form__payment__highlight text-icij font-weight-bold"
                  v-html="$t('donate-form.benefits.impacts.rules.highlight')"
                />
                <!-- eslint-enable -->
              </div>
            </div>
          </div>
          <div
            class="col donate-form__payment__level"
            :class="{ active: level === 'world' }"
            @click="selectLevel('world')"
          >
            <h3 class="donate-form__payment__heading text-uppercase font-weight-bold text-primary h5">
              {{ $t('donate-form.benefits.impacts.world.heading') }}
            </h3>
            <div class="Article">
              <div>
                <!-- eslint-disable vue/no-v-html -->
                <p
                  class="donate-form__payment__highlight text-icij font-weight-bold"
                  v-html="$t('donate-form.benefits.impacts.world.highlight')"
                />
                <!-- eslint-enable -->
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="mt-5">
            <span class="donate-form__payment__buttons">
              <button
                type="button"
                class="btn btn-sm"
                :class="{ 'btn-primary': installmentPeriod === 'monthly' }"
                @click="installmentPeriod = 'monthly'"
              >
                {{ $t('donate-form.frequency.monthly') }}
              </button>
              <button
                type="button"
                class="btn btn-sm"
                :class="{ 'btn-primary': installmentPeriod === 'yearly' }"
                @click="installmentPeriod = 'yearly'"
              >
                {{ $t('donate-form.frequency.yearly') }}
              </button>
              <button
                type="button"
                class="btn btn-sm"
                :class="{ 'btn-primary': installmentPeriod === null }"
                @click="installmentPeriod = null"
              >
                {{ $t('donate-form.frequency.onetime') }}
              </button>
            </span>
          </div>
          <div class="mt-4">
            <span>{{ $t('donate-form.label') }}&nbsp;</span>
            <label class="donate-form__payment__unit input-group input-group-sm d-inline-flex">
              <span class="input-group-prepend">
                <span class="input-group-text">$</span>
              </span>
              <input
                v-model="amount"
                class="donate-form__payment__input form-control"
                name="amount"
                type="number"
                min="0"
                @change="amountIsPristine = false"
              >
            </label>
          </div>
          <div class="mt-4">
            <input
              name="org_id"
              value="icij"
              type="hidden"
            >
            <input
              v-model="campaign"
              name="campaign"
              type="hidden"
            >
            <input
              v-model="installmentPeriod"
              name="installmentPeriod"
              type="hidden"
            >
            <button
              type="submit"
              class="btn btn-primary rounded-pill text-uppercase font-weight-bold"
            >
              {{ $t('donate-form.submit') }}
            </button>
            <a
              target="_blank"
              href="https://icij.org/donate"
              class="donate-form__payment__image"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="donate-form__insider">
      <h2 class="donate-form__insider__title">
        {{ $t('donate-form.benefits.heading') }}
      </h2>
      <p>
        {{ $t('donate-form.benefits.introduction') }}
      </p>
      <div>
        <ul class="donate-form__insider__list">
          <li
            v-for="(benefit, index) in $t('donate-form.benefits.list')"
            :key="index"
            class="donate-form__insider__list-item"
            v-html="benefit"
          />
        </ul>
      </div>
      <div>
        <hr class="donate-form__insider__separator">
        <div class="donate-form__insider__more text-center">
          <a
            target="_blank"
            href="https://icij.org/donate"
            class="btn btn-primary rounded-pill text-uppercase font-weight-bold py-2"
          >
            {{ $t('donate-form.benefits.more') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import i18n from '@/i18n'
  import keys from 'lodash/keys'
  import map from 'lodash/map'
  import sortBy from 'lodash/sortBy'
  import forEach from 'lodash/forEach'
  import config from '../config'

  /**
   * A form to encourage donations. We usualy put this form inside a modal
   */
  export default {
    i18n,
    name: 'DonateForm',
    props: {
      /**
       * Title of the form.
       */
      noTitle: {
        type: Boolean
      }
    },
    data() {
      return {
        amount: 10,
        // True if the amount wasn't changed by the user yet
        amountIsPristine: true,
        installmentPeriod: 'monthly',
        level: 'conversation',
        campaign: config.get('donate-form.tracker'),
        labelForChange: {
          'monthly': {
            1: this.$t('donate-form.result.conversation'),
            15: this.$t('donate-form.result.rules'),
            50: this.$t('donate-form.result.world')
          },
          'yearly': {
            1: this.$t('donate-form.result.conversation'),
            180: this.$t('donate-form.result.rules'),
            600: this.$t('donate-form.result.world')
          }
        },
        suggestedAmount: this.$t('donate-form.suggesteddonation')
      }
    },
    computed: {
      firstRange(){
          const key= keys(this.ranges)[0]
          return this.ranges[key]
      },
      ranges(){
        return this.labelForChange[this.installmentPeriod || 'yearly']
      },
      changeThe () {
        // Final label
        let label = null
        forEach(sortBy(map(keys(this.ranges), Number)), amount => {
          label = this.amount >= amount ? this.ranges[amount] : label
        })
        return label
      }
    },
    watch: {
      installmentPeriod () {
        if (!this.amountIsPristine) {
          return
        }

        // Set suggested amount
        this.amount = this.getSuggestedAmount()
      },
      amount(v) {

        this.level = this.changeThe

        // Set manual amount
        return this.amount = v
      },
    },
    methods: {
      getSuggestedAmount () {
        if (!this.amountIsPristine) {
          return
        }
        
        if(!this.level){
          this.level = this.firstRange
        }

        // Return suggested amount
        return this.suggestedAmount[this.level][this.installmentPeriod]
      },
      selectLevel (level) {

        // Set chose level
        this.level = level;

        // Set suggested amount
        this.amount = this.getSuggestedAmount()
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/lib.scss';

  .donate-form {
    font-size: 0.9rem;

    &__payment {

      & &__unit {
        width: 120px;
        margin-right: $spacer;

        @media screen and (max-width: $modal-lg) {
          width: 100%;
          flex: 0 0 100%;
        }
      }

      &__buttons {
        button {
          margin: 0 5px;
          border: solid 1px var(--primary);
        }
      }

      &__level {
        border-bottom: solid 3px $light;
        cursor: pointer;

        &.active {
          border-bottom: solid 3px var(--primary);
        }
      }

      &__highlight {
        font-size: 17px;

        .monthly {
          display: block;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }

    &__insider  {

      &__list {
        padding-left: 20px;

        &-item {
          position: relative;
          margin: 3px 0;
          font-size: 15px;
          list-style: none;

          &:before {
            content: "\2713";
            position: absolute;
            left: -16px;
            font-size: 14px;
            font-weight: 700;
            color: #333;
            font-family: $font-family-sans-serif;
          }
        }
      }

      &__modal__container .col {
        @media screen and (max-width: $modal-lg) {
          width: 100%;
          flex: 0 0 100%;
        }
      }
    }
  }
</style>
