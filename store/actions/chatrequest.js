import Request from '../../models/chatrequest';

export const SAVE_REQUESTS = 'SAVE_REQUESTS';
export const FETCH_REQUESTS = 'FETCH_REQUESTS';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';

export const saveRequests = (
  senderId,
  receiverId,
  senderName,
  receiverName,
) => {
  return async (dispatch) => {
    const status = 'pending';
    const conversationId = '';
    const response = await fetch(
      `https://hyravelproject.firebaseio.com/requests.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          senderName,
          receiverName,
          senderId,
          receiverId,
          conversationId,
        }),
      },
    );

    const resData = await response.json();

    dispatch({
      type: SAVE_REQUESTS,
      requestData: {
        requestId: resData.name,
        status,
        senderName,
        receiverName,
        senderId,
        receiverId,
        conversationId,
      },
    });
  };
};

export const fetchRequests = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://hyravelproject.firebaseio.com/requests.json',
    );

    const resData = await response.json();
    const loadedRequests = [];

    for (const key in resData) {
      loadedRequests.push(
        new Request(
          key,
          resData[key].status,
          resData[key].senderName,
          resData[key].receiverName,
          resData[key].senderId,
          resData[key].receiverId,
          resData[key].conversationId,
        ),
      );
    }

    dispatch({
      type: FETCH_REQUESTS,
      requests: loadedRequests,
    });
  };
};

export const updateRequest = (
  requestId,
  status,
  conversationId,
  senderName,
  receiverName,
  senderId,
  receiverId,
) => {
  return async (dispatch) => {
    await fetch(
      `https://hyravelproject.firebaseio.com/requests/${requestId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          status,
          senderName,
          receiverName,
          senderId,
          receiverId,
          conversationId,
        }),
      },
    );

    dispatch({
      type: UPDATE_REQUEST,
      requestData: {
        requestId: requestId,
        status,
        senderName,
        receiverName,
        senderId,
        receiverId,
        conversationId,
      },
    });
  };
};