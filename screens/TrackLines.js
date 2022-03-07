import React, { useState, useEffect, useCallback } from "react";
import MapView, { Polyline } from "react-native-maps";
import database from "@react-native-firebase/database";
import * as firebase from "firebase";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
const MapLines = (props) => {
  const key = props.navigation.getParam("reqKey");
  const UserL = props.navigation.getParam("UserLocation");
  const DriverL = props.navigation.getParam("DriverLocation");
  const [Driver, setDriver] = useState([]);
  const [User, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLines = useCallback(async () => {
    setIsLoading(true);
    const DriverLocation = await firebase
      .database()
      .ref(`DriversRequests/${key}/DriverLocation`);
    const UserLocation = await firebase
      .database()
      .ref(`DriversRequests/${key}/UserLocation`);
    DriverLocation.on("value", (datasnap) => {
      setDriver(datasnap.val());
      console.log("Driver Location ", Driver);
    });
    UserLocation.on("value", (datasnap) => {
      setUser(datasnap.val());
      console.log("User Location ", User);
    });
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadLines);

    return () => {
      willFocusSub.remove();
    };
  }, [loadLines]);

  useEffect(() => {
    loadLines();
  }, []);
  //  const loadSenders = useCallback(async () => {
  //   const DriverLocation = await database().ref(`DriversRequests/${key}/DriverLocation`);
  //   DriverLocation.on("value", datasnap=>{
  //     console.log(datasnap.val())
  //   })
  //  })

  //  useEffect(() => {
  //   console.log(loadSenders);
  // }, []);

  const Karachi = {
    latitude: 24.9323822,
    longitude: 67.1584579,
  };

  const Hyderabad = {
    latitude: 24.8568432 ,
    longitude: 67.2645954,
  };
  useEffect(() => {
    console.log("Hyderabad Location: ", Hyderabad);
    console.log("User Location ", User);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      initialRegion={{
        latitude: 24.8607,
        longitude: 67.0011,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122,
      }}
    >
      <Polyline 
          coordinates={[Karachi, Hyderabad]} 
          strokeColor={'red'}
          strokeWidth={6}
        />
    </MapView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "75%",
  },
  button: {
    margin: 8,
  },
});

export default MapLines;
