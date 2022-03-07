import Request from '../../models/chatrequest';

import {
  SAVE_REQUESTS,
  FETCH_REQUESTS,
  UPDATE_REQUEST,
} from '../actions/chatrequest';

const initialState = {
  requests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REQUESTS:
      const newRequest = new Request(
        action.requestData.requestId,
        action.requestData.status,
        action.requestData.senderName,
        action.requestData.receiverName,
        action.requestData.senderId,
        action.requestData.receiverId,
        action.requestData.conversationId,
      );
      return {
        ...state,
        requests: state.requests.concat(newRequest),
      };

    case FETCH_REQUESTS:
      return {
        requests: action.requests,
      };

    case UPDATE_REQUEST:
      const requestIndex = state.requests.findIndex(
        (req) => req.requestId === action.requestData.requestId,
      );

      const updatedRequest = new Request(
        action.requestData.requestId,
        action.requestData.status,
        action.requestData.senderName,
        action.requestData.receiverName,
        action.requestData.senderId,
        action.requestData.receiverId,
        action.requestData.conversationId,
      );

      const updatedCurrentRequest = [...state.requests];
      updatedCurrentRequest[requestIndex] = updatedRequest;

      return {
        ...state,
        requests: updatedCurrentRequest,
      };

    default:
      return state;
  }
};
