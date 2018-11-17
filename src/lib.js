export const components = {
  ContentPlaceholder: require('./components/ContentPlaceholder.vue').default,
  DonateForm: require('./components/DonateForm.vue').default,
  EmbedableFooter: require('./components/EmbedableFooter.vue').default,
  EmbedForm: require('./components/EmbedForm.vue').default,
  FollowUsPopover: require('./components/FollowUsPopover.vue').default,
  GenericFooter: require('./components/GenericFooter.vue').default,
  MainHeader: require('./components/MainHeader.vue').default,
  SharingOptions: require('./components/SharingOptions.vue').default,
  SignUpForm: require('./components/SignUpForm.vue'.default)
}

export default {
  config: require('./config').default,
  components
}
