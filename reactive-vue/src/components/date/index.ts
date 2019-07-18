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
  readCarsCounter, 
  readCarsFromSse
} from "../../store/store";
import Timeloader from "../../services/timeloader";

@Component({
  mixins: [template],
  components: {}
})
export default class DateVue extends Vue {
  cars = readCarsFromSse(store);
  date = ""
  testString = 1
  mounted() {
    Timeloader.loadTime();
  }
  
  computed() {
    this.date = readDate(store);
    this.testString = readCarsCounter(store);

  }
}
