### Donate form

A form to encourage donations. We usualy put this form inside a modal (here, with Boostrap Vue).

::: sample-card
<div class="p-4 text-center">
  <button class="btn btn-info font-weight-bold" @click="$refs.formModal.show()">
    Click to see the form
  </button>
</div>
<b-modal hide-footer lazy title="Support ICIJ" ref="formModal" size="lg" no-headings>
  <donate-form no-title></donate-form>
</b-modal>
:::

You can show it in the page directly.

::: sample-card
<donate-form introduction="This is a custom message using a component's property" class="bg-white"></donate-form>
:::

::: api-table ./lib/components/DonateForm.vue :::
