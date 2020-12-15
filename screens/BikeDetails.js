import React, { useState, useEffect, useCallback } from "react";
//import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator

} from "react-native";

import * as firebase from "firebase";

import { Searchbar } from "react-native-paper";

import {
  Container,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import vwcars from "./vwcars";
import * as senderActions from "../store/actions/bikes";
import { useSelector, useDispatch } from "react-redux";

const BikeDetailsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);

  const selectedBikes = useSelector((state) => state.reducerbikes.bikes);
  const dispatch = useDispatch();

  const loadBikes = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.fetchBike());
    //setData(selectedBikes);
    // setArrayHolder(selectedBikes);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadBikes);

    return () => {
      willFocusSub.remove();
    };
  }, [loadBikes]);

  useEffect(() => {
    loadBikes();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  console.log(selectedBikes);
  

  
  

  const bikeId = props.navigation.getParam("bikeId");
  const selectedBike = selectedBikes.find((bike) => bike.Bike_ID === bikeId);
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

  return (
    <View>
      <ImageBackground
        source={require("../assets/b1.png")}
        style={{ width: "100%", height: "50%" }}
      >
        
      </ImageBackground>
      <View>
        <Image source={{uri: selectedBike.url}} style={styles.himage} />
      </View>
      <View>
        <Text style={styles.title}>
          {selectedBike.Bike_Brand} {selectedBike.Bike_name}
        </Text>
        <Text style={styles.type}>{selectedBike.Bike_category}</Text>
      </View>
      <View style={styles.mini}>
        <View style={styles.DContainer}>
          <View style={styles.DIcon}>
            <MaterialCommunityIcons name="gas-station" size={50} color="#fff" />
          </View>
          <Text style={styles.dtext}>{selectedBike.fuel}</Text>
        </View>

        <View style={styles.DContainer}>
          <View style={styles.DIcon}>
            <MaterialCommunityIcons
              name="arrow-decision-auto"
              size={50}
              color="#fff"
            />
          </View>
          <Text style={styles.dtext}>automatic</Text>
        </View>

        <View style={styles.DContainer}>
          <View style={styles.DIcon}>
            <MaterialCommunityIcons
              name="seat-recline-normal"
              size={50}
              color="#fff"
            />
          </View>
          <Text style={styles.dtext}>{selectedBike.car_capacity} seats</Text>
        </View>
      </View>
      <View style={styles.mini2}>
        {/* <Image source={require("../assets/comp.png")} style={styles.comp}/> */}
        {/* <Text style={styles.price}>5500/-</Text> */}
        <TouchableOpacity onPress = {() => {props.navigation.navigate('BookBike', {bikeId: selectedBike.Bike_ID})}}>
          <View style={styles.p1}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              With Driver
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 5,
              }}
            >
              {selectedBike.Bike_charges}
            </Text>
            <Text
              style={{ fontSize: 16, left: 50, marginTop: -6, opacity: 0.5 }}
            >
              /day
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.p1}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Self Drive
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 5,
              }}
            >
              {selectedBike.Bike_charges}
            </Text>
            <Text
              style={{ fontSize: 16, left: 50, marginTop: -6, opacity: 0.5 }}
            >
              /day
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20, alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#1d2228",
            borderRadius: 10,
            width: 300,
            height: 60,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
              alignContent: "center",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 12,
            }}
          >
            Book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BikeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  himage: {
    marginTop: -300,
    height: 200,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    marginTop: -80,
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  DContainer: {
    marginTop: 10,
    left: "20%",
    marginBottom: 10,
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    padding: 15,
    alignSelf: "center",
    alignSelf: "center",
  },
  dtext: {
    alignSelf: "center",
    marginTop: 0,
    color: "#fff",
    textTransform: "uppercase",
    right: "20%",
  },
  type: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    alignSelf: "center",
  },

  price: {
    fontSize: 30,
    fontWeight: "bold",
  },

  mini: {
    marginTop: 0,
    flexDirection: "row",
    height: 100,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#1d2228",
    borderRadius: 30,
  },

  mini2: {
    marginTop: 30,
    flexDirection: "row",
    height: 150,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 10,
  },

  comp: {
    width: "80%",
    alignSelf: "center",
    height: 120,
    marginTop: 30,
  },

  p1: {
    width: 200,
    height: 120,
    padding: 20,
    margin: 15,
    marginHorizontal: 5,
    alignSelf: "center",
    backgroundColor: "#beffff",
  },
});