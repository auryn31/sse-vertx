import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import Cars from "../../components/cars";
import DateVue from "../../components/date";
import template from "./home.vue";

@Component({
  mixins: [template],
  components: {
    Cars,
    DateVue
  }
})
export default class Home extends Vue {
}
