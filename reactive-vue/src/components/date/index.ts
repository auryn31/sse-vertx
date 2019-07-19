import Vue from "vue";
import {
  Component
} from "vue-property-decorator";
import template from "./date.vue";
import {
  store
} from "../../store";
import {
  readDate,
  readCarsFromSse
} from "../../store/store";
import Timeloader from "../../services/timeloader";

@Component({
  mixins: [template],
  store,
  components: {}
})
export default class DateVue extends Vue {

  cars = readCarsFromSse(store);

  get date() {
    return readDate(store);
  }

  mounted() {
    Timeloader.loadTime();
  }

}
