import Vue from "vue";
import * as Vuex from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { State } from "./state";
import Car from "../models/car";

Vue.use(Vuex);

type Context = Vuex.ActionContext<State, State>;

const state: State = {
  splashScreenActive: false,
  loaderActive: false,
  auth: {
    isLoggedIn: false
  },
  cars: []
};

const getters = {
  getSplashScreenState(state: State) {
    return state.splashScreenActive;
  },
  getLoaderState(state: State) {
    return state.loaderActive;
  },
  getLoggedInState(state: State) {
    return state.auth.isLoggedIn;
  },
  getCars(state: State) {
    return state.cars;
  }
};

const mutations = {
  setSplashScreenVisibility(state: State, splashScreenState: boolean) {
    state.splashScreenActive = splashScreenState;
  },
  setLoaderVisibility(state: State, loaderState: boolean) {
    state.loaderActive = loaderState;
  },
  setLoggedInState(state: State, loggedInState: boolean) {
    state.auth.isLoggedIn = loggedInState;
  },
  addCar(state: State, car: Car) {
    state.cars.push(car);
  }
};

const actions = {
  loginUser(context: Context, loggedInState: boolean) {
    commitLoggedInState(context, loggedInState);
  },
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
export const readSplashScreenVisibility = read(getters.getSplashScreenState);
export const readLoaderVisibility = read(getters.getLoaderState);
export const readLoggedInState = read(getters.getLoggedInState);
export const readCarsFromSse = read(getters.getCars);

/*************************************************/
/* MUTATIONS */
/*************************************************/
export const commitSplashScreenVisibility = commit(mutations.setSplashScreenVisibility);
export const commitLoaderVisibility = commit(mutations.setLoaderVisibility);
export const commitLoggedInState = commit(mutations.setLoggedInState);
export const commitAsyncCar = commit(mutations.addCar);

/*************************************************/
/* ACTIONS */
/*************************************************/
// export const dispatchLoginUser = dispatch(actions.loginUser);
