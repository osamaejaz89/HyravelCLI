import Tour from "../../models/tour";
import * as firebase from "firebase";

export const FETCH_TOUR = "FETCH_TOUR";

export const fetchTour = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://hyravelproject.firebaseio.com/tour.json"
    );

    const resData = await response.json();
    const loadedTours = [];

    for (const key in resData) {
      loadedTours.push(
        new Tour(
          key,
          resData[key].id,
          resData[key].source,
          resData[key].destination,
          resData[key].description,
          resData[key].url,
        )
      );
    }

    dispatch({
      type: FETCH_TOUR,
      tours: loadedTours,
    });
  };
};
