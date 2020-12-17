class Request{
    constructor(
        key,
        requestId,
        driverCharges,
        days,
        model,
        description,
        book_fromdate,
        book_todate,
        book_cnic,
        book_description,
        status
        ){
            this.key = key;
            this.requestId = requestId;
            this.driverCharges = driverCharges;
            this.days = days;
            this.model = model;
            this.description = description;
            this.book_fromdate = book_fromdate;
            this.book_todate = book_todate;
            this.book_cnic = book_cnic;
            this.book_description = book_description;
            this.status = status;
    }
}
export default Request;