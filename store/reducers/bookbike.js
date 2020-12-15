import Book from "../../models/book";

import { BOOK_BIKE, FETCH_BIKE } from "../actions/bookbike";

const initialState = {
  currentBook: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BIKE:
      return {
        book: action.book,
        currentBook: action.currentBook,
      };

    case BOOK_BIKE:
      // const requestBook = state.currentBook.findIndex(
      //   (book) => book.sndBook.id === action.bookId
      // );
      const updateBook = new Book(
        action.bookData.displayName,
        action.bookData.book_id,
        action.bookData.book_fromdate,
        action.bookData.book_todate,
        action.bookData.book_cnic,
        action.bookData.book_description
      );

      // const updatedCurrentBook = [...state.currentBook];
      // updatedCurrentBook[requestBook] = updateBook;

      // const booksIndex = state.book.findIndex(
      //   (book) => book.sndBook_id === action.bookId
      // );

      // const updatedBook = [...state.book];
      // updatedBook[booksIndex] = updatedBook;

      return {
        ...state,
        currentBook: state.currentBook.concat(updateBook),
      };
    default:
      return state;
  }
};
