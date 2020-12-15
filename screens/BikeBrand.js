import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import vwcars from "./vwcars";
import { ScrollView } from "react-native-gesture-handler";
import { BRANDS } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import * as senderActions from "../store/actions/bikes";
import { useSelector, useDispatch } from "react-redux";

const BikeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);

  const selectedBikes = useSelector((state) => state.reducerbikes.bikes);
  const dispatch = useDispatch();

  const loadBikes = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.fetchBike());
    //setData(selectedCars);
    // setArrayHolder(selectedCars);
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
  

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#20232B" }}>
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          textTransform: "uppercase",
          opacity: 0.9,
          marginTop: -40,
          marginBottom: 10,
          alignSelf: "center",
        }}
      >
        Select your Car
      </Text>
      <FlatList
        data={selectedBikes}
        keyExtractor={(item) => item.Bike_ID}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {props.navigation.navigate('BikeDetails', {bikeId: item.Bike_ID})}}>
              <View style={styles.item}>
                <View>
                  <Text style={styles.model}>{item.Bike_Brand}</Text>
                  <Text style={styles.desc}>{item.Bike_name}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      opacity: 0.6,
                      marginTop: -5,
                    }}
                  >
                    {item.Bike_model_year}
                  </Text>
                  <Text style={{ fontSize: 14, opacity: 0.5, marginTop: 50 }}>
                    PKR
                  </Text>
                  <Text style={styles.price}>{item.Bike_charges}</Text>
                  <Text style={{ fontSize: 14, opacity: 0.5, marginTop: -6 }}>
                    /day
                  </Text>
                  <TouchableOpacity style={styles.categoryBtn}>
                    {/* <View style={styles.categoryIcon}>
            <Text style={{color: '#fff', fontWeight: '700'}}>BOOK</Text>
        </View> */}
                  </TouchableOpacity>
                </View>
              </View>
              {/* <Image source={{uri: item.image}} style={styles.image} /> */}
              <Image style={styles.image} source={{uri: item.url}} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 200,
    width: "95%",
    alignSelf: "center",
    borderRadius: 12,
    marginTop: 20,
    right: "-5%",
    marginBottom: 5,
    padding: 15,
    backgroundColor: "#fff",
  },

  categoryBtn: {
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
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 80,
    height: 40,
    marginTop: -60,
    right: "-170%",
    backgroundColor: "#2d2942",
    borderRadius: 10,
  },
  model: {
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.6,
    textTransform: "uppercase",
  },

  desc: {
    fontSize: 28,
    fontWeight: "bold",
    opacity: 0.7,
    marginTop: -6,
  },

  image: {
    height: 200,
    width: "100%",
    marginTop: 20,
    position: "absolute",
    right: "-30%",
    resizeMode: "contain",
  },

  price: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: -10,
    color: "#A00050",
  },
});

export default BikeScreen;