import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SectionList,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  TextInput,
  Button
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import auth from '@react-native-firebase/auth'

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Footer } from "native-base";

const DriverHomeScreen = (props) => {
  
  return (
        
      <View style={styles.container}>
          <Text>Driver Home Screen</Text>
          <Button title="Driver Requests" onPress = {() => props.navigation.navigate('DriverRequests')}/>
          <View>
            <Button title="Driver Location" onPress={() => props.navigation.navigate('DriverLocation')}/>
          </View>
          <View>
            <Button title="Maps" onPress={() => props.navigation.navigate('Maps')}/>
          </View>
          <View>
            <Button title="Sign Out" onPress={() => auth().signOut()}/>
          </View>
      </View>
      
  );
};

  


export default DriverHomeScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  himage: {
    flex: 1,
    marginTop: -10,
    resizeMode: "cover",
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    fontSize: 16,
    margin: 10,
    marginTop: -30,
    marginLeft: 5,
    padding: 10,
    width: "90%",
    height: 50,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: "white",
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    paddingTop: 0,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },

  wrapper: {},

  slider: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
  },

  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
  },

  item: {
    height: 200,
    width: "95%",
    alignSelf: "center",
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 5,
    padding: 15,
    backgroundColor: "#2d2942",
  },

  categoryBtn2: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    padding: 15,
    alignSelf: "center",
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    right: "-170%",
    marginTop: -30,
    width: "40%",
  },
  categoryIcon2: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 80,
    height: 40,
    marginTop: -60,
    right: "-170%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  model: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },

  desc: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: -6,
  },

  image: {
    height: 170,
    width: "100%",
    marginTop: 20,
    position: "absolute",
    right: "-16%",
    resizeMode: "contain",
  },

  price: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: -10,
    color: "#EFB627",
  },

  categoryContainer: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    padding: 15,
    alignSelf: "center",
  },

  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#2d2942",
    fontWeight: "bold",
  },

  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    backgroundColor: "#2d2942",
    borderRadius: 50,
  },

  cardBtnText: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
  },

  cardWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },

  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  cardImgWrapper: {
    flex: 1.5,
  },

  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
