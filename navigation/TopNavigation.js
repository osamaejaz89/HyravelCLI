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

import RideBikeScreen from "../screens/RideBikeScreen";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import driverScreen from "../screens/driverScreen";
import touristScreen from "../screens/touristScreen";
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
      activeTintColor: "#E9446A",
      inactiveTintColor: "gray",
      showLabel: false,
    },
  }
);

export default createAppContainer(RidesNavigator);
