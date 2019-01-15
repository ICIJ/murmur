---
title: Configure Murmur
order: 0
---

Murmur comes with a built-in configuration system. To access the configuration
object, just use the `config` static property from the Murmur class:

```js
import Murmur from '@icij/murmur'

Murmur.config.set('project', 'Demo Project')
Murmur.config.get('project')
```

New key/value pair can be define using namespaces and dot notation:

```js
Murmur.config.set('foo.bar', 'value')
// same as...
Murmur.config.scope('foo').set('bar', 'value')
```

Here is the list of default values:

<div class="table-responsive border border-top-0">
  <table class="table table-sm table-striped text-nowrap m-0">
    <tr v-for="(value, key) in config">
      <td>    
        <button class="btn btn-sm btn-info" @click="copyText(key)">
          <fa icon="paste" class="mr-1" />
        </button>
      </td>
      <td class="align-middle">
        <code>{{ key }}</code>
      </td>
      <td class="small text-monospace text-muted align-middle">
        {{ value }}
      </td>
    </tr>
  </table>
</div>

<script>
  import config from '@/config.default'
  import { copyText } from '@/utils/clipboard'  

  export default {
    data () {
      return {
        config
      }
    },
    methods: {
      copyText
    }
  }
</script>
