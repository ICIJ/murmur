<template>
  <form @submit.prevent="subscribe($event)" class="sign-up-form" :class="{ 'sign-up-form--horizontal': horizontal }">
    <fieldset :disabled="frozen">
      <label class="text-uppercase text-muted font-weight-bold" for="input-email" v-if="!noLabel">
        Stories in your inbox
      </label>
      <div class="sign-up-form__fieldset__group">
        <input v-model="email" name="EMAIL" type="text" class="form-control" placeholder="Email address" id="input-email" />
        <div class="sign-up-form__fieldset__group__addon">
          <button class="btn btn-primary text-uppercase font-weight-bold" type="submit">
            Sign up
          </button>
        </div>
      </div>
    </fieldset>
    <input type="hidden" name="group[9][1]" value="1" />
    <input type="hidden" name="SIGNUP" :value="tracker" />
    <p v-if="errorMessage" class="alert alert-danger p-2 m-0 mt-2" v-html="errorMessage"></p>
    <p v-if="successMessage" class="alert alert-success p-2 m-0 mt-2" v-html="successMessage"></p>
  </form>
</template>

<script>
import $ from 'jquery'
import last from 'lodash/last'

export default {
  name: "SignUpForm",
  props: {
    action: {
      default: 'https://icij.us15.list-manage.com/subscribe/post?u=0d48a33b1c24d257734cc2a79&id=992ecfdbb2',
      type: String
    },
    noLabel: {
      type: Boolean
    },
    horizontal: {
      type: Boolean
    },
    tracker: {
      type: String,
      default: 'EXTERNAL'
    }
  },
  data () {
    return {
      email: '',
      frozen: false,
      response: {},
      errorMessage: null,
      successMessage: null
    };
  },
  computed: {
    actionJsonp () {
      return this.action.replace('/post?', '/post-json?').concat('&c=?')
    }
  },
  methods: {
    subscribe () {
      this.resetMessages()
      this.freeze()
      // Send the data, catch the result no matter what and unfreeze the form
      this.send().always(this.done).always(this.unfreeze)
    },
    send () {
      return $.ajax({
        type: 'POST',
        url: this.actionJsonp,
        data: $(this.$el).serialize(),
        dataType: 'jsonp'
      })
    },
    done (res) {
      if (res.result === 'success') {
        this.email = ''
        this.successMessage = res.msg;
      } else {
        // Mailchimp formats errors in list
        this.errorMessage = last((res.msg || "Something's wrong").split('0 -'))
      }
    },
    resetMessages () {
      this.errorMessage = null
      this.successMessage = null
    },
    freeze () {
      this.frozen = true
    },
    unfreeze () {
      this.frozen = false
    }
  }
};
</script>

<style lang="scss">
  @import '../styles/lib.scss';
  @import 'node_modules/bootstrap/scss/bootstrap';

  .sign-up-form {

    .sign-up-form__fieldset__group__addon .btn {
      font-size: 0.9em;
    }

    &--horizontal {
      .sign-up-form__fieldset__group {
        @extend .input-group;

        &__addon {
          @extend .input-group-append;
        }
      }
    }

    &:not(&--horizontal) {

      .sign-up-form__fieldset__group__addon .btn {
        @extend .btn-block;
      }
    }
  }
</style>
