import * as firebase from 'firebase'
import Request from "../../models/request";

export const BOOK_REQUEST = "BOOK_REQUEST";
export const FETCH_REQUEST = "FETCH_REQUEST";

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
          resData[key].requestId,
          resData[key].driverCharges,
          resData[key].days,
          resData[key].model,
          resData[key].description,
          resData[key].book_fromdate,
          resData[key].book_todate,
          resData[key].book_cnic,
          resData[key].book_description,
          resData[key].status,
        )
      );
    }
    dispatch({
      type: FETCH_REQUEST,
      request: loadedRequest,
      currentRequest: loadedRequest.filter((req) => req.status == 'Pending'),
    });
  };
};
export const bookRequest = (
        driverCharges,
        days,
        model,
        description,
        book_fromdate,
        book_todate,
        book_cnic,
        book_description,
        status
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
          requestId: userId,
          driverCharges,
          days,
          model,
          description,
          book_fromdate,
          book_todate,
          book_cnic,
          book_description,
          status
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: BOOK_REQUEST,
      requestData: {
        requestId: userId,
        driverCharges,
        days,
        model,
        description,
        book_fromdate,
        book_todate,
        book_cnic,
        book_description,
        status
      },
    });
  };
};

