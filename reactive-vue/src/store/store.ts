import Vue from "vue";
import * as Vuex from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { State } from "./state";
import Car from "../models/car";
import moment, { Moment } from "moment";

Vue.use(Vuex);

type Context = Vuex.ActionContext<State, State>;

const state: State = {
  cars: [],
  date: "false",
  carsCounter: 0
};

const getters = {
  getCars(state: State) {
    return state.cars;
  },
  getDate(state: State) {
    return state.date;
  }, 
  getCarsCounter(state: State) {
    return state.carsCounter;
  }
};

const mutations = {
  addCar(state: State, car: Car) {
    state.carsCounter += 1
    state.cars.push(car);
  },
  setDate(state: State, date: Moment) {
    state.date = date.format("dd-MM-YYYY hh:mm:ss");
  }
};

const actions = {
};

export const createStore = () => new Vuex.Store<State>({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

const { read, commit, dispatch } = getStoreAccessors<State, State>("");

/*************************************************/
/* GETTERS */
/*************************************************/
export const readCarsFromSse = read(getters.getCars);
export const readDate = read(getters.getDate);
export const readCarsCounter = read(getters.getCarsCounter);

/*************************************************/
/* MUTATIONS */
/*************************************************/
export const commitAsyncCar = commit(mutations.addCar);
export const commitDate = commit(mutations.setDate);


