import momentJs from "moment";

const LibraryModule = {
  install(Vue, options) {
    // default to moment js lib
    let moment = momentJs;

    // if moment is passed as an option
    if (options && options.moment) {
      moment = options.moment;
    }

    /* eslint-disable */
    // make moment accessible in components with this.$moment
    Vue.prototype.$moment = moment;
    Vue.prototype.$duration = moment.duration;

    // declare this moment instance as a global function for vuex, etc
    Vue.moment = moment;
    /* eslint-enable */

    // filter to wire moment
    Vue.filter("moment", (value, isUtc = false, ...args) => {
      // add utc support on moment(true)
      const filterMoment = isUtc ? moment.utc : moment;
      return filterMoment(value, args);
    });

    // filter to wire moment duration
    Vue.filter("duration", (value, unit) => {
      return moment.duration(value, unit);
    });
  }
};

// Export library
export default LibraryModule;
