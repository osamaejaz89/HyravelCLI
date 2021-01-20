import Request from "../../models/request";

import { BOOK_REQUEST, FETCH_REQUEST, UPDATE_REQUEST} from "../actions/request";

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
        action.requestData.status,
        action.requestData.email,
        action.requestData.username,
        action.requestData.userId,
        action.requestData.driverId,
        action.requestData.driverName,
        action.requestData.conversationId,
      );

      // const updatedCurrentBook = [...state.currentBook];
      // updatedCurrentBook[requestBook] = updateBook;

      // const booksIndex = state.book.findIndex(
      //   (book) => book.sndBook_id === action.bookId
      // );

      // const updatedBook = [...state.book];
      // updatedBook[booksIndex] = updatedBook;
      
      case UPDATE_REQUEST:
      const requestIndex = state.requests.findIndex(
        (req) => req.requestId === action.requestData.requestId,
      );

      const updatedRequest = new Request(
        action.requestData.userId,
        action.requestData.requestId,
        action.requestData.status,
        action.requestData.email,
        action.requestData.username,
        action.requestData.driverId,
        action.requestData.driverName,
        action.requestData.conversationId,
      );

      const updatedCurrentRequest = [...state.requests];
      updatedCurrentRequest[requestIndex] = updatedRequest;
      return {
        ...state,
        currentRequest: state.currentRequest.concat(updateRequest),
      };
    default:
      return state;
  }
};
