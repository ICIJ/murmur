---
title: Customize Boostrap
description: Use pre-configured variables to build Boostrap.
order: 20
---

This guide comes with a set of pre-configured SCSS variables that can be used in
conjunction with Boostrap. It is **not mandatory** to uses a custom build of Boostrap
with these variables. Yet some components might have a better display with this configuration.

```scss
// You can easily override every variables
$link-color: #c10448;

// Then, simply import the variables before you import Bootstrap sources
@import 'icij-vue-collection/lib/styles/variables.scss';
@import 'node_modules/bootstrap/scss/bootstrap';
```


### Variables

Here is a the variables define in lib/styles/variables.scss:

<pre v-highlightjs><code class="scss">{{ rawVariables }}</code></pre>

<script>
  import rawVariables from '!!raw-loader!@/styles/variables.scss'

  export default {
    data () {
      return {
        rawVariables
      }
    }
  }
</script>
