import Vue from "vue";
import {
  Component
} from "vue-property-decorator";
import template from "./date.vue";
import {
  store, DateString
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
  date: DateString = readDate(this.$store);
  cars = readCarsFromSse(store);

  mounted() {
    Timeloader.loadTime();
  }

}
