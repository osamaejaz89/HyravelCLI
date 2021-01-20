import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RidesScreen from "../screens/RidesScreen";
// import { Feather } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";

//import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import RideBikeScreen from "../screens/RideBikeScreen";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import driverScreen from "../screens/driverScreen";
import touristScreen from "../screens/touristScreen";
import CarBooking from "../screens/CarBookingScreen";
import booktour from "../screens/booktourscreen";

const RidesNavigator = createBottomTabNavigator(
  {
    carRides: {
      screen: RidesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="car-sports"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    carbooking: {
      screen: CarBooking,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="car-sports"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    tour: {
      screen: booktour,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-man" size={30} color={tintColor} />
        ),
      },
    },
    bikeRides: {
      screen: RideBikeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="motorcycle" size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#ffc500",
      inactiveTintColor: "gray",
      activeBackgroundColor:"#0f1214",
      inactiveBackgroundColor: '#22272a',
      showLabel: false,
    },
  }
);

export default createAppContainer(RidesNavigator);
