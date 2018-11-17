<template>
  <div class="donate-form container-fluid py-2">
    <h2 class="text-uppercase font-weight-bold text-primary h5" v-if="!noTitle">
      Support ICIJ
    </h2>
    <slot name="introduction">
      <p>
        ICIJ’s investigations are supported by readers like you. Help keep our
        databases free and open to the public by joining our
        <strong><a target="_blank" href="https://icij.org/donate">ICIJ Insiders</a></strong>
        community.
      </p>
    </slot>
    <div class="donate-form__payment mb-4">
      <form action="//checkout.fundjournalism.org/memberform" method="get" target="_blank" class="donate-form__payment__form bg-light p-4">
          <h3 class="donate-form__payment__title h5 mb-4">
            <strong>Won't you join us today?</strong>
          </h3>
          <div>
            <span>I would like to donate</span>
            <label class="donate-form__payment__unit input-group input-group-sm d-inline-flex">
              <span class="input-group-prepend">
                <span class="input-group-text">$</span>
              </span>
              <input class="donate-form__payment__input form-control" name="amount" v-model="amount" @change="amountIsPristine = false" type="number" min="0">
            </label>
            <span class="donate-form__payment__buttons">
              <button type="button" class="btn btn-sm" :class="{ 'btn-primary': installmentPeriod === 'monthly' }" @click="installmentPeriod = 'monthly'">
                Monthly
              </button>
              <button type="button" class="btn btn-sm" :class="{ 'btn-primary': installmentPeriod === 'yearly' }" @click="installmentPeriod = 'yearly'">
                Yearly
              </button>
              <button type="button" class="btn btn-sm" :class="{ 'btn-primary': installmentPeriod === null }" @click="installmentPeriod = null">
                One time
              </button>
            </span>
          </div>
          <p v-if="changeThe" class="mt-2">
            With this donation, you are <strong>changing the {{ changeThe }}</strong>.
          </p>
          <div class="mt-4">
            <input name="org_id" value="icij" type="hidden">
            <input name="installmentPeriod" v-model="installmentPeriod" type="hidden">
            <button type="submit" class="btn btn-primary rounded-pill text-uppercase font-weight-bold">
              Donate now
            </button>
            <a target="_blank" href="https://icij.org/donate" class="donate-form__payment__image"></a>
          </div>
      </form>
    </div>
    <div class="donate-form__insider">
      <h2 class="donate-form__insider__title">
        ICIJ Insiders benefits
      </h2>
      <p>
        Your monthly or annual donation will give you the following benefits.
      </p>
      <div class="donate-form__insider__modal__container row">
          <div class="col">
              <h3 class="donate-form__insider__subtitle text-uppercase font-weight-bold text-primary h5">
                Change the Conversation
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__insider__highlight text-icij font-weight-bold">
                        $3-$14/month (or $35-$179/year)
                      </p>
                      <ul class="donate-form__insider__list">
                          <li class="donate-form__insider__list-item">
                            ICIJ Insider Newsletter (quarterly)
                          </li>
                          <li class="donate-form__insider__list-item">
                            ICIJ’s Weekly Update
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col">
              <h3 class="donate-form__insider__subtitle text-uppercase font-weight-bold text-primary h5">
                Change the Rules
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__insider__highlight text-icij font-weight-bold">
                        $15-$49/month (or $180-$599/year)
                      </p>
                      <ul class="donate-form__insider__list">
                          <li class="donate-form__insider__list-item">
                            Opportunity to submit your question to ICIJ staff. Several questions will be answered in our quarterly ICIJ Insider newsletter
                          </li>
                          <li class="donate-form__insider__list-item">
                            Sneak previews behind the scenes of ICIJ’s work (monthly)
                          </li>
                          <li class="donate-form__insider__list-item">
                            ICIJ Insider Newsletter (quarterly)
                          </li>
                          <li class="donate-form__insider__list-item">
                            ICIJ’s Weekly Update
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col">
              <h3 class="donate-form__insider__subtitle text-uppercase font-weight-bold text-primary h5">
                Change the World
              </h3>
              <div class="Article">
                  <div>
                      <p class="donate-form__insider__highlight text-icij font-weight-bold">
                        $50/month and above (or $600/year and above)
                      </p>
                      <ul class="donate-form__insider__list">
                          <li class="donate-form__insider__list-item">
                            Invitation to exclusive chat with ICIJ staff about our latest major project after publication
                          </li>
                          <li class="donate-form__insider__list-item">
                            Opportunity to submit your questions to ICIJ staff. Several questions will be answered in our quarterly ICIJ Insider newsletter
                          </li>
                          <li class="donate-form__insider__list-item">
                            Sneak previews behind the scenes of ICIJ’s work (monthly)
                          </li>
                          <li class="donate-form__insider__list-item">
                            ICIJ Insider Newsletter (quarterly)
                          </li>
                          <li class="donate-form__insider__list-item">
                            ICIJ’s Weekly Update
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <hr class="donate-form__insider__separator">
      <div class="donate-form__insider__more text-center">
        <a target="_blank" href="https://icij.org/donate" class="btn btn-primary rounded-pill text-uppercase font-weight-bold py-2">
          More about donations
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import keys from 'lodash/keys'
  import map from 'lodash/map'
  import sortBy from 'lodash/sortBy'
  import forEach from 'lodash/forEach'

  export default {
    name: 'DonateForm',
    props: {
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
            3: 'conversation',
            15: 'rules',
            50: 'world'
          },
          'yearly': {
            35: 'conversation',
            180: 'rules',
            600: 'world'
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
