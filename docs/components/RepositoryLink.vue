<template>
  <a :href="href" target="_blank"><slot /></a>
</template>

<script>
  import packageInfo  from '@package'
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
        return join(packageInfo.repository.url, 'tree', this.branch, this.path)
      }
    }
  }
</script>
