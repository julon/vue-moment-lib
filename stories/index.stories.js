import { storiesOf } from "@storybook/vue";

storiesOf("moment", module)
  .add("calendar()", () => ({
    template: `<div>{{ Date.now() | moment().calendar() }}</div>`
  }))
  .add("fromNow()", () => ({
    template: `<div>{{ Date.now() | moment().fromNow() }}</div>`
  }))
  .add("format('YYYY')", () => ({
    template: `<div>{{ Date.now() | moment().format("YYYY") }}</div>`
  }))
  .add("utc format('YYYY')", () => ({
    template: `<div>{{ Date.now() | moment(true).format("YYYY") }}</div>`
  }));

storiesOf("duration", module)
  .add('200 | duration("minutes").humanize()', () => ({
    template: `<div>{{ 200 | duration("minutes").humanize() }}</div>`
  }))
  .add("1500 | duration().toJSON()", () => ({
    template: `<div>{{ 1500 | duration().toJSON() }}</div>`
  }));
