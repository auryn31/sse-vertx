import store from './store';

declare var EventSource: any;

export default class Timeloader {

  public static loadTime() {
    const evtSource = new EventSource('http://localhost:8080/time');
    evtSource.addEventListener('time', function(e: any) {
      store.commit('setDate', e.data);
    }, false);
  }
}
