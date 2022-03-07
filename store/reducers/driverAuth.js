import {SIGNIN, SIGNUP, LOGOUT} from '../actions/driverAuth';

const initialState = {
  token: null,
  driverId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        token: action.token,
        driver: action.driverId,
      };

    case LOGOUT: {
      state = undefined;
    }

    default:
      return state;
  }
};
