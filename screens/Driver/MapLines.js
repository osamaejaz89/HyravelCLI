import React from "react";
import MapView, { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const MapLines = () => {
  const Berlin = {
    latitude: 52.5200066,
    longitude: 13.404954
  };

  const Frankfurt = {
    latitude: 50.1109221,
    longitude: 8.6821267
  };

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
      <MapViewDirections
        origin={Berlin}
        destination={Frankfurt}
        apikey={'AIzaSyBErrMXZq4k2D8x-F7_pMHZ1kZAO4ipYXw'}
        strokeWidth={3}
        strokeColor='hotpink'
        mode='DRIVING'
      />
        <Polyline coordinates={[Berlin, Frankfurt]} />
      </MapView>
    </>
  );
};

export default MapLines;