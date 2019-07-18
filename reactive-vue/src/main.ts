import "./polyfill";
import "./localisation";

import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as Logger from "js-logger";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

import Config from "./config.json";

import { store } from "./store";

import router from "./router";

import "./style.scss";
import template from "./main.vue";

let logLevel = (Config.debug ? Logger.DEBUG : Logger.ERROR);
Logger.useDefaults();
Logger.setLevel(logLevel);

Vue.config.errorHandler = function (err, vm, info) {
  Logger.error("Vue error: ", err);
};

Vue.use(Vuetify);

@Component({
  mixins: [template],
  store,
  components: {
  },
  router
})
class App extends Vue {
  mounted () {
    Logger.log("mounted");
  }
}

window.onerror = function (errorMsg, url, lineNo, colNo, error) {
};

export const app = new App().$mount("#app");
