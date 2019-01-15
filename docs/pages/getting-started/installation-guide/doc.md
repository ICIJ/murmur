---
title: Installation Guide
description: Murmur is ICIJ's Design System for Bootstrap 4 and Vue.js
order: 10
---

The <a href="https://icij.org">International Consortium of Investigative Journalists</a>
aims to build efficient and innovative tools for the biggest cross-border investigations in the world.
In order to build stable, consistent and user-friendly webapps, our team
started to define common components between projects, as well as best practices and
guidelines.

### Install the package

If you are using module bundlers such as Webpack or Rollup, you might need to include the package into your project.
To get started, use NPM or Yarn to get latest version of **@icij/murmur**.

```bash
# with NPM:
npm i @icij/murmur

# or with Yarn:
yarn add @icij/murmur
```
Then, register Murmur as a pluggin in your app entry point:

```js
import Vue from 'vue'
import Murmur from '@icij/murmur'

Vue.use(Murmur)
```

Now all components will be globally available in your app. Murmur also expose a
configuration object to handle common configuration option. To customize the
default options please refer to the [dedicated page](#/utilities/config).

### Individual components

An alternative to installing all components with a pluggin is to import only
a specific component.

```js
import { EmbedForm } from '@icij/murmur'

Vue.component('component-name', {  
  components: {
    EmbedForm
  }
})
```
