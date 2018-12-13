<template>
  <div class="m-4">
    <div class="card card-body card-xs mx-auto mb-4">
      <sign-up-form></sign-up-form>
    </div>
    <div class="card card-body card-xs mx-auto">
      <sign-up-form horizontal></sign-up-form>
    </div>
  </div>
</template>

<script>
  import { SignUpForm } from '@/main'

  export default {
    components: {
      SignUpForm
    }
  }
</script>
