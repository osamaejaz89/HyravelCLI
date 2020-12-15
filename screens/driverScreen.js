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
import * as senderActions from "../store/actions/drivers";
import { useSelector, useDispatch } from "react-redux";

const driverScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);

  const selectedDrivers = useSelector((state) => state.reducerdriver.drivers);
  const dispatch = useDispatch();

  const loadDrivers = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.fetchDriver());
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
      <TouchableCmp>
        <View style={styles.product}>
          <View>
            <View style={styles.container}>
              <View>
                <Image source={require("../assets/pic.jpg")}  style={styles.avcont}/>
              </View>
              <Text style={styles.title}>{itemData.item.name}</Text>
              <Text style={styles.email}>{itemData.item.email}</Text>
              <Text style={styles.status}>{itemData.item.status}</Text>
              <Text style={styles.status}>{itemData.item.cnic}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate("DriverNotFound")}
            >
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableCmp>
    );
  };
  return (
    <View>
    <View style={{marginTop: 20, width: '13%'}}>
      <TouchableOpacity
        style={{ padding: 15 }}
        onPress={props.navigation.openDrawer}
      >
        <FontAwesome5 name="bars" size={24} color="#161924" />
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
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: -35,
    marginBottom: 40,
  },
  product: {
    width: "90%",
    maxWidth: "90%",
    height: 200,
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
    marginTop: -90,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "black",
    left: 60,
  },
  request: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 18,
    marginVertical: 4,
    color: "black",
    left: 60,
  },
  avcont:{
    borderRadius: 50,
    backgroundColor: '#1c2227',
    borderWidth: 2,
    borderColor: 'black',
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf:'flex-start',
    left: -95,  
},
  status: {
    fontSize: 18,
    marginVertical: 4,
    color: "black",
    left: 60,
  },
  image: {
    width: "50%",
    height: "50%",
  },

  button: {
    marginTop: -25,
    borderRadius: 30,
    height: 30,
    width: 100,
    alignSelf: 'flex-start',
    left: 50,
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
});

export default driverScreen;
