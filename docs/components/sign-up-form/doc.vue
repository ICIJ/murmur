<template>
  <div>
    <h3 id="section-signupform">Sign Up Form</h3>
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div class="card card-body card-xs d-inline-block">
      <sign-up-form></sign-up-form>
    </div>
    <div class="card card-body card-xs d-inline-block">
      <sign-up-form horizontal></sign-up-form>
    </div>
  </div>
</template>

<script>
  import SignUpForm from '@/components/SignUpForm'

  export default {
    components: {
      SignUpForm
    }
  }
</script>
