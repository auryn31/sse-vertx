import Car from "../models/car";

export interface State {
  loaderActive: boolean;
  splashScreenActive: boolean;

  auth: {
    isLoggedIn: boolean;
  };

  cars: Array<Car>
}
