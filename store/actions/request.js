import * as firebase from 'firebase'
import Request from "../../models/request";

export const BOOK_REQUEST = "BOOK_REQUEST";
export const FETCH_REQUEST = "FETCH_REQUEST";
export const UPDATE_REQUEST = "UPDATE_REQUEST"

export const fetchRequest = () => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/DriversRequests.json`
    );
    const resData = await response.json();
    const loadedRequest = [];

    for (const key in resData) {
      loadedRequest.push(
        new Request(
          key,
          resData[key].status,
          resData[key].email,
          resData[key].username,
          resData[key].userId,
          resData[key].driverId,
          resData[key].driverName,
          resData[key].conversationId,
        )
      );
    }
    dispatch({
      type: FETCH_REQUEST,
      request: loadedRequest,
    });
  };
};
export const bookRequest = (
        email,
        username,
        driverId,
        driverName
) => {
  return async (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid;
    const status = 'pending';
    const conversationId = '';
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/DriversRequests.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          email: firebase.auth().currentUser.email,
          username: firebase.auth().currentUser.displayName,
          userId:userId,
          driverId,
          driverName,
          conversationId
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: BOOK_REQUEST,
      requestData: {
        requestId: resData.name,
        status,
        email,
        username,
        userId: userId,
        driverId,
        driverName,
        conversationId
      },
    });
  };
};

export const updateRequest = (
  requestId,
  status,
  conversationId,
  email,
  username,
  userId,
  driverId,
  driverName,
) => {
  return async (dispatch) => {
    await fetch(
      `https://hyravelproject.firebaseio.com/requests/${requestId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          status,
          email,
          username,
          userId,
          driverId,
          driverName,
          conversationId,
        }),
      },
    );

    dispatch({
      type: UPDATE_REQUEST,
      requestData: {
        requestId: requestId,
        status,
        email,
        userId,
        username,
        driverId,
        driverName,
        conversationId,
      },
    });
  };
};
