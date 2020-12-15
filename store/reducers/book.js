import Book from "../../models/book";

import { BOOK_CAR, DELETE_CAR, FETCH_CAR } from "../actions/book";

const initialState = {
  currentBook: [],
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CAR:
      return {
        
      };
    case FETCH_CAR:
      return {
        book: action.book,
        currentBook: action.currentBook,
      };

    case BOOK_CAR:
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
