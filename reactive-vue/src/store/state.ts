import Car from "../models/car";

export interface State {
  date: DateString,
  cars: Array<Car>
}

export interface DateString {
  date: string
}
