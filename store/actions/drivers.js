import Drivers from "../../models/drivers";
import * as firebase from "firebase";

export const FETCH_DRIVER = "FETCH_DRIVER";

export const fetchDriver = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://hyravelproject.firebaseio.com/DriverTable.json"
    );

    const resData = await response.json();
    const loadedDrivers = [];

    for (const key in resData) {
      loadedDrivers.push(
        new Drivers(
          key,
          resData[key].cnic,
          resData[key].contact_number,
          resData[key].driving_licence,
          resData[key].email,
          resData[key].name,
          resData[key].password,
          resData[key].status,
          resData[key].username
        )
      );
    }

    dispatch({
      type: FETCH_DRIVER,
      drivers: loadedDrivers,
    });
  };
};
