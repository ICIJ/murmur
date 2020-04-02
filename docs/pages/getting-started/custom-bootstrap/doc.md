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
@import '@icij/murmur/lib/styles/variables.scss';
@import 'node_modules/bootstrap/scss/bootstrap';
// Optional but recommended: Bootstrap Vue CSS additions
@import 'node_modules/bootstrap-vue/dist/bootstrap-vue.css';
```

Here are all the variables defined in <repository-link path="lib/styles/variables.scss">lib/styles/variables.scss</repository-link>:

<pre class="bg-dark p-3"><code v-html="rawVariables"></code></pre>

<script>
import rawVariables from '!!highlight-loader?lang=scss!@styles/variables.scss'

export default {
  data () {
    return {
      rawVariables
    }
  }
}
</script>
