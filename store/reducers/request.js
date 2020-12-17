import Request from "../../models/request";

import { BOOK_REQUEST, FETCH_REQUEST} from "../actions/request";

const initialState = {
  currentRequest: [],
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        request: action.request,
        currentRequest: action.currentRequest,
      };

    case BOOK_REQUEST:
      // const requestBook = state.currentBook.findIndex(
      //   (book) => book.sndBook.id === action.bookId
      // );
      const updateRequest = new Request(
        action.requestData.requestId,
        action.requestData.driverCharges,
        action.requestData.days,
        action.requestData.model,
        action.requestData.description,
        action.requestData.book_fromdate,
        action.requestData.book_todate,
        action.requestData.book_cnic,
        action.requestData.book_description,
        action.requestData.status,
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
        currentRequest: state.currentRequest.concat(updateRequest),
      };
    default:
      return state;
  }
};
