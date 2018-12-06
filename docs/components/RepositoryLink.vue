<template>
  <a :href="href" target="_blank"><slot /></a>
</template>

<script>
  import { repository } from '@package'
  import join from 'url-join'

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
      href () {
        return join(repository.url, 'tree', this.branch, this.path)
      }
    }
  }
</script>
