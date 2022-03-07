import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Picker,
  Button,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as senderActions from "../store/actions/currentDriver";
import { useSelector, useDispatch } from "react-redux";
import * as firebase from 'firebase';
import * as requestActions from "../store/actions/request";
import * as chatActions from "../store/actions/chatrequest"
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';
const driverScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);

  const selectedDrivers = useSelector((state) => state.currentDriver.drivers);
  const selectedRequests = useSelector((state) => state.reducerRequest.request);
  
  const dispatch = useDispatch();

  const loadDrivers = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.FetchDrivers());
    //setData(selectedDrivers);
    // setArrayHolder(selectedDrivers);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadDrivers);

    return () => {
      willFocusSub.remove();
    };
  }, [loadDrivers]);

  useEffect(() => {
    loadDrivers();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  console.log(selectedDrivers);
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  
  const renderDriver = (itemData) => {
    return (
      
        <View style={styles.product}>
          <View>
            <View style={styles.container}>
              <View>
                <Image source={require("../assets/pic.jpg")}  style={styles.avcont}/>
              </View>
              <Text style={styles.title}>{itemData.item.username}</Text>
              <Text style={styles.email}>{itemData.item.email}</Text>
              <Text style={styles.status}>{itemData.item.status}</Text>
              <Text style={styles.cnic}>{itemData.item.cnic}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={async() => {
              
              await dispatch(
                requestActions.bookRequest(
                      firebase.auth().currentUser.displayName,
                      firebase.auth().currentUser.email,
                      itemData.item.id,
                      itemData.item.username
                  )
              )
              

            }}            >
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 160, marginTop: -30, left: 130}}>
            <FontAwesome5 name="phone" size={28} color="#ffc200" />
            <TouchableOpacity onPress={async() => {
                // await dispatch(
                //   chatActions.saveRequests(
                //     firebase.auth().currentUser.uid,
                //     itemData.item.id,
                //     itemData.item.username,
                //     firebase.auth().currentUser.displayName
                //   )
                // )
                props.navigation.navigate('userconversations', {conversationId: uuidv4()})
                }
                }>
              <FontAwesome5 name="comment-dots" size={28} color="#ffc200" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  };
  return (
    <View style={{backgroundColor:'#22272a'}}>
    <View style={{marginTop: 20, width: '13%'}}>
      <TouchableOpacity
        style={{ padding: 15 }}
        onPress={props.navigation.openDrawer}
      >
        <FontAwesome5 name="bars" size={24} color="#fff" />
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.driver}>Available Drivers</Text>
      </View>
     
      <FlatList
        data={selectedDrivers}
        keyExtractor={(item, index) => item.id}
        renderItem={renderDriver}
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
  himage:{
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  driver: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase",
    marginTop: -35,
    marginBottom: 40,
    color:'#fff',
  },
  product: {
    width: "92%",
    maxWidth: "92%",
    height: 200,
    paddingVertical: "5%",
    shadowColor: "black",
    shadowOpacity: 0.86,
    shadowOffset: { width: 10, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 30,
    alignSelf:'center',
    backgroundColor: "#1c2227",
    marginBottom: 15,
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
    marginTop: -100,
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
    left: 60,
  },
  request: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 15,
    marginTop: 10,
    color: "#646464",
    fontWeight: 'bold',
    left: 60,
  },
  avcont:{
    borderRadius: 50,
    backgroundColor: '#1c2227',
    borderWidth: 2,
    borderColor: '#fff',
    width: 100,
    height: 100,
    marginTop: 5,
    alignSelf:'flex-start',
    left: -95,  
},
  status: {
    fontWeight: 'bold',
    fontSize: 15,
    color: "#32CD32",
    left: 60,
  },

  cnic:{
    fontWeight: 'bold',
    fontSize: 15,
    color: "#646464",
    left: 60,
  },
  image: {
    width: "50%",
    height: "50%",
  },

  button: {
    marginTop: 18,
    borderRadius: 30,
    height: 35,
    width: 150,
    alignSelf: 'flex-start',
    left: 25,
    backgroundColor: "#ffcc00", 
  },

  buttonText: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 5,
    fontSize: 18,
    color: "#1c2227",
    fontWeight: 'bold',
    textTransform: "uppercase",
  },
});

export default driverScreen;
