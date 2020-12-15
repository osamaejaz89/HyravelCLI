import Bikes from "../../models/bikes";

import { FETCH_BIKES } from "../actions/bikes";

const initialState = {
  bikes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BIKES:
      return {
        bikes: action.bikes,
      };
    default:
      return state;
  }
};
