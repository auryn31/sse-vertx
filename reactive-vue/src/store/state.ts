import Car from "../models/car";

export interface State {
  date: string,
  cars: Array<Car>
}
