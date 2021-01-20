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
import * as senderActions from "../store/actions/cars";
import { useSelector, useDispatch } from "react-redux";

const CarScreen = (props) => {
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
  

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1c2227" }}>
       <View style={{width: '100%', backgroundColor: '#1c2227'}}>
        <TouchableOpacity
          style={{
            padding: 15,
            marginTop: 5,
            width: "15%",
            backgroundColor: "#1c2227",
          }}
          onPress={() => props.navigation.navigate("Home")}
        >
          <FontAwesome5 name="arrow-circle-left" size={30} color="#fff" />
        </TouchableOpacity>
        </View>
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "500",
          textTransform: "uppercase",
          opacity: 0.9,
          marginTop: -40,
          marginBottom: 20,
          alignSelf: "center",
        }}
      >
        Browse Car
      </Text>
      <FlatList
        data={selectedCars}
        keyExtractor={(item) => item.car_ID}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.item}>
                <View>
                  <Text style={styles.model}>{item.car_Brand}</Text>
                  <Text style={styles.desc}>{item.car_name}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: '#fff',
                      marginTop: -5,
                    }}
                  >
                    {item.car_model_year}
                  </Text>
                  <Text style={{ fontSize: 14, color:'#fff', marginTop: 40, marginLeft:2, }}>
                    Starting from
                  </Text>
                  <Text style={styles.price}>{item.car_charges_driver}</Text>
                  <Text style={{ fontSize: 14, color:'#fff', marginTop: -6, }}>
                    /day
                  </Text>
                  <View style={styles.categoryBtn}>
                    { <TouchableOpacity style={styles.categoryIcon} onPress={() => {props.navigation.navigate('CarDetails', {carId: item.car_ID})}}>
            <Text style={{color: '#fff', fontWeight: '700'}}>BOOK NOW</Text>
        </TouchableOpacity> }
                  </View>
                </View>
              </View>
              {/* <Image source={{uri: item.image}} style={styles.image} /> */}
              { <Image style={styles.image} source={{uri: item.url}} /> }
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 200,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
    backgroundColor: "#22272a",
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
    width: 150,
    height: 40,
    marginTop: -46,
    left: 119,
    backgroundColor: "#5f5f5f",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  model: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: '#fff',
  },

  desc: {
    fontSize: 28,
    marginLeft: -2,
    color: '#ffc200',
    fontWeight: "bold",
    textTransform: 'uppercase', 
    marginTop: -6,
  },

  image: {
    height: 170,
    width: "100%",
    marginTop: 10,
    left: '18%',
    position: "absolute",
    resizeMode: "contain",
  },

  price: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: -10,
    color: "#ffc200",
  },
});

export default CarScreen;
