<p align="center">
<a href="https://icij.github.io/murmur/">
  <img src="https://github.com/ICIJ/murmur/raw/master/lib/assets/images/murmur-dark.png" width="158px">
</a>
<br>
Murmur is <a href="https://icij.org">ICIJ</a>'s Design System for Bootstrap 4 and Vue.js
<br>
[![CircleCI](https://circleci.com/gh/ICIJ/murmur.svg?style=svg)](https://circleci.com/gh/ICIJ/murmur)
</p>

## Installation guide

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

Now all components will be globally available in your app.
[Read the documentation](https://icij.github.io/murmur/) to know how to use them.

## Build Setup

``` bash
# install dependencies
yarn

# serve documentation with hot reload at localhost:8080
yarn serve

# build library and documentation for production with minification
yarn build

# build library for production with minification
yarn build:lib

# build documentation for production with minification
yarn build:docs

# deploy the doc on Github Pages
yarn deploy

# publish a vestion of the package on NPM registry
yarn publish
```
