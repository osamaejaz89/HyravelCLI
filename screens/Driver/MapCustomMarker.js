import React, { useState } from "react";
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

const MapCustomMarker = () => {
  const [region, setRegion] = useState({
    latitude: 52.5200066,
    longitude: 13.404954,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  });

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={region => setRegion(region)}
    >
      <Marker coordinate={{ latitude: 52.5200066, longitude: 13.404954 }}>
        <CustomMarker />
      </Marker>
    </MapView>
  );
};

export default MapCustomMarker;