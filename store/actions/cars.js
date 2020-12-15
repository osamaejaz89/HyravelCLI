import Cars from "../../models/cars";
import * as firebase from "firebase";

export const FETCH_CARS = "CARS";

export const fetchCar = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://hyravelproject.firebaseio.com/CarTable.json"
    );

    const resData = await response.json();
    const loadedCars = [];

    for (const key in resData) {
      loadedCars.push(
        new Cars(
          resData[key].car_Brand,
          resData[key].car_ID,
          resData[key].car_capacity,
          resData[key].car_category,
          resData[key].car_charges_driver,
          resData[key].car_charges_wd,
          resData[key].car_color,
          resData[key].car_model_year,
          resData[key].car_name,
          resData[key].car_number,
          resData[key].car_plate_number,
          resData[key].url
        )
      );
    }

    dispatch({
      type: FETCH_CARS,
      cars: loadedCars,
    });
  };
};
