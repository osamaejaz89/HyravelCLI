class BookBike {
    constructor(
      displayName,
      book_id,
      key,
      currentcharges,
      currentdays,
      Bike_Brand,
      Bike_name,
      book_fromdate,
      book_todate,
      book_cnic,
      book_description
    ) {
      this.displayName = displayName;
      this.book_id = book_id;
      this.key = key;
      this.currentcharges = currentcharges;
      this.currentdays = currentdays;
      this.Bike_Brand = Bike_Brand;
      this.Bike_name = Bike_name;
      this.book_fromdate = book_fromdate;
      this.book_todate = book_todate;
      this.book_cnic = book_cnic;
      this.book_description = book_description;
    }
  }
  
  export default BookBike;
  