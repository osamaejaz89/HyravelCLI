import Tour from "../../models/tour";
import { BOOK_TOUR,FETCH_TOUR,FETCH_BOOK_TOUR } from "../actions/tour";

const initialState = {
  tour: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOUR:
      return {
        tours: action.tours,
      };
      case FETCH_BOOK_TOUR:
      return {
        booktours: action.booktours,
      };
      case BOOK_TOUR:
      // const requestBook = state.currentBook.findIndex(
      //   (book) => book.sndBook.id === action.bookId
      // );
      const updateTour = new Tour(
        action.bookData.displayName,
        action.bookData.tour_id,
        action.bookData.source,
        action.bookData.destination,
        action.bookData.description,
        action.bookData.status,
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
        currentTour: state.currentTour.concat(updateTour),
      };

    default:
      return state;
  }
};
