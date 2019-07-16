<template>
  <footer class="generic-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <h5 class="text-uppercase text-white clearfix generic-footer__icij mb-3">
            <a href="https://icij.org" target="_blank" class="generic-footer__icij__logo">
              <brand size="54" no-border color="white" background="#A10207" />
            </a>
            <a class="text-nowrap" href="https://icij.org" target="_blank">
              International Consortium of<br />
              Investigative Journalists
            </a>
          </h5>
          <p class="">
            1710 Rhode Island Ave NW | 11th floor <br />
            Washington DC 20006 USA
          </p>
          <p>
            <strong>
              <a href="mailto:contact@icij.org" class="text-selective-yellow">contact@icij.org</a>
            </strong>
          </p>
          <!-- @slot Additional content on the left side of the footer -->
          <slot name="left"></slot>
        </div>
        <div class="col-md-7">
          <div class="row justify-content-end">
            <div class="col-md-5">
              <h5 class="text-selective-yellow text-uppercase mb-3">
                {{ $t('generic-footer.investigations') }}
              </h5>
              <!-- @slot List of investigations -->
              <slot name="investigations">
                <ul class="list-unstyled">
                  <li class="list-unstyled-item">
                    <a href="https://www.icij.org/investigations/implant-files/" target="_blank">
                      The Implant Files
                    </a>
                  </li>
                  <li class="list-unstyled-item">
                    <a href="https://www.icij.org/investigations/paradise-papers/" target="_blank">
                      The Paradise Papers
                    </a>
                  </li>
                  <li class="list-unstyled-item">
                    <a href="https://www.icij.org/investigations/panama-papers/" target="_blank">
                      The Panama Papers
                    </a>
                  </li>
                  <li class="list-unstyled-item">
                    <a href="https://www.icij.org/investigations/world-bank" target="_blank">
                      Evicted and Abandoned
                    </a>
                  </li>
                  <li class="list-unstyled-item">
                    <a href="https://www.icij.org/investigations/offshore/" target="_blank">
                      Secrecy for Sale
                    </a>
                  </li>
                </ul>
              </slot>
            </div>
            <div class="col-md-4">
              <h5 class="text-selective-yellow text-uppercase mb-3">
                {{ $t('generic-footer.follow-us') }}
              </h5>
              <ul class="list-unstyled">
                <li class="list-unstyled-item">
                  <a href="https://www.facebook.com/ICIJ.org" target="_blank">
                    Facebook
                  </a>
                </li>
                <li class="list-unstyled-item">
                  <a href="https://www.linkedin.com/company/1732242/" target="_blank">
                    LinkedIn
                  </a>
                </li>
                <li class="list-unstyled-item">
                  <a href="https://twitter.com/icijorg" target="_blank">
                    Twitter
                  </a>
                </li>
                <li class="list-unstyled-item">
                  <a href="https://instagram.com/icijorg" target="_blank">
                    Instagram
                  </a>
                </li>
                <li class="list-unstyled-item">
                  <a href="https://www.icij.org/signup/" target="_blank">
                    Sign-up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p class="text-white text-md-right small mt-5">
        <strong>
          © <span class="generic-footer__year">{{ year }}</span> — The International Consortium of Investigative Journalists.
        </strong>
        {{ $t('generic-footer.all-rights') }}
        <br />
        <span v-if="version" class="text-muted generic-footer__version">
          {{ $t('generic-footer.version', { version }) }}
        </span>
      </p>
    </div>
  </footer>
</template>

<script>
import i18n from '@/i18n'
import Brand from './Brand'

/**
 * GenericFooter
 */
export default {
  i18n,
  name: 'GenericFooter',
  components: {
    Brand,
  },
  props: {
    /**
     * Version of the app to display in the bottom-right corner of the footer
     */
    version: {
      type: String
    }
  },
  computed: {
    year () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/lib';

  .generic-footer {
    background: black;
    color: #999;
    padding:$spacer * 4 0;

    @include media-breakpoint-down(md) {
      padding: $spacer;
    }

    a {
      color: inherit;
    }

    h5 {
      font-family: $font-family-sans-serif;
      font-size: 1rem;
    }

    &__icij {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      @include media-breakpoint-down(xs) {
        display: block;
      }

      &__logo {
        display: block;
        width: 54px;
        flex: 0 0 54px;
        margin-right: 8px;

        @include media-breakpoint-down(xs) {
          margin-bottom: $spacer;
        }
      }
    }
  }
</style>
