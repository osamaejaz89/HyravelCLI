import * as firebase from "firebase";
import Request from "../../models/request";

export const BOOK_REQUEST = "BOOK_REQUEST";


export const bookRequest = (
  requestId,
  status,
) => {
  return async (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid;
    const displayName = firebase.auth().currentUser.displayName;
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/DriversRequests.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          requestId: userId,
          status
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: BOOK_REQUEST,
      requestData: {
        displayName,
        requestId: resData.name,
        status
      },
    });
  };
};

