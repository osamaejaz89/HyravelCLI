import * as firebase from 'firebase';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) =>
        dispatch({
          type: SIGNIN,
          token: token,
          userId: firebase.auth().currentUser.uid,
        }),
      );
  };
};


export const signup = (username, email, password, token) => {
  return async (dispatch) => {
    //const userId = firebase.auth().currentUser.uid;
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/users.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          returnSecureToken: true
        }),
      },
    );

    const resData = await response.json();
    console.log(resData);
    //  dispatch({
    //   type: SIGNUP,
    //   userData: {
    //     fname,
    //     lname,
    //     email,
    //     phNum
    //   }
    // });
  };
};


// export const signup = (username,email, password) => {
//   return async dispatch => {
//     const response = await fetch(
//       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpdfiIp41H9IrYUtjA9ked_wqEnNEEfkQ',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username: username,
//           email: email,
//           password: password,
//           returnSecureToken: true
//         })
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }

//     const resData = await response.json();
//     console.log(resData);
//     dispatch({ type: SIGNUP });
//   };
// };
