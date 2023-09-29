<template>
  <a :href="href" target="_blank"><slot /></a>
</template>

<script>
import join from 'url-join'

import packageInfo from '$package'

export default {
  name: 'RepositoryLink',
  props: {
    path: {
      type: String,
      default: ''
    },
    branch: {
      type: String,
      default: 'master'
    }
  },
  computed: {
    href() {
      return join(packageInfo.repository.url, 'tree', this.branch, this.path)
    }
  }
}
</script>
