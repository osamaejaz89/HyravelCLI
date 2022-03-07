import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import React from "react";

import { Dimensions } from "react-native";

// import { Feather } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import CloudStorage, { CloudStorageScreen } from "../screens/CloudStorage";

import BottomNavigation from "./BottomNavigation";
import RideNavigation from "./TopNavigation";
import drivernotfound from "../screens/drivernotfound";

import SideBar from "../components/Sidebar";

import LoadingScreen from "../screens/LoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";

import LoginScreen from "../screens/LoginScreen";
import SplashComponent from "../components/SplashComponent";
import CarBrand from "../screens/CarBrand";
import BikeBrand from "../screens/BikeBrand";
import CarModels from "../screens/CarModels";
import BikeModels from "../screens/BikeModels";
import CarDetails from "../screens/CarDetails";
import BikeDetails from "../screens/BikeDetails";
import BookScreen from "../screens/BookScreen";
import BookBikeScreen from "../screens/BookBikeScreen";
import Header from "../components/HeaderButton";
import Push from "../components/Push";
import Hatchback from "../screens/CarHatchBack";
import Sedan from '../screens/CarSedan'
import DriverSignIn from '../screens/Driver/DriverLoginScreen'
import DriverRegister from '../screens/Driver/DriverRegister'
import DriverHome from '../screens/Driver/DriverHomeScreen'
import SplashDriver from '../screens/Driver/SplashDriver'
import SplashUser from '../screens/SplashUser'
import DriverRequests from '../screens/Driver/DriverRequests'
import DriverLocation from '../screens/Driver/DriverLocation'
import Maps from '../screens/Driver/Maps'
import Basic from '../screens/Driver/BasicUse'
import usestate from '../screens/Driver/MapsUseState'
import MapCustomMarker from "../screens/Driver/MapCustomMarker";
import MapLines from "../screens/Driver/MapLines";
import MapsMarker from "../screens/Driver/MapsMarker";
import MapStyle from "../screens/Driver/MapStyle";
import MapCoordinates from "../screens/Driver/MapCoordinates";
import MapDirection from "../screens/Driver/MapDirections";
import MapCurrent from "../screens/Driver/MapCurrent";
import MapLocation from "../screens/Driver/MapLocation";
import UserLocation from "../screens/UserLocation";
import TrackLines from "../screens/TrackLines"
import userChat from "../userchat/userChat"
import userconversations from "../userchat/userConversations"
import trackdata from "../screens/TrackData"
import driverChat from "../driverchat/driverChat"
import driverconversations from "../driverchat/driverConversations"
import { DriverDocumenteScreen } from "../screens/Driver/DriverDocument"
import PaymentScreen from "../screens/PaymentScreen"
const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      screen: BottomNavigation,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => (
          <Feather name="home" size={16} color={tintColor} />
        ),
      },
    },
    // Payment: {
    //   screen: PaymentScreen,
    //   navigationOptions: {
    //     title: "Wallet",
    //     drawerIcon: ({ tintColor }) => (
    //       <Feather name="credit-card" size={16} color={tintColor} />
    //     ),
    //   },
    // },
    Rides: {
      screen: RideNavigation,
      navigationOptions: {
        title: "My Rides",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="car-sports"
            size={16}
            color={tintColor}
          />
        ),
      },
    },
    // Calendar: {
    //   screen: CalendarScreen,
    //   navigationOptions: {
    //     title: "Rides Calendar",
    //     drawerIcon: ({ tintColor }) => (
    //       <Feather name="calendar" size={16} color={tintColor} />
    //     ),
    //   },
    // },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile",
        drawerIcon: ({ tintColor }) => (
          <Feather name="user" size={16} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: ({ tintColor }) => (
          <Feather name="settings" size={16} color={tintColor} />
        ),
      },
    },
    // Documents: {
    //   screen: DocumentsScreen,
    //   navigationOptions: {
    //     title: "Documents",
    //     drawerIcon: ({ tintColor }) => (
    //       <Feather name="settings" size={16} color={tintColor} />
    //     ),
    //   },
    // },
    CloudStorage: {
      screen: CloudStorageScreen,
      navigationOptions: {
        title: "Documents",
        drawerIcon: ({ tintColor }) => (
          <Feather name="settings" size={16} color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: (props) => <SideBar {...props} />,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: true,

    contentOptions: {
      activeBackgroundColor: "#363636",
      activeTintColor: "#fff",
      itemsContainerStyle: {
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 4,
      },
    },
  }
);

const AppStack = createStackNavigator({
  Home: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
        headerShown: false,
      };
    },
  },
  Car: {
    screen: CarBrand,
    navigationOptions:{
      headerShown: false,
    }
  },
  CM: CarModels,
  CarDetails: {
    screen: CarDetails,
    navigationOptions:{
      headerShown: false,
    }
  },
  Bike: {
    screen: BikeBrand,
    navigationOptions:{
      headerShown: false,
    }
  },
  BM: BikeModels,
  BikeDetails: BikeDetails,
  Book: {
    screen: BookScreen,
    navigationOptions:{
      headerShown: false,
    }
  },
  BookBike: {
    screen: BookBikeScreen,
    navigationOptions:{
      headerShown: false,
    }
  },
  DriverNotFound: drivernotfound,
  Profile: ProfileScreen,
  Push: Push,
  Settings: SettingsScreen,
  Hatchback: Hatchback,
  Sedan: Sedan,
  SplashUser: SplashUser,
  UserLocation: UserLocation,
  TrackLines: TrackLines,
  userChat: userChat,
  userconversations: userconversations,
  trackdata: trackdata,
  PaymentScreen: {
    screen: PaymentScreen,
    navigationOptions:{
      headerShown: false,
    }
  }
});

const AuthStack = createStackNavigator({
  Splash: SplashComponent,
  Login: LoginScreen,
  Register: RegisterScreen,
});

const DriverApp = createStackNavigator({
  DriverHome: DriverHome,
  DriverRequests: DriverRequests,
  DriverLocation: DriverLocation,
  Maps: Maps,
  Basic: Basic,
  usestate: usestate,
  MapCoordinates: MapCoordinates,
  MapCustomMarker: MapCustomMarker,
  MapLines: MapLines,
  MapsMarker: MapsMarker,
  MapStyle: MapStyle,
  MapDirection: MapDirection,
  MapCurrent: MapCurrent,
  MapLocation: MapLocation,
  driverChat: driverChat,
  driverconversations: driverconversations,
  DriverDocument: DriverDocumenteScreen

});

const DriverAuth = createStackNavigator({
  // Splash: SplashComponent,
  SplashDriver: SplashDriver,
  DriverSignIn: DriverSignIn,
  DriverRegister: DriverRegister,
});

const MainNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    DriverAuth: DriverAuth,
    DriverApp: DriverApp
  },
  {
    initialRouteName: "Loading",
  }
);

export default AppNavigator = createAppContainer(MainNavigator);
