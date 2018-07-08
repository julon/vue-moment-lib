import Vue from "vue";
import defaultMoment from "moment";

Vue.config.productionTip = false;

const LibraryModule = {
  install(Vue, options) {
    // set to custom moment instance else to defaultMoment
    const moment = (options || {}).moment || defaultMoment || window.moment;

    if (moment) {
      const { unix, utc, parseZone, duration, isDuration } = moment;

      // expose moment api to components and globals services such as vuex, etc
      Vue.prototype.$moment = Vue.moment = moment;
      Vue.prototype.$time = Vue.time = moment; // alias to moment
      Vue.prototype.$unix = Vue.unix = unix;
      Vue.prototype.$utc = Vue.utc = utc;
      Vue.prototype.$zone = Vue.zone = parseZone;
      Vue.prototype.$duration = Vue.duration = duration;
      Vue.prototype.$isDuration = Vue.isDuration = isDuration;

      // filter to parse time
      const timeParse = (value, ...args) => moment(value, ...args);
      Vue.filter("moment", timeParse);
      Vue.filter("time", timeParse); // alias to moment
      // filter to parse unix timestamp
      Vue.filter("unix", (value, ...args) => unix(value, ...args));
      // filter to parse utc time
      Vue.filter("utc", (value, ...args) => utc(value, ...args));
      // filter to parse zone-kept time
      Vue.filter("zone", (value, ...args) => parseZone(value, ...args));
      // filter to parse duration
      Vue.filter("duration", (value, unit) => duration(value, unit));
    } else {
      throw new Error("A momentJS instance was not found.");
    }
  }
};

// Automatically register library if Vue is available globally
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(LibraryModule);
}

export default LibraryModule;
