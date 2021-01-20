import Bikes from "../../models/bikes";
import * as firebase from "firebase";

export const FETCH_BIKES = "BIKES";

export const fetchBike = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://hyravelproject.firebaseio.com/BikeTable.json"
    );

    const resData = await response.json();
    const loadedBikes = [];

    for (const key in resData) {
      loadedBikes.push(
        new Bikes(
          resData[key].Bike_Brand,
          resData[key].Bike_ID,
          resData[key].Bike_category,
          resData[key].Bike_charges,
          resData[key].Bike_model_year,
          resData[key].Bike_name,
          resData[key].Bike_plate_number,
          resData[key].url
        )
      );
    }

    dispatch({
      type: FETCH_BIKES,
      bikes: loadedBikes,
    });
  };
};
