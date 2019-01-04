<template>
  <div class="donate-form container-fluid py-2">
    <h2 class="donate-form__title text-uppercase font-weight-bold text-primary h5" v-if="!noTitle">
      {{ $t('donate-form.support') }}
    </h2>
    <!-- @slot Description of the form (bellow the title). -->
    <slot name="introduction">
      <p class="donate-form__introduction" v-html="$t('donate-form.introduction')"></p>
    </slot>
    <div class="donate-form__payment mb-4">
      <form action="//checkout.fundjournalism.org/memberform" method="get" target="_blank" class="donate-form__payment__form bg-light p-4">
          <h3 class="donate-form__payment__title h5 mb-4">
            <strong>
              {{ $t('donate-form.join-heading') }}
            </strong>
          </h3>
          <div>
            <span>{{ $t('donate-form.label') }}&nbsp;</span>
            <label class="donate-form__payment__unit input-group input-group-sm d-inline-flex">
              <span class="input-group-prepend">
                <span class="input-group-text">$</span>
              </span>
              <input class="donate-form__payment__input form-control" name="amount" v-model="amount" @change="amountIsPristine = false" type="number" min="0">
            </label>
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
          <p v-if="changeThe" class="mt-2" v-html="$t('donate-form.result.sentence', { target: changeThe })"></p>
          <div class="mt-4">
            <input name="org_id" value="icij" type="hidden">
            <input name="installmentPeriod" v-model="installmentPeriod" type="hidden">
            <button type="submit" class="btn btn-primary rounded-pill text-uppercase font-weight-bold">
              {{ $t('donate-form.submit') }}
            </button>
            <a target="_blank" href="https://icij.org/donate" class="donate-form__payment__image"></a>
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
      <div class="donate-form__insider__modal__container row">
          <div class="col">
              <h3 class="donate-form__insider__subtitle text-uppercase font-weight-bold text-primary h5">
                {{ $t('donate-form.benefits.impacts.conversation.heading') }}
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__insider__highlight text-icij font-weight-bold">
                        {{ $t('donate-form.benefits.impacts.conversation.highlight') }}
                      </p>
                      <ul class="donate-form__insider__list">
                        <li class="donate-form__insider__list-item" v-for="t in $t('donate-form.benefits.impacts.conversation.list')">
                          {{ t }}
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col">
              <h3 class="donate-form__insider__subtitle text-uppercase font-weight-bold text-primary h5">
                {{ $t('donate-form.benefits.impacts.rules.heading') }}
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__insider__highlight text-icij font-weight-bold">
                        {{ $t('donate-form.benefits.impacts.rules.highlight') }}
                      </p>
                      <ul class="donate-form__insider__list">
                        <li class="donate-form__insider__list-item" v-for="t in $t('donate-form.benefits.impacts.rules.list')">
                          {{ t }}
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col">
              <h3 class="donate-form__insider__subtitle text-uppercase font-weight-bold text-primary h5">
                {{ $t('donate-form.benefits.impacts.world.heading') }}
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__insider__highlight text-icij font-weight-bold">
                        {{ $t('donate-form.benefits.impacts.world.highlight') }}
                      </p>
                      <ul class="donate-form__insider__list">
                        <li class="donate-form__insider__list-item" v-for="t in $t('donate-form.benefits.impacts.world.list')">
                          {{ t }}
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <hr class="donate-form__insider__separator">
      <div class="donate-form__insider__more text-center">
        <a target="_blank" href="https://icij.org/donate" class="btn btn-primary rounded-pill text-uppercase font-weight-bold py-2">
          {{ $t('donate-form.benefits.more') }}
        </a>
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
        amount: 15,
        // True if the amount wasn't changed by the user yet
        amountIsPristine: true,
        installmentPeriod: 'monthly',
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
        }
      }
    },
    watch: {
      installmentPeriod (installmentPeriod) {
        if (!this.amountIsPristine) {
          return
        }
        if (installmentPeriod === 'monthly') {
          this.$set(this, 'amount', 15)
        } else {
          this.$set(this, 'amount', 100)
        }
      }
    },
    computed: {
      changeThe () {
        const ranges = this.labelForChange[this.installmentPeriod || 'yearly'];
        // Final label
        let label = null;
        forEach(sortBy(map(keys(ranges), Number)), amount => {
          label = this.amount >= amount ? ranges[amount] : label;
        });
        return label;
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
    }

    &__insider  {

      &__list {
        padding-left: 20px;

        &-item {
          position: relative;
          margin: 3px 0;
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
