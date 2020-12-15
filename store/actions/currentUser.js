export const FETCH_CURRENTUSER = 'FETCH_CURRENTUSER';
export const UPDATE_CURRENTUSER = 'UPDATE_CURRENTUSER';
export const FETCH_USERS = 'FETCH_USERS';

export const FetchCurrentUser = (userId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/users/${userId}.json`,
    );

    const resData = await response.json();
    dispatch({type: FETCH_CURRENTUSER, userData: resData});
  };
};

export const FetchUsers = () => {
  return async (dispatch) => {
    const response = await fetch('https://hyravelproject.firebaseio.com/users.json');

    const resData = await response.json();
    dispatch({type: FETCH_USERS, users: resData});
  };
};

export const UpdateCurrentUser = (
  userId,
  email,
  username,
  deviceToken,
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/users/${userId}.json`,
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
