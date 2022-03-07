import * as firebase from "firebase";
import Document from "../../models/documents";

export const POST_DOC = "POST_DOC";

export const postDoc = (
    DocumentId,
    DocumentCNIC
  ) => {
    return async (dispatch, getState) => {
      const userId = firebase.auth().currentUser.uid;
      const displayName = firebase.auth().currentUser.displayName;
      const response = await fetch(
        `https://hyravelproject.firebaseio.com/document/${userId}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName,
            DocumentId: userId,
            DocumentCNIC
          }),
        }
      );
  
      const resData = await response.json();
      dispatch({
        type: POST_DOC,
        docData: {
          displayName,
          DocumentId: userId,
          Document_reqid: resData.name,
          DocumentCNIC
        },
      });
    };
  };
  