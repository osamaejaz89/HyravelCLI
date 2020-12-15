import * as firebase from "firebase";
import Book from "../../models/bookbike";

export const BOOK_BIKE = "BOOK_BIKE";
export const FETCH_BIKE = "FETCH_BIKE";

export const fetchBike = () => {
  return async (dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    const displayName = firebase.auth().currentUser.displayName;
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/bookbike/${userId}.json`
    );
    const resData = await response.json();
    const loadedBook = [];

    for (const key in resData) {
      loadedBook.push(
        new Book(
          displayName,
          resData[key].book_id,
          key,
          resData[key].currentcharges,
          resData[key].currentdays,
          resData[key].Bike_Brand,
          resData[key].Bike_name,
          resData[key].book_fromdate,
          resData[key].book_todate,
          resData[key].book_cnic,
          resData[key].book_description
        )
      );
    }
    dispatch({
      type: FETCH_BIKE,
      book: loadedBook,
      currentBook: loadedBook.filter((req) => req.bookId === userId),
    });
  };
};
export const bookBike = (
  currentcharges,
  currentdays,
  Bike_Brand,
  Bike_name,
  book_fromdate,
  book_todate,
  book_cnic,
  book_description
) => {
  return async (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid;
    const displayName = firebase.auth().currentUser.displayName;
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/bookbike/${userId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          book_id: userId,
          currentcharges,
          currentdays,
          Bike_Brand,
          Bike_name,
          book_fromdate,
          book_todate,
          book_cnic,
          book_description,
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: BOOK_BIKE,
      bookData: {
        displayName,
        book_id: userId,
        book_reqid: resData.name,
        currentcharges,
        currentdays,
        Bike_Brand,
        Bike_name,
        book_fromdate,
        book_todate,
        book_cnic,
        book_description,
      },
    });
  };
};
