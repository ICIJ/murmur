<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-2 d-none d-md-block border-right">
        <h4 class="mt-4">Components</h4>
        <ul class="list-unstyled">
          <li>
            <router-link to="/content-placeholder">
              Content Placeholder
            </router-link>
          </li>
          <li>
            <router-link to="/donate-form">
              Donate Form
            </router-link>
          </li>
          <li>
            <router-link to="/embedable-footer">
              Embedable Footer
            </router-link>
          </li>
          <li>
            <router-link to="/embed-form">
              Embed Form
            </router-link>
          </li>
          <li>
            <router-link to="/follow-us-popover">
              Follow Us Popover
            </router-link>
          </li>
          <li>
            <router-link to="/generic-footer">
              Generic Footer
            </router-link>
          </li>
          <li>
            <router-link to="/main-header">
              Main Header
            </router-link>
          </li>
          <li>
            <router-link to="/sharing-options">
              Sharing Options
            </router-link>
          </li>
          <li>
            <router-link to="/responsive-iframe">
              Responsive Iframe
            </router-link>
          </li>
          <li>
            <router-link to="/sign-up-form">
              Sign Up Form
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col">
        <div class="app__main">
          <div class="border-bottom py-4 my-4">
            <h1>ICIJ Vue Collection</h1>
            <p class="lead m-0">
              A collection of Vue components and utilities function by the ICIJ team.
            </p>
          </div>
          <router-view class="mb-4"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss" scoped>
  .app {
    &__main {
      max-width: 770px;
      margin: auto;
    }
  }
</style>
