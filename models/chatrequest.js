class Request {
  constructor(
    requestId,
    status,
    senderName,
    receiverName,
    senderId,
    receiverId,
    conversationId,
  ) {
    this.requestId = requestId;
    this.status = status;
    this.senderName = senderName;
    this.receiverName = receiverName;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.conversationId = conversationId;
  }
}

export default Request;
