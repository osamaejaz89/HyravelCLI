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
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CarBrand from "./CarBrand";
import * as firebase from "firebase";
import vwcars from "./vwcars";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Footer } from "native-base";

const HomeScreen = (props) => {
  // state = {
  //   email: "",
  //   displayName: "",
  // };

  // componentDidMount() {
  //   const { email, displayName } = firebase.auth().currentUser;
  //   this.setState({ email, displayName });
  // }
  // signOutUser = () => {
  //   firebase.auth().signOut();
  // };

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    // <ImageBackground
    // source={require("../assets/banner1.png")}
    // style={styles.himage}>
    <View style={styles.body} >
      <ScrollView>
        <View style={{width: '100%', backgroundColor: '#1c2227'}}>
        <TouchableOpacity
          style={{
            padding: 15,
            marginTop: 0,
            width: "12%",
            backgroundColor: "#1c2227",
          }}
          onPress={props.navigation.openDrawer}
        >
          <FontAwesome5 name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/hw.png")}
          style={{
            width: "25%",
            height: 40,
            marginTop: -40,

            marginBottom: 10,
            alignSelf: "center",
          }}
        />

        <View style={{ width: "100%", height: "25%" }}>
          <Image
            source={require("../assets/banner1.png")}
            style={styles.himage}
          />
        </View>


        <View style={styles.container}>
          <View style={styles.sliderContainer}></View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              marginTop: -100,
              marginBottom: -40,
            }}
          >
            Four Wheel Categories
          </Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Car")}
              useForeground
              style={styles.categoryBtn}
            >
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-pickup"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => props.navigation.navigate("Hatchback")}
            >
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-hatchback"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Hatchback</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => props.navigation.navigate("Sedan")}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-sports"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Sedan</Text>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-side"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Family</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-side"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Family</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-side"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Family</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="car-side"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Family</Text>
            </TouchableOpacity>
          </ScrollView>
          <Text
            style={{
              alignSelf: "center",
              textAlign: "left",
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              marginTop: -20,
              marginBottom: -40,
            }}
          >
            Two Wheel Categories
          </Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Bike")}
              useForeground
              style={styles.categoryBtn}
            >
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons name="bike" size={30} color="#ffd187" />
              </View>
              <Text style={styles.categoryBtnTxt}>Sports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Heavy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Electric</Text>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Harley</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Family</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#ffd187"
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Family</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* <View style={styles.cardWrapper}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
                marginTop: 30,
                marginBottom: 5,
              }}
            >
              Popular Vehicles
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#22272a',
    height: '100%',
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
    height: 400,
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
    fontSize: 18,
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
    color: "#fff",
    fontWeight: "200",
  },

  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 60,
    height: 60,
    backgroundColor: "#1c2227",
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
