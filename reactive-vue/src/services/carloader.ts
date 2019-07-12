import { store } from "../store";
import {
  commitAsyncCar
} from "../store/store";

declare var EventSource: any;

export default class Carloader {

  public static loadCarsFromServerEvent() {
    let evtSource = new EventSource("http://localhost:8080/sse");
    evtSource.addEventListener("newCar", function(e: any) {
      commitAsyncCar(store, JSON.parse(e.data));
    }, false);

    evtSource.addEventListener("done", function(e: any) {
      evtSource.close();
    }, false);
  }
}
