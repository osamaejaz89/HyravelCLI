import chatMessage from '../../models/chatMessage';

export const SAVE_MESSAGE = 'SAVE_MESSAGE';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';

export const saveMessage = (conversationId, token, message, userId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/conversations/${conversationId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          userId,
        }),
      },
    );

    dispatch({
      type: SAVE_MESSAGE,
      messageData: {
        message,
        userId,
      },
    });
  };
};

export const fetchMessage = (conversationId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/conversations/${conversationId}.json`,
    );

    const resData = await response.json();
    const loadedMessages = [];

    for (const key in resData) {
      loadedMessages.push(
        new chatMessage(resData[key].message, resData[key].userId),
      );
    }

    dispatch({
      type: FETCH_MESSAGE,
      messages: loadedMessages,
    });
  };
};
