import moment from "moment";
import VueMomentLib from "@/main";
import { mount, createLocalVue } from "@vue/test-utils";

const options = { moment };

describe("vueMomentLib", () => {
  test("Should register all filters when installed", () => {
    const localVue = createLocalVue();
    const filter = jest.fn();
    localVue.filter = filter;
    VueMomentLib.install(localVue, options);

    // Test if all filters were registered
    expect(filter).toBeCalledWith("moment", expect.any(Function));
    expect(filter).toBeCalledWith("time", expect.any(Function));
    expect(filter).toBeCalledWith("unix", expect.any(Function));
    expect(filter).toBeCalledWith("utc", expect.any(Function));
    expect(filter).toBeCalledWith("zone", expect.any(Function));
    expect(filter).toBeCalledWith("duration", expect.any(Function));

    // Test how many times filter got registered
    expect(filter).toHaveBeenCalledTimes(6);
  });

  test("Should register all services to components and global services when installed", () => {
    const localVue = createLocalVue();
    localVue.use(VueMomentLib, options);

    const time = options.moment;
    const { unix, utc, parseZone, duration, isDuration } = time;
    expect(localVue.moment).toEqual(time);
    expect(localVue.time).toEqual(time);
    expect(localVue.unix).toEqual(unix);
    expect(localVue.utc).toEqual(utc);
    expect(localVue.zone).toEqual(parseZone);
    expect(localVue.duration).toEqual(duration);
    expect(localVue.isDuration).toEqual(isDuration);
    expect(localVue.prototype.$moment).toEqual(time);
    expect(localVue.prototype.$time).toEqual(time);
    expect(localVue.prototype.$unix).toEqual(unix);
    expect(localVue.prototype.$utc).toEqual(utc);
    expect(localVue.prototype.$zone).toEqual(parseZone);
    expect(localVue.prototype.$duration).toEqual(duration);
    expect(localVue.prototype.$isDuration).toEqual(isDuration);
  });

  test("Should call the right function with right parameter when using filters", () => {
    const localVue = createLocalVue();
    localVue.use(VueMomentLib);
    const wrapper = mount(
      {
        template: "<div>{{ summer | time('YYYY/MM/DD').format('MMDD') }}</div>",
        data() {
          return {
            summer: "2018/07/04"
          };
        }
      },
      {
        localVue
      }
    );
    expect(wrapper.text()).toBe("0704");
  });

  test("Should call the right function with right parameter when using component api", () => {
    const localVue = createLocalVue();
    localVue.use(VueMomentLib);
    const wrapper = mount(
      {
        template: "<div>{{ time.format('MMDD') }}</div>",
        computed: {
          time() {
            return this.$time("2018/12/04", "YYYY/MM/DD");
          }
        }
      },
      {
        localVue
      }
    );
    expect(wrapper.text()).toBe("1204");
  });
});
