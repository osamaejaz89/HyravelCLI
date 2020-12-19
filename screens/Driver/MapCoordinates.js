import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";

const CustomMarker = () => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#007bff",
        borderColor: "#eee",
        borderRadius: 5,
        elevation: 10
      }}
    >
      <Text style={{ color: "#fff" }}>Berlin</Text>
    </View>
  );
  

const App = () => {
  const _map = useRef(null);

  useEffect(() => {
    if(_map.current) {
      _map.current.animateCamera(
        {
          center: {
            latitude: 50.1109221,
            longitude: 8.6821267
          },
          zoom: 15
        },
        5000
      );
    }
  }, []);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        ref={_map}
        initialRegion={{
          latitude: 52.5200066,
          longitude: 13.404954,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        <Marker coordinate={{ latitude: 52.5200066, longitude: 13.404954 }}>
          <CustomMarker />
        </Marker>
      </MapView>
    </>
  );
};

export default App;
