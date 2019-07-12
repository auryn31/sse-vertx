import Vue from "vue";
import {
  Component
} from "vue-property-decorator";
import template from "./cars.vue";
import Car from "../../models/car";
import {
  store
} from "../../store";
import {
  readCarsFromSse
} from "../../store/store";
import Carloader from "../../services/carloader";

@Component({
  mixins: [template],
  components: {}
})
export default class Cars extends Vue {
  msg: string = "List of Cars";
  loading_text: string = "Load Cars";
  carsSse: Array < Car > = readCarsFromSse(store);
  loadcars(): void {
    Carloader.loadCarsFromServerEvent();
  }
}
