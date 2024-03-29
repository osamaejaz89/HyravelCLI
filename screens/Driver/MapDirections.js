import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
const Berlin = {
  latitude: 52.5200066,
  longitude: 13.404954
};

const Frankfurt = {
  latitude: 50.1109221,
  longitude: 8.6821267
};
const getDirections = async (startLoc, destinationLoc) => {
  try {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyBErrMXZq4k2D8x-F7_pMHZ1kZAO4ipYXw`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};

const App = () => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    getDirections("52.5200066,13.404954", "50.1109221,8.6821267")
      .then(coords => setCoords(coords))
      .catch(err => console.log("Something went wrong"));
  }, []);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 52.5200066,
          longitude: 13.404954,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {coords.length > 0 && <Polyline coordinates={coords} 
          strokeColor = "red"
          strokeWidth={1}
        />}
      </MapView>
    </>
  );
};

export default App;