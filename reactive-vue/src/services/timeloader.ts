import { store } from "../store";
import {
  commitDate
} from "../store/store";
import moment from "moment";

declare var EventSource: any;

export default class Timeloader {

  public static loadTime() {
    let evtSource = new EventSource("http://localhost:8080/time");
    evtSource.addEventListener("time", function(e: any) {
      console.log(e.data);
      commitDate(store, moment());
    }, false);

    evtSource.addEventListener("done", function(e: any) {
      evtSource.close();
    }, false);
  }
}
