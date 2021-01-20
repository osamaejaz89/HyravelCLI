import chatMessage from '../../models/chatMessage';

import {SAVE_MESSAGE, FETCH_MESSAGE} from '../actions/chatMessage';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MESSAGE:
      const newMessage = new chatMessage(
        action.messageData.message,
        action.messageData.userId,
      );

      return {
        ...state,
        messages: state.messages.concat(newMessage),
      };

    case FETCH_MESSAGE:
      return {
        messages: action.messages,
      };

    default:
      return state;
  }
};
