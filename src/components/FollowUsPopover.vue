<template>
  <div class="follow-us">
    <button class="btn btn-link text-light follow-us__close" @click="closeSignupPopover">
      <i class="fas fa-times"></i>
    </button>
    <sign-up-form class="p-3"></sign-up-form>
    <div class="px-3 pb-1 text-uppercase text-muted font-weight-bold">
      Follow us
    </div>
    <div class="p-3 bg-light container-fluid text-center">
      <div class="row">
        <div class="col">
          <a href="https://twitter.com/icijorg" target="_blank" class="d-inline-block text-primary border border-primary rounded-circle bg-white follow-us__social-btn" title="Twitter">
            <i class="fab fa-twitter"></i>
            <span class="sr-only">Twitter</span>
          </a>
        </div>
        <div class="col">
          <a href="https://www.facebook.com/ICIJ.org" target="_blank" class="d-inline-block text-primary border border-primary rounded-circle bg-white follow-us__social-btn" title="Facebook">
            <i class="fab fa-facebook"></i>
            <span class="sr-only">Facebook</span>
          </a>
        </div>
        <div class="col">
          <a href="https://www.linkedin.com/company/1732242/" target="_blank" class="d-inline-block text-primary border border-primary rounded-circle bg-white follow-us__social-btn" title="Linkedin">
            <i class="fab fa-linkedin"></i>
            <span class="sr-only">Linkedin</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
  import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
  import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'

  import SignUpForm from './SignUpForm.vue'

  import { library } from '@/components/FontAwesomeIcon'
  library.add(faTwitter, faFacebook, faLinkedin)

  export default {
    name: 'FollowUsPopover',
    components: {
      SignUpForm,
    },
    methods: {
      closeSignupPopover() {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/lib';

  .follow-us {
    position: relative;
    width: 300px;

    &__social-btn {
      height: 46px;
      width: 46px;
      line-height: 46px;

      i.fab {
        line-height: inherit;
        font-size: 1.5em;
      }
    }

    &__close {
      position: absolute;
      right: $spacer / 2;
      top: $spacer / 2;
    }
  }
</style>
