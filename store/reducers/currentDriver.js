import {
    FETCH_CURRENTDRIVER,
    UPDATE_CURRENTDRIVER,
    FETCH_DRIVERS,
  } from '../actions/currentDriver';
  
  const initialState = {
    drivers: [],
    currentDriver: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CURRENTDRIVER:
        return {
          currentDriver: action.driverData,
        };
  
      case FETCH_DRIVERS:
        return {
          drivers: action.drivers,
        };
  
      case UPDATE_CURRENTDRIVER:
        const updatedCurrentDriver = [...state.currentDriver];
        updatedCurrentDriver.deviceToken = action.deviceToken;
  
        return {
          ...state,
          currentDriver: updatedCurrentDriver,
        };
    }
    return state;
  };
  