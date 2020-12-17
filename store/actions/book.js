import * as firebase from 'firebase'
import Book from "../../models/book";

export const BOOK_CAR = "BOOK_CAR";
export const FETCH_CAR = "FETCH_CAR";
export const DELETE_CAR = "DELETE_CAR";

export const fetchCar = () => {
  return async (dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    const displayName = firebase.auth().currentUser.displayName;
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/book/${userId}.json`
    );
    const resData = await response.json();
    const loadedBook = [];

    for (const key in resData) {
      loadedBook.push(
        new Book(
          displayName,
          resData[key].book_id,
          key,
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
      type: FETCH_CAR,
      book: loadedBook,
      currentBook: loadedBook.filter((req) => req.bookId === userId),
    });
  };
};

export const bookCar = (
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
      `https://hyravelproject.firebaseio.com/book/${userId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          book_id: userId,
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
      type: BOOK_CAR,
      bookData: {
        displayName,
        book_id: userId,
        book_reqid: resData.name,
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

export const deleteCar = () => {
  return {type : DELETE_CAR, bid: bookId}
}