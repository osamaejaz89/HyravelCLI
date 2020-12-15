import Brand from "../models/brand";
import Bike from "../models/bike";

export const BRANDS = [
  new Brand(
    "c1",
    "Honda",
    "https://cdn.freelogovectors.net/wp-content/uploads/2018/03/honda-motocycle-logo.png"
  ),
  new Brand(
    "c2",
    "Yamaha",
    "https://www.yamaha-motor.com.pk/wp-content/uploads/2016/09/logo-1.png"
  ),
  new Brand(
    "c3",
    "Kawasaki",
    "https://upload.wikimedia.org/wikipedia/commons/0/00/Kawasaki-Logo.jpg"
  ),
  new Brand(
    "c4",
    "Unique",
    "https://cache1.pakwheels.com/system/bike_manufacturers/manufacturers/000/000/003/resized/Unique.png"
  ),
  new Brand(
    "c5",
    "Super Power",
    "https://cache1.pakwheels.com/system/bike_manufacturers/manufacturers/000/000/006/resized/Super-Power.png"
  ),
  new Brand(
    "c6",
    "Crown",
    "https://cache2.pakwheels.com/system/bike_manufacturers/manufacturers/000/000/022/resized/crown.png"
  ),
  new Brand(
    "c7",
    "Suzuki",
    "https://cache3.pakwheels.com/system/bike_manufacturers/manufacturers/000/000/005/resized/Suzuki.png"
  ),
  new Brand(
    "c8",
    "Atlas Honda",
    "https://www.atlashonda.com.pk/wp-content/uploads/2019/03/atlas-logo-1.jpg"
  ),
];

export const BIKES = [
  new Bike(
    "m1",
    ["c1"],
    "Honda Roadmaster",
    "affordable",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/4/49/Honda_Roadmaster_CD200_%281980%29.jpg",
    20
  ),

  new Bike(
    "m2",
    ["c2"],
    "Yamaha Gladiator",
    "affordable",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Yamaha_Gladiator_JA_Type_2007.jpg",
    10
  ),

  new Bike(
    "m3",
    ["c3"],
    "Kawasaki Z750",
    "pricey",
    "simple",
    "https://upload.wikimedia.org/wikipedia/commons/2/28/Z750.jpg",
    45
  ),

  new Bike(
    "m4",
    ["c4"],
    "Unique UD 100",
    "luxurious",
    "challenging",
    "https://cache4.pakwheels.com/system/bike_model_pictures/947/original/Unique_UD100.jpg?1448548520",
    60
  ),

  new Bike(
    "m5",
    ["c5"],
    "Super Power SP 110 Cheetah 2020",
    "luxurious",
    "simple",
    "https://cache3.pakwheels.com/system/bike_model_pictures/1099/original/Super_Power_SP_110_Cheetah.jpg?1524566379",
    15
  ),

  new Bike(
    "m6",
    ["c6"],
    "Crown FIT 150 Fighter",
    "affordable",
    "hard",
    "https://cache3.pakwheels.com/system/bike_model_pictures/1139/original/FIT-150-Fighter-redblack.jpg?1548927504",
    240
  ),

  new Bike(
    "m7",
    ["c7"],
    "Suzuki GR 150 2020",
    "affordable",
    "simple",
    "https://cache3.pakwheels.com/system/bike_model_pictures/1071/original/Suzuki_GR_150.jpg?1512468289",
    20
  ),

  new Bike(
    "m8",
    ["c8"],
    "Honda CB550",
    "pricey",
    "challenging",
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Honda_CB550Four_cropped.jpg",
    35
  ),
];
