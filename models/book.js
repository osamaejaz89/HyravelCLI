class Book {
  constructor(
    displayName,
    book_id,
    key,
    driverCharges,
    days,
    model,
    description,
    book_fromdate,
    book_todate,
    book_cnic,
    book_description,
    status
  ) {
    this.displayName = displayName;
    this.book_id = book_id;
    this.key = key;
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

export default Book;
