import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TouchableNativeFeedback,
  Platform,
  SafeAreaView
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as bookActions from "../store/actions/book";
import * as firebase from 'firebase'

import moment from 'moment'
import * as requestActions from "../store/actions/request";

const CarBooking = (props) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const selectedBook = useSelector((state) => state.reducerbook.book);
  const dispatch = useDispatch();

  const loadBook = useCallback(async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    await dispatch(bookActions.fetchCar());

    setIsLoading(false);
    setIsRefreshing(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadBook);

    return () => {
      willFocusSub.remove();
    };
  }, [loadBook]);

  useEffect(() => {
    loadBook();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  console.log(selectedBook);
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const userId = firebase.auth().currentUser.uid;
  // const displayedRequests = selectedRequests.filter((req) => req.requestId === userId);

  const renderRider = (itemData) => {
    return (
      <TouchableCmp>
        <View style={styles.product}>
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>{itemData.item.displayName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.date}>{moment(itemData.item.book_fromdate).format('MMMM, Do YYYY')}</Text>
                <Text style={{ fontSize: 13, color: "#1c2227", fontWeight: 'bold' }}> - </Text>
                <Text style={styles.date}>{moment(itemData.item.book_todate).format('MMMM, Do YYYY')}</Text>
               </View>
              <Text style={styles.cnic}>{itemData.item.book_cnic}</Text>

              <Text style={styles.description}>
                {itemData.item.status}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: "row", left: 50}}>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress = {() => props.navigation.navigate('PaymentScreen', {payment: itemData.item.driverCharges})}
            >
              <Text style={styles.buttonText}>Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableCmp>
    );
  };
  return (
    <View>
      <View style={{marginTop: 30, width: '13%'}}>
      <TouchableOpacity
        style={{ padding: 15 }}
        onPress={props.navigation.openDrawer}
      >
        <FontAwesome5 name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.ctitle}>Bookings</Text>
      </View>

        <FlatList
          onRefresh={loadBook}
          refreshing={isRefreshing}
          data={selectedBook}
          keyExtractor={(item, index) => item.key}
          renderItem={renderRider}
        />
      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  product: {
    width: "90%",
    maxWidth: "90%",
    height: 180,
    paddingVertical: "5%",
    shadowColor: "black",
    shadowOpacity: 0.86,
    shadowOffset: { width: 10, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    alignSelf:'center',
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "50%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
  },

  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "black",
    bottom: 5,
  },

  date: {
    fontSize: 13,
    fontWeight: '400',
    textTransform: "uppercase",
    color: "#1c2227",
  },
  
  cnic: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: "uppercase",
    color: "#1c2227",
    marginTop: 5,
  },

  tbutton: {
    fontSize: 18,
    marginVertical: 4,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  ctitle: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: -35,
    marginBottom: 40,
  },
  email: {
    fontSize: 18,
    marginVertical: 4,
    color: "#FFFFFF",
  },
  image: {
    width: "50%",
    height: "50%",
  },

  button: {
    marginTop: -10,
    borderRadius: 30,
    height: 30,
    width: 100,
    alignSelf: 'center',
    backgroundColor: "#1c2227",
    
  },

  buttonText: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 5,
    fontSize: 13,
    color: "white",
    fontWeight: 'bold',
    textTransform: "uppercase",
  },

  description: {
    alignItems: "center",
    fontSize: 14,
    color: "#000000",
    textTransform: "uppercase",
    marginBottom: 10,
  },
});

export default CarBooking;
