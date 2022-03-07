import Driver from "../../models/drivers";

import { FETCH_DRIVER } from "../actions/drivers";

const initialState = {
  drivers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVER:
      return {
        drivers: action.drivers,
      };
    default:
      return state;
  }
};
