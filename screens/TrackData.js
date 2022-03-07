import React, { useState, useEffect, useCallback } from "react";
import MapView, { Polyline } from "react-native-maps";
import database from "@react-native-firebase/database";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Button
} from "react-native";
const MapLines = (props) => {
  const key = props.navigation.getParam("reqKey");
  const [Driver, setDriver] = useState([]);
  const [User, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLines = useCallback(async () => {
    setIsLoading(true);
    const DriverLocation = await database().ref(
      `DriversRequests/${key}/DriverLocation`
    );
    const UserLocation = await database().ref(
      `DriversRequests/${key}/UserLocation`
    );
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
    latitude: 24.8607,
    longitude: 67.0011,
  };

  const Hyderabad = {
    latitude: 24.7244,
    longitude: 68.8228,
  };
  useEffect(() => {
    console.log("Hyderabad Location: ", Hyderabad);
    console.log("User Location ", User);
  }, []);

  const next = () => {
    props.navigation.navigate('TrackLines',{UserLocation: User, DriverLocation: Driver})
};

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style = {{flex:1, justifyContent: "center", alignContent: "center"}}>
      <Text>User Longitude : {[User.longitude]}</Text>
      <Text>User Latitude : {[User.latitude]}</Text>
      <Text>Driver Longitude : {[Driver.longitude]}</Text>
      <Text>Driver Latitude : {[Driver.latitude]}</Text>

      <View>
          <Button title = 'Map' onPress = {next}/>
      </View>
    </View>
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