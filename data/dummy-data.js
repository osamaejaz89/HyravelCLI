import Brand from "../models/brand";
import Car from "../models/car";
import Book from "../models/book";

export const BRANDS = [
  new Brand(
    "c1",
    "Suzuki",
    "https://i.pinimg.com/originals/a7/84/02/a784021599a3d4ca69b134c3ca8a1000.jpg"
  ),
  new Brand(
    "c2",
    "Toyota",
    "http://blog.logomyway.com/wp-content/uploads/2017/03/toyota-logo-design.jpg"
  ),
  new Brand(
    "c3",
    "Audi",
    "https://logos-download.com/wp-content/uploads/2016/02/Audi_Logo_transparent.png"
  ),
  new Brand(
    "c4",
    "Chevrolet",
    "https://logos-download.com/wp-content/uploads/2016/03/Chevrolet_logo_med.png"
  ),
  new Brand(
    "c5",
    "BMW",
    "https://mumbrella.com.au/wp-content/uploads/2017/05/BMW-Logo.jpg"
  ),
  new Brand(
    "c6",
    "Mercedes",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Mercedes-benz-logo.jpg"
  ),
  new Brand(
    "c7",
    "Hyundai",
    "https://www.littlegatepublishing.com/wp-content/uploads/2014/06/LA90771LOGO-b.jpg"
  ),
  new Brand(
    "c8",
    "Honda",
    "http://wall.bestcarmag.com/sites/default/files/honda-logo-wallpaper-hd-39724-5879311.jpg"
  ),
];

export const CARS = [
  new Car(
    "m1",
    ["c1"],
    "Suzuki Swift",
    "Affordable",
    "Simple",
    "https://upload.wikimedia.org/wikipedia/commons/5/52/Suzuki_Ignis_front_20080820.jpg",
    20,
    "This is a new Car."
  ),

  new Car(
    "m2",
    ["c2"],
    "Toyota Corolla",
    "affordable",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/2005-2007_Toyota_Corolla.jpg",
    10,
    "This is a new Car."
  ),

  new Car(
    "m3",
    ["c3"],
    "Audi A3",
    "pricey",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Audi_A3_front_20080326.jpg",
    45,
    "This is a new Car."
  ),

  new Car(
    "m4",
    ["c4"],
    "Chevrolet Impala",
    "luxurious",
    "challenging",
    "https://upload.wikimedia.org/wikipedia/commons/3/3b/2012_Chevrolet_Impala_--_NHTSA.jpg",
    60,
    "This is a new Car."
  ),

  new Car(
    "m5",
    ["c5"],
    "BMW Series 3",
    "luxurious",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/BMW_3er_Compact_front_20090920.jpg",
    15,
    "This is a new Car."
  ),

  new Car(
    "m6",
    ["c6"],
    "Mercedes-Benz C-Class (W203)",
    "affordable",
    "hard",
    "https://upload.wikimedia.org/wikipedia/commons/0/02/Mercedes-Benz_W203_front_20171214.jpg",
    240,
    "This is a new Car."
  ),

  new Car(
    "m7",
    ["c7"],
    "Hyundai Accent",
    "affordable",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/2019_Hyundai_Accent_1.6L%2C_front_10.8.19.jpg",
    20,
    "This is a new Car."
  ),

  new Car(
    "m8",
    ["c2"],
    "Toyota Camry",
    "pricey",
    "challenging",
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg",
    35,
    "This is a new Car."
  ),

  new Car(
    "m9",
    ["c8"],
    "Honda Civic Hybrid",
    "affordable",
    "hard",
    "https://upload.wikimedia.org/wikipedia/commons/3/38/2014_Honda_Civic_%28FB4_MY13%29_Hybrid_sedan_%282015-08-07%29_01.jpg",
    45,
    "This is a new Car."
  ),
];
