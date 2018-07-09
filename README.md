# vue-moment-lib

![Jest](https://img.shields.io/badge/Jest-^22.0.4-blue.svg)
![Vue](https://img.shields.io/badge/Vue-^2.5.16-brightgreen.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Npm badge](https://img.shields.io/npm/v/vue-moment-lib.svg)
[![Build Status](https://travis-ci.org/julon/vue-moment-lib.svg?branch=master)](https://travis-ci.org/julon/vue-moment-lib)
[![Greenkeeper badge](https://badges.greenkeeper.io/julon/vue-moment-lib.svg)](https://greenkeeper.io/)

> A Vue.js 2.0 MomentJS library

> Make momentjs available in your template and Vue instance. Since it just try to map raw js function, api is mostly same as[momentjs.com](https://momentjs.com/docs). Making it easier to use in your Vue.js projects.

> It added moment parse api as filters, component and vue instance moment functions mapping.

## Installation

```
npm install --save moment vue-moment-lib
```

vue-moment-lib can be used as a module in CommonJS environments.

When in non-modular environment, vue-moment-lib will register all the components to vue by itself.</p>

### ES6

```js
//
// Register the whole module with vue
//
import VueMomentLib from "vue-moment-lib";

// Install this library
Vue.use(VueMomentLib);
```

### CommonJS

```js
//
// Register the whole module with vue
//
var Vue = require("vue");
var VueMomentLib = require("vue-moment-lib").default;

// Install this library
Vue.use(VueMomentLib);
```

### Browser

```html
<script src="path/to/vue/vue.min.js"></script>
<script src="path/to/moment/moment.min.js"></script>
<script src="path/to/vue-moment-lib/dist/vue-moment-lib.umd.min.js"></script>
<!-- Filter and moment are registered globally -->
```

### After that, you can use the duration and moment filters in your templates, api is slightly different as the first argument is passed through pipe:

```html
<!-- first argument of moment filter is a parameter for parsing to UTC, it is set by default to false so it is optional when you use default parsing -->

<!-- Local format -->
<span>{{ Date.now() | moment().format("YYYY") }}</span>

<!-- time alias, isLocal + custom parsing + custom format -->
<span>{{ "11-14-2018" | time("MM-DD-YYYY").format("YYYY") }}</span>

<!--  Unix timestamp to utc -->
<span>{{ 1318781876 | unix().utc() }}</span>

<!-- Full date -->
<span>{{ Date.now() | utc().format("LLLL") }}</span>

<!-- -780 -->
<span>{{ "2013-01-01T00:00:00-13:00" | zone().utcOffset() }}</span>

<!-- a few seconds -->
<span>{{ 500 | duration().humanize() }}</span>

<!-- is not a duration -->
<span>{{ new Date() | isDuration }}</span>
```

### And also, use the component instance functions in your templates to really use the same apis as momentjs:

```html
<!-- Local format -->
<span>{{ $moment(Date.now()).format("YYYY") }}</span>

<!-- time alias, isLocal + custom parsing + custom format -->
<span>{{ $time("11-14-2018", "MM-DD-YYYY").format("YYYY") }}</span>

<!--  Unix timestamp to utc -->
<span>{{ $unix(1318781876).utc() }}</span>

<!-- Full date -->
<span>{{ $utc(Date.now()).format("LLLL") }}</span>

<!-- -780 -->
<span>{{ $zone("2013-01-01T00:00:00-13:00").utcOffset() }}</span>

<!-- a few seconds -->
<span>{{ $duration(500).humanize() }}</span>

<!-- is not a duration -->
<span>{{ $isDuration(new Date()) }}</span>
```

### or

```js
// in your components
computed: {
  thisYear () {
    // return this.$moment(Date.now()).format()
    return this.$time(Date.now()).format("YYYY") // moment (alias)
  },
  unixUtc () {
    return this.$unix(1318781876).utc(); // moment.unix
  },
  utc () {
    return this.$utc(Date.now()).format("LLLL"); // moment.utc
  },
  parseZone () {
    return this.$zone("2013-01-01T00:00:00-13:00").utcOffset(); // moment.parseZone
  },
  humanize () {
    return this.$duration(500).humanize(); // moment.duration
  },
  isDuration () {
    return this.$isDuration(new Date()); // moment.isDuration
  }
}

// it is also registered as a global function in the Vue instance
// so you can do in vuex store or everywhere else to retrieve the same moment instance you initialized
import Vue from 'vue'

const thisYear = Vue.time(Date.now()).format("YYYY"); // alias to moment
const unixUtc = Vue.unix(1318781876).utc();
const utc = Vue.utc(Date.now()).format("LLLL");
const parseZone = Vue.zone("2013-01-01T00:00:00-13:00").utcOffset();
const humanize = Vue.duration(500).humanize();
const isDuration = Vue.isDuration(new Date());
```

### Custom moment instances

```js
import yourMoment from "moment";
import VueMomentLib from "vue-moment-lib";

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
