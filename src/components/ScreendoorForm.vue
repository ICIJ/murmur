<template>
  <div class="screendoor-form" v-once>
    <form data-formrenderer></form>
  </div>
</template>

<script>
  import { injectAssets } from '../utils/assets'
  import $ from 'jquery'
  window.jQuery = window.jQuery || $

  export default {
    name: 'ScreendoorForm',
    props: {
      projectId: {
        type: String,
        required: true
      }
    },
    mounted () {
      injectAssets(
        '//d3q1ytufopwvkq.cloudfront.net/1/formrenderer.js',
        '//d3q1ytufopwvkq.cloudfront.net/1/formrenderer.css'
      ).then(() => {
        // eslint-disable-next-line no-undef
        new FormRenderer({
          project_id: this.projectId,
          target: this.$el.querySelector('[data-formrenderer]')
        });
      })
    }
  }
</script>

<style lang="scss">
  @import '../styles/lib.scss';
  @import 'node_modules/bootstrap/scss/bootstrap';

  .screendoor-form {

    textarea,
    input[type=text],
    input[type=email] {
      @extend .form-control;
    }

    select {
      @extend .custom-select;
    }

    .fr_description {
      @extend .text-muted;
    }


    .fr_button {
      @extend .btn;
      @extend .btn-primary;

      &[data-fr-next-page] {
        font-weight: bolder;
        text-transform: uppercase;
      }
    }

    .fr_option.control {
      @extend .form-check;

      input[type="radio"], input[type="checkbox"] {
        @extend .form-check-input;
      }
    }
  }
</style>
