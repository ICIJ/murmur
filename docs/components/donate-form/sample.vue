<template>
  <donate-form introduction="This is a custom message using a component's property" class="bg-white"></donate-form>
</template>

<script>
  import { DonateForm } from '@/main'

  export default {
    components: {
      DonateForm
    }
  }
</script>
