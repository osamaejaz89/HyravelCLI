import Driver from "../../models/driver";

export const FETCH_CURRENTDRIVER = 'FETCH_CURRENTDRIVER';
export const UPDATE_CURRENTDRIVER = 'UPDATE_CURRENTDRIVER';
export const FETCH_DRIVERS = 'FETCH_DRIVERS';

export const FetchCurrentDriver = (driverId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/Drivers/${driverId}.json`,
    );

    const resData = await response.json();
    dispatch({type: FETCH_CURRENTDRIVER, driverData: resData});
  };
};

export const FetchDrivers = () => {
  return async (dispatch) => {
    const response = await fetch('https://hyravelproject.firebaseio.com/Drivers.json');

    const resData = await response.json();

    const loadedDrivers = [];

    for (const key in resData) {
      loadedDrivers.push(
        new Driver(
          key,
          resData[key].email,
          resData[key].password,
          resData[key].username
        )
      );
    }
    dispatch({type: FETCH_DRIVERS, drivers: loadedDrivers});
  };
};

export const UpdateCurrentDriver = (
  driverId,
  email,
  username,
  deviceToken,
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/Drivers/${driverId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          deviceToken,
        }),
      },
    );
  };
};
