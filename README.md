# vue-moment-lib

![Rollup badge](https://img.shields.io/badge/Rollup-^0.53.3-ff69b4.svg)
![Jest](https://img.shields.io/badge/Jest-^22.0.4-blue.svg)
![Vue](https://img.shields.io/badge/Vue-^2.5.13-brightgreen.svg)
![Storybook](https://img.shields.io/badge/Storybook-^3.3.3-ff70a3.svg)
![Commitizen](https://img.shields.io/badge/Commitizen-enabled-brightgreen.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Npm badge](https://img.shields.io/npm/v/vue-moment-lib.svg)
[![Build Status](https://travis-ci.org/julon/vue-moment-lib.svg?branch=master)](https://travis-ci.org/julon/vue-moment-lib)
[![Greenkeeper badge](https://badges.greenkeeper.io/julon/vue-moment-lib.svg)](https://greenkeeper.io/)

> A Vue.js 2.0 MomentJS library

> It just wired moment api to custom filters in Vue : moment() and duration().
> And also inject moment as **this.$moment** in your components.
> So you have complete access to the whole api of moment in your templates and also the documentation from [momentjs.com](https://momentjs.com/docs).
> Just keep in mind that the left value of the filter is the first argument in any of the moment and duration functions.
> You are good to go now :)

> Generated using [vue-cli-template-library](https://github.com/julon/vue-cli-template-library).

## Installation
```
npm install vue-moment-lib
```
vue-moment-lib can be used as a module in both CommonJS and ES modular environments.

When in non-modular environment, vue-moment-lib will register all the components to vue by itself.</p>

### ES6
```js
//
// Register the whole module with vue
//
import VueMomentLib from 'vue-moment-lib';

// Install this library
Vue.use(VueMomentLib);
```

### CommonJS
```js
//
// Register the whole module with vue
//
var Vue = require('vue');
var VueMomentLib = require('vue-moment-lib');

// Install this library
Vue.use(VueMomentLib);
```

### Browser

```html
<script src="path/to/vue/vue.min.js"></script>
<script src="path/to/moment/moment.min.js"></script>
<script src="path/to/vue-moment-lib/dist/vue-moment-lib.min.js"></script>
<!-- Filter and moment are registered globally -->
```

### After that, you can use the duration and moment filters in your templates:

```html
<!-- Local format -->
<span>{{ Date.now() | moment().format("YYYY") }}</span>

<!-- first argument of moment filter is a parameter for parsing to UTC, it is set by default to false so it is optional when you use default parsing -->

<!-- isLocal + custom parsing + custom format -->
<span>{{ Date.now() | moment(false, "12-25-1995", "MM-DD-YYYY").format("YYYY") }}</span>

<!-- isUTC + custom format -->
<span>{{ Date.now() | moment(true).format("YYYY") }}</span>

<!-- Duration is supported -->
<span>{{ 500 | duration("minutes").humanize() }}</span>

<!-- 1500 milliseconds -->
<span>{{ 1500 | duration("milliseconds").milliseconds() }}</span>
```
Raw JS for moments `moment(Date.now()).format("YYYY")` becomes `Date.now() | moment().format("YYYY")`

Raw JS for duration `moment.duration(500).humanize()` becomes `500 | duration().humanize()`

```js
// in your components
methods: {
  now () {
    return this.$moment(Date.now()).format()
  }
}

// it is also register as a global function in the Vue instance
// so you can do in vuex store or everywhere else to retrieve the same moment instance you initialized
import Vue from 'vue'
const thisYear = Vue.moment(Date.now()).format("YYYY")
```

### Custom moment instances

```js
import yourMoment from 'moment'
import VueMomentLib from 'vue-moment-lib';

//
// customize your moment instance here (locales, config, etc)
//

// Install this library with custom moment instance
Vue.use(VueMomentLib, { moment: yourMoment });
```

## Changelog

See the GitHub [release history](https://github.com/julon/vue-moment-lib/releases).

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).
