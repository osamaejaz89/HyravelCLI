import {
    FETCH_CURRENTUSER,
    UPDATE_CURRENTUSER,
    FETCH_USERS,
  } from '../actions/currentUser';
  
  const initialState = {
    users: [],
    currentUser: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CURRENTUSER:
        return {
          currentUser: action.userData,
        };
  
      case FETCH_USERS:
        return {
          users: action.users,
        };
  
      case UPDATE_CURRENTUSER:
        const updatedCurrentUser = [...state.currentUser];
        updatedCurrentUser.deviceToken = action.deviceToken;
  
        return {
          ...state,
          currentUser: updatedCurrentUser,
        };
    }
    return state;
  };
  