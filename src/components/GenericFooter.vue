<template>
  <footer class="generic-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5 class="text-uppercase text-white clearfix generic-footer__icij mb-3">
            <a href="https://icij.org" target="_blank" class="generic-footer__icij__logo">
              <img src="~assets/images/icij@2x.png" class="mw-100" />
            </a>
            International Consortium of Investigative Journalists
          </h5>
          <p class="">
            1710 Rhode Island Ave NW | 11th floor <br />
            Washington DC 20006 USA
          </p>
          <p>
            <strong>
              <a href="mailto:contact@icij.org" class="text-icij-primary">contact@icij.org</a>
            </strong>
          </p>
        </div>
        <div class="col-md-6 offset-md-2">
          <div class="row justify-content-end">
            <div class="col-md-5">
              <h5 class="text-icij-primary text-uppercase mb-3">
                Investigations
              </h5>
              <ul class="list-unstyled">
                <li class="list-unstyled-item">
                  <a href="https://www.icij.org/investigations/the-implant-files/" target="_blank">
                    The Implant Files
                  </a>
                </li>
                <li class="list-unstyled-item">
                  <a href="https://www.icij.org/investigations/paradise-papers/" target="_blank">
                    Paradise Papers
                  </a>
                </li>
                <li class="list-unstyled-item">
                  <a href="https://www.icij.org/investigations/panama-papers/" target="_blank">
                    Panama Papers
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
            </div>
            <div class="col-md-4">
              <h5 class="text-icij-primary text-uppercase mb-3">
                Follow us
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
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p class="text-white text-md-right small mt-5">
        <strong>© {{ year }} — The International Consortium of Investigative Journalists.</strong> All rights reserved
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'GenericFooter',
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
      font-size: 18px;
    }

    &__icij {
      display: flex;
      justify-content: start;
      align-items: center;

      &__logo {
        display: block;
        width: 54px;
        flex: 0 0 54px;
        margin-right: 8px;
      }
    }
  }
</style>
