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
import * as senderActions from "../store/actions/cars";
import { useSelector, useDispatch } from "react-redux";

const CarDetailsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);

  const selectedCars = useSelector((state) => state.reducercars.cars);
  const dispatch = useDispatch();

  const loadCars = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.fetchCar());
    //setData(selectedCars);
    // setArrayHolder(selectedCars);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadCars);

    return () => {
      willFocusSub.remove();
    };
  }, [loadCars]);

  useEffect(() => {
    loadCars();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  
  console.log(selectedCars);

  

  const carId = props.navigation.getParam("carId");
  const selectedCar = selectedCars.find((car) => car.car_ID === carId);
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
    <ScrollView style={{backgroundColor:'#1c2227', height:'100%'}}>
      {/* <ImageBackground
        source={require("../assets/b1.png")}
        style={{ width: "100%", height: "50%", marginTop:10 }}
      > */}
         <View style={{ backgroundColor: 'transparent', flexDirection: 'row', }}>
        <TouchableOpacity
          style={{
            padding: 15,
            marginTop: 5,
            width: "15%",
            backgroundColor: "#1c2227",
          }}
          onPress={() => props.navigation.navigate("Car")}
        >
          <FontAwesome5 name="arrow-circle-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            marginTop: 5,
            width: "15%",
            left: 300,
            backgroundColor: "#1c2227",
          }}
          onPress={() => props.navigation.navigate("Home")}
        >
          <FontAwesome5 name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
      <View>
        <Image source={{uri: selectedCar.url}} style={styles.himage} />
      </View>
      <View>
        <Text style={styles.title}>
          {selectedCar.car_Brand} {selectedCar.car_name}
        </Text>
        <Text style={styles.type}>{selectedCar.category}</Text>
      </View>
      <View style={styles.mini}>
        <View style={styles.DContainer}>
          <View style={styles.DIcon}>
            <MaterialCommunityIcons name="gas-station" size={50} color="#ffd48e" />
          </View>
          <Text style={styles.dtext}>{selectedCar.fuel}</Text>
        </View>

        <View style={styles.DContainer}>
          <View style={styles.DIcon}>
            <MaterialCommunityIcons
              name="arrow-decision-auto"
              size={50}
              color="#ffd48e"
            />
          </View>
          <Text style={styles.dtext}>automatic</Text>
        </View>

        <View style={styles.DContainer}>
          <View style={styles.DIcon}>
            <MaterialCommunityIcons
              name="seat-recline-normal"
              size={50}
              color="#ffd48e"
            />
          </View>
          <Text style={styles.dtext}>{selectedCar.car_capacity} seats</Text>
        </View>
      </View>
      <View style={styles.mini2}>
        {/* <Image source={require("../assets/comp.png")} style={styles.comp}/> */}
        {/* <Text style={styles.price}>5500/-</Text> */}
        <TouchableOpacity onPress = {() => {props.navigation.navigate('Book', {carId: selectedCar.car_ID,DriverCharges: selectedCar.car_charges_driver})}}>
          <View style={styles.p1}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "700",
                textTransform: "uppercase",
                color:'#fff',
              }}
            >
              With Driver
            </Text>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: -2,
                color:'#e8b209',
              }}
            >
              {selectedCar.car_charges_driver}
            </Text>
            <Text
              style={{ fontSize: 16, left: 50, marginTop: -6, color:'#fff' }}
            >
              /day
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => {props.navigation.navigate('Book', {carId: selectedCar.car_ID,Charges: selectedCar.car_charges_wd})}}>
          <View style={styles.p1}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "700",
                textTransform: "uppercase",
                color:'#fff',
              }}
            >
              Self Drive
            </Text>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: -2,
                color:'#e8b209',
              }}
            >
              {selectedCar.car_charges_wd}
            </Text>
            <Text
              style={{ fontSize: 16, left: 50, marginTop: -6, color:'#fff'}}
            >
              /day
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{ marginTop: 20, alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#f9be03",
            borderRadius: 30,
            width: 200,
            height: 50,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#1c2227",
              alignSelf: "center",
              alignContent: "center",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 12,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
    
    );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  himage: {
    marginTop: -30,
    height: 220,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 22,
    marginBottom: 50,
    fontWeight: "bold",
    textTransform: "uppercase",
    alignSelf: "center",
    color:'#fff',
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
    backgroundColor: "#22272a",
    borderRadius: 30,
  },

  mini2: {
    marginTop: 30,
    flexDirection: "row",
    height: 150,
    alignSelf: "center",
    alignItems:'center',
    left: 5,
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 10,
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
    marginTop: 50,
    marginHorizontal: 5,
    alignSelf: "center",
    color:'#fff',
    backgroundColor: "#22272a",
  },
});