<template>
  <div class="donate-form container-fluid py-2">
    <h2 class="donate-form__title text-uppercase font-weight-bold text-primary h5" v-if="!noTitle">
      {{ $t('donate-form.support') }}
    </h2>
    <!-- @slot Description of the form (bellow the title). -->
    <slot name="introduction">
      <p class="donate-form__introduction" v-html="$t('donate-form.introduction')"></p>
    </slot>

    <div class="donate-form__payment mb-4 text-center">
      <form action="//checkout.fundjournalism.org/memberform" method="get" target="_blank" class="donate-form__payment__form bg-light p-4">
        <div class="donate-form__payment__levels row">
          <div @click="selectLevel('conversation')" class="col donate-form__payment__level" :class="{ active: level == 'conversation' }">
              <h3 class="donate-form__payment__heading text-uppercase font-weight-bold text-primary h5">
                {{ $t('donate-form.benefits.impacts.conversation.heading') }}
              </h3>
              <div class="Article">
                  <div>
                    <p class="donate-form__payment__highlight text-icij font-weight-bold" v-html="$t('donate-form.benefits.impacts.conversation.highlight')"></p>
                  </div>
              </div>
          </div>
          <div @click="selectLevel('rules')" class="col donate-form__payment__level" :class="{ active: level == 'rules' }">
              <h3 class="donate-form__payment__heading text-uppercase font-weight-bold text-primary h5">
                {{ $t('donate-form.benefits.impacts.rules.heading') }}
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__payment__highlight text-icij font-weight-bold" v-html="$t('donate-form.benefits.impacts.rules.highlight')"></p>
                  </div>
              </div>
          </div>
          <div @click="selectLevel('world')" class="col donate-form__payment__level" :class="{ active: level == 'world' }">
              <h3 class="donate-form__payment__heading text-uppercase font-weight-bold text-primary h5">
                {{ $t('donate-form.benefits.impacts.world.heading') }}
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__payment__highlight text-icij font-weight-bold" v-html="$t('donate-form.benefits.impacts.world.highlight')"></p>
                  </div>
              </div>
          </div>
        </div>

        <div>
          <div class="mt-5">
            <span class="donate-form__payment__buttons">
              <button type="button" class="btn btn-sm" :class="{ 'btn-primary': installmentPeriod === 'monthly' }" @click="installmentPeriod = 'monthly'">
                {{ $t('donate-form.frequency.monthly') }}
              </button>
              <button type="button" class="btn btn-sm" :class="{ 'btn-primary': installmentPeriod === 'yearly' }" @click="installmentPeriod = 'yearly'">
                {{ $t('donate-form.frequency.yearly') }}
              </button>
              <button type="button" class="btn btn-sm" :class="{ 'btn-primary': installmentPeriod === null }" @click="installmentPeriod = null">
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
              <input class="donate-form__payment__input form-control" name="amount" v-model="amount" @change="amountIsPristine = false" type="number" min="0">
            </label>
          </div>
          <div class="mt-4">
            <input name="org_id" value="icij" type="hidden">
            <input name="campaign" v-model="campaign" type="hidden">
            <input name="installmentPeriod" v-model="installmentPeriod" type="hidden">
            <button type="submit" class="btn btn-primary rounded-pill text-uppercase font-weight-bold">
              {{ $t('donate-form.submit') }}
            </button>
            <a target="_blank" href="https://icij.org/donate" class="donate-form__payment__image"></a>
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
          <li class="donate-form__insider__list-item" v-for="benefit in $t('donate-form.benefits.list')" v-html="benefit"></li>
        </ul>
      </div>
      <div>
        <hr class="donate-form__insider__separator">
        <div class="donate-form__insider__more text-center">
          <a target="_blank" href="https://icij.org/donate" class="btn btn-primary rounded-pill text-uppercase font-weight-bold py-2">
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
            3: this.$t('donate-form.result.conversation'),
            15: this.$t('donate-form.result.rules'),
            50: this.$t('donate-form.result.world')
          },
          'yearly': {
            35: this.$t('donate-form.result.conversation'),
            180: this.$t('donate-form.result.rules'),
            600: this.$t('donate-form.result.world')
          }
        },
        suggestedAmount: this.$t('donate-form.suggesteddonation')
      }
    },
    watch: {
      installmentPeriod (installmentPeriod) {
        if (!this.amountIsPristine) {
          return
        }
        //Set suggested amount
        this.$set(this, 'amount', this.getSuggestedAmount());
      },
      amount(v,o) {
        const ranges = this.labelForChange[this.installmentPeriod || 'yearly'];
        // Set level base on amount
        forEach(sortBy(map(keys(ranges), Number)), amount => {
          this.level = this.amount >= amount ? ranges[amount] : this.level;
        });

        //Set manual amount
        return this.amount = v;
      },
    },
    methods: {
      getSuggestedAmount () {
        //Return suggested amount
        this.$t('donate-form.result.conversation')
        return this.suggestedAmount[this.level][this.installmentPeriod];
      },
      selectLevel (level) {

        //Set chose level
        this.$set(this, 'level', level);

        //Set suggested amount
        this.$set(this, 'amount', this.getSuggestedAmount());
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
          border: solid 1px $border-level-selected;
        }
      }

      &__level {
        border-bottom: solid 3px $light;
        cursor: pointer;

        &.active {
          border-bottom: solid 3px $border-level-selected;
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
