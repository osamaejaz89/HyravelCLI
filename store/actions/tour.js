import Tour from "../../models/tour";
import * as firebase from "firebase";
import TourBook from "../../models/booktour";

export const FETCH_TOUR = "FETCH_TOUR";
export const BOOK_TOUR = "BOOK_TOUR"
export const FETCH_BOOK_TOUR = "FETCH_BOOK_TOUR"

export const fetchTour = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://hyravelproject.firebaseio.com/tour.json"
    );

    const resData = await response.json();
    const loadedTours = [];

    for (const key in resData) {
      loadedTours.push(
        new Tour(
          key,
          resData[key].source,
          resData[key].destination,
          resData[key].description,
          resData[key].url
        )
      );
    }
    dispatch({
      type: FETCH_TOUR,
      tours: loadedTours,
    });
  };
};
export const fetchbookTour = () => {
  const userId = firebase.auth().currentUser.uid;
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/tourbook/${userId}.json`
    );

    const resData = await response.json();
    const loadedBookTours = [];

    for (const key in resData) {
      loadedBookTours.push(
        new TourBook(
          key,
          resData[key].source,
          resData[key].destination,
          resData[key].description,
          resData[key].displayName,
          resData[key].user_id,
          resData[key].status,
        )
      );
    }
    dispatch({
      type: FETCH_BOOK_TOUR,
      booktours: loadedBookTours,
    });
  };
};
export const bookTour = (
  source,
  destination,
  description,
) => {
  return async (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid;
    const displayName = firebase.auth().currentUser.displayName;
    const status = 'pending'
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/tourbook/${userId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          user_id: userId,
          source,
          destination,
          description,
          status
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: BOOK_TOUR,
      bookData: {
        displayName,
        tour_id: resData.name,
        source,
        destination,
        description,
        status
      },
    });
  };
};
