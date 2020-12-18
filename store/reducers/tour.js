import Tour from "../../models/tour";

import { FETCH_TOUR } from "../actions/tour";

const initialState = {
  tour: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOUR:
      return {
        tours: action.tours,
      };
    default:
      return state;
  }
};
