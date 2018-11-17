<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-2 border-right">
        <h4 class="mt-4">Components</h4>
        <ul class="list-unstyled">
          <li>
            <a href="#section-contentplaceholder">Content Placeholder</a>
          </li>
          <li>
            <a href="#section-donateform">Donate Form</a>
          </li>
          <li>
            <a href="#section-embedablefooter">Embedable Footer</a>
          </li>
          <li>
            <a href="#section-embedform">Embed Form</a>
          </li>
          <li>
            <a href="#section-followuspopover">Follow Us Popover</a>
          </li>
          <li>
            <a href="#section-genericfooter">Generic Footer</a>
          </li>
          <li>
            <a href="#section-mainheader">Main Header</a>
          </li>
          <li>
            <a href="#section-screendoorform">Screendoor Form</a>
          </li>
          <li>
            <a href="#section-sharingoptions">Sharing Options</a>
          </li>
          <li>
            <a href="#section-signupform">Sign Up Form</a>
          </li>
        </ul>
      </div>
      <div class="col">
        <div class="container">
          <div class="border-bottom py-4 my-4">
            <h1>ICIJ Vue Collection</h1>
            <p class="lead m-0">A collection of Vue components and utilities function by the ICIJ team.</p>
          </div>
          <section class="mb-5">
            <h3 id="section-contentplaceholder">Content Placeholder</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card card-block card-xs">
              <content-placeholder class="m-2"></content-placeholder>
              <content-placeholder class="m-2"></content-placeholder>
              <content-placeholder class="m-2"></content-placeholder>
              <content-placeholder class="m-2"></content-placeholder>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-donateform">Donate Form</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card">
              <donate-form></donate-form>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-embedablefooter">Embedable Footer</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card">
              <embedable-footer title="Awesome App" class="position-relative"></embedable-footer>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-embedform">Embed Form</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card card-sm py-2">
              <embed-form url="about:blank" no-preview></embed-form>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-followuspopover">Follow Us Popover</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card d-inline-block">
              <follow-us-popover></follow-us-popover>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-genericfooter">Generic Footer</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card w-100">
              <generic-footer></generic-footer>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-mainheader">Main Header</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card d-inline-block w-100">
              <main-header title="Awesome App" no-headroom position="relative"></main-header>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-screendoorform">Screendoor Form</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card card-body card-md">
              <screendoor-form project-id="410"></screendoor-form>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-sharingoptions">Sharing Options</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card card-body d-inline-block">
              <sharing-options class="justify-content-center"></sharing-options>
            </div>
          </section>

          <section class="mb-5">
            <h3 id="section-signupform">Sign Up Form</h3>
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="card card-body card-xs">
              <sign-up-form></sign-up-form>
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentPlaceholder from './components/ContentPlaceholder.vue'
import DonateForm from './components/DonateForm.vue'
import EmbedableFooter from './components/EmbedableFooter.vue'
import EmbedForm from './components/EmbedForm.vue'
import FollowUsPopover from './components/FollowUsPopover.vue'
import GenericFooter from './components/GenericFooter.vue'
import MainHeader from './components/MainHeader.vue'
import ScreendoorForm from './components/ScreendoorForm.vue'
import SharingOptions from './components/SharingOptions.vue'
import SignUpForm from './components/SignUpForm.vue'

export default {
  name: 'app',
  components: {
    ContentPlaceholder,
    DonateForm,
    EmbedableFooter,
    EmbedForm,
    FollowUsPopover,
    GenericFooter,
    MainHeader,
    ScreendoorForm,
    SharingOptions,
    SignUpForm
  }
}
</script>
