import React, {useCallback, useEffect, useState} from "react";
import MapView, { Polyline } from "react-native-maps";
import database from '@react-native-firebase/database';

const MapLines = (props) => {
  
  const key = props.navigation.getParam('reqKey');
  const [Driver, setDriver] = useState([]);
  const [User, setUser] = useState([]);
      useEffect(() => {
        const DriverLocation = database().ref(`DriversRequests/${key}/DriverLocation`);
        DriverLocation.on("value", datasnap=>{
          setDriver(datasnap.val())
          console.log(Driver);
        })
     }, []);
     
   
   useEffect(() => {
    const UserLocation = database().ref(`DriversRequests/${key}/UserLocation`);
    UserLocation.on("value", datasnap=>{
      setUser(datasnap.val())
      console.log(User);
    })
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
    longitude: 67.0011
  };

  const Hyderabad = {
    latitude: 27.7244,
    longitude: 68.8228
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
        <Polyline coordinates={[Karachi, Hyderabad]} />
      </MapView>
    </>
  );
};

export default MapLines;