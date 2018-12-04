---
title: ICIJ Design System
description: A beautiful Design System for Bootstrap 4 and Vue.js
---

The <a href="https://icij.org">International Consortium of Investigative Journalists</a>
aims to build efficient and innovative tools for the biggest cross-border investigations in the world.
In order to build stable, consistent and user-friendly webapps, our team
started to define common components between projects, as well as best practices and
guidelines.

### Install the package

If you are using module bundlers such as Webpack or Rollup, you might need to include the package into your project.
To get started, use NPM or Yarn to get latest version of **icij-vue-collection**.

```bash
# with NPM:
npm i icij-vue-collection

# or with Yarn:
yarn add icij-vue-collection
```
Then, register all the components in your app entry point:

```js
import Vue from 'vue'
import Collection from 'icij-vue-collection'

Object.keys(Collection.components).forEach(key => {
  Vue.component(key, Collection.components[key])
})
```

### Individual components

```js
import { EmbedForm } from 'icij-vue-collection'
```
