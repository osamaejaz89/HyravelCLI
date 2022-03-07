import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as requestActions from "../../store/actions/request";
import * as bookActions from "../../store/actions/book";
import * as senderActions from "../../store/actions/cars";

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
  Button,
  ActivityIndicator
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Footer } from "native-base";
import * as firebase from 'firebase';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';

const DriverRequestsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedRequests = useSelector((state) => state.reducerRequest.request);
  const dispatch = useDispatch();

  const loadedRequest = useCallback(async () => {
    setIsLoading(true);
    await dispatch(requestActions.fetchRequest());
    //setData(selectedCars);
    // setArrayHolder(selectedCars);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadedRequest);

    return () => {
      willFocusSub.remove();
    };
  }, [loadedRequest]);

  useEffect(() => {
    loadedRequest();
  }, [dispatch]);

  // if (!isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="black" />
  //     </View>
  //   );
  // }
  console.log(selectedRequests);
  const currentDriverId = auth().currentUser.uid;
  // const displayRequests = selectedRequests.filter((req) => { return req.driverId === currentDriverId});

  const [status, setstatus] = useState('');

  const changeStatus = () => {
    if(selectedRequests.status == 'Pending'){
      setstatus('Accept');
    }
    
  }
  // const displayedRequests = selectedRequests.filter((req) => req.status == 'Pending');

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const renderRider = (itemData) => {
    return (
      <TouchableCmp>
        <View style={styles.product}>
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>{itemData.item.username}</Text>
              {/* <View style={{ flexDirection: "row" }}>
                <Text style={styles.date}>From Date</Text>
                <Text style={{ fontSize: 13, color: "#1c2227", fontWeight: 'bold' }}> - </Text>
                <Text style={styles.date}>To Date</Text>
               </View> */}
              <Text style={styles.cnic}>{itemData.item.email}</Text>

              {/* <Text style={styles.description}>
                {itemData.item.status}
              </Text> */}
            </View>
          </View>
          <View style={{flex: 1 ,flexDirection: "row", justifyContent: 'center', marginTop: 18}}>
          <TouchableOpacity
              style={styles.b1}
              onPress = {() => {
                database().ref(`DriversRequests/${itemData.item.requestid}`).update({
                  status: 'Accept'
                }).then(() => console.log('Data Updated'))
                props.navigation.navigate('MapLocation', {requestKey: itemData.item.requestid})
              }}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            {itemData.item.status === 'Accept'&&<TouchableOpacity
              style={styles.b2}
              onPress = {() => {
                database().ref(`DriversRequests/${itemData.item.requestid}`).update({
                  conversationId: uuidv4()
                }).then(() => console.log('Data Updated'))
                props.navigation.navigate('driverconversations')
              }}
            >
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </TouchableCmp>
    );
  };
  return (
    <View style={{backgroundColor:'#1c2227', height:'100%'}}>
      {/* <View style={{marginTop: 30, width: '13%'}}>
      <TouchableOpacity
        style={{ padding: 15 }}
        onPress={props.navigation.openDrawer}
      >
        <FontAwesome5 name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      </View> */}
      <View style={styles.container}>
        <Text style={styles.ctitle}>Driver Requests</Text>
      </View>

      <FlatList
          onRefresh={loadedRequest}
          refreshing={isRefreshing}
          data={selectedRequests}
          keyExtractor={(item, index) => item.requestid}
          renderItem={renderRider}
        />
      
    </View>
  );
};

export default DriverRequestsScreen;

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
    backgroundColor: "#22272a",
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
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#ffc200",
    bottom: 5,
  },

  date: {
    fontSize: 16,
    fontWeight: '100',
    textTransform: "uppercase",
    color: "#fff",
  },
  
  cnic: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: "uppercase",
    color: "#fff",
    opacity : 0.7,
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

  b1:{
    width: 150,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#87D52E',
    alignSelf: 'center',
    marginRight: 20,
  },

  b2:{
    width: 150,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FF1E34',
    alignSelf: 'center'
  },

  buttonText: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 7,
    fontSize: 17,
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
