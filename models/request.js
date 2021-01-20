class Request{
    constructor(
        requestid,
        status,
        email,
        username,
        userId,
        driverId,
        driverName,
        conversationId
      ) {
        this.requestid = requestid;
        this.status = status;
        this.email = email;
        this.username = username;
        this.userId = userId; 
        this.driverId = driverId;
        this.driverName = driverName;
        this.conversationId = conversationId
      }
}
export default Request;