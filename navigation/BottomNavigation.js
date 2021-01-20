import { createBottomTabNavigator } from "react-navigation-tabs";
//import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import React from "react";
import touristScreen from "../screens/touristScreen";
import driverScreen from "../screens/driverScreen";
import HomeScreen from "../screens/HomeScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={30} color={tintColor} />
        ),
      },
    },

    driver: {
      screen: driverScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person-add" size={30} color={tintColor} />
        ),
      },
    },
    tourist: {
      screen: touristScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-man" size={30} color={tintColor} />
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

export default createAppContainer(AppTabNavigator);
