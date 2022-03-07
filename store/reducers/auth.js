import {SIGNIN, SIGNUP, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        token: action.token,
        user: action.userId,
      };

    case LOGOUT: {
      state = undefined;
    }

    default:
      return state;
  }
};
