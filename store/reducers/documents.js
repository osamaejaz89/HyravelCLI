import Document from "../../models/documents";

import { POST_DOC } from "../actions/documents";

const initialState = {
  currentDoc: [],
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case POST_DOC:
      // const requestBook = state.currentBook.findIndex(
      //   (book) => book.sndBook.id === action.bookId
      // );
      const updateBook = new Document(
        action.docData.displayName,
        action.docData.DocumentId,
        action.docData.DocumentCNIC,
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
        currentDoc: state.currentDoc.concat(updateDoc),
      };
    default:
      return state;
  }
};
