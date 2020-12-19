import React, {Component} from 'react';
import {View, Image, Button, StyleSheet, Text, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database'
// import {DestinationButton} from './MapDestination';
class PickLocation extends Component {
  
  requestKey = (props) => {
    const reqKey = props.navigation.getParam('requestKey');
    return reqKey;
  }

  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122,
    },
    locationChosen: false,
  };

  pickLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    console.log('Position Latitude' + coords.latitude);
    console.log('Position Longitude' + coords.longitude);
    this.setState((prevState) => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        locationChosen: true,
      };
    });
  };

  getLocationHandler = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        };
        this.pickLocationHandler(coordsEvent);
        const reqKey = this.props.navigation.getParam('requestKey');
        console.log(reqKey);
        const driverlocation = database().ref(`DriversRequests/${reqKey}/DriverLocation`);
        driverlocation.set({
          latitude: coordsEvent.nativeEvent.coordinate.latitude,
          longitude: coordsEvent.nativeEvent.coordinate.longitude
        })
        console.log("Latitude " + coordsEvent.nativeEvent.coordinate.latitude)
        console.log("Longitude " + coordsEvent.nativeEvent.coordinate.longitude)
      },
      (err) => {
        console.log(err);
        alert('Fetching the Position failed, please pick one manually!');
      },
    );
  };

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        {/* <DestinationButton /> */}

        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={(ref) => (this.map = ref)}>
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" 
          onPress={this.getLocationHandler}/>
        </View>
        <View>
          {/* <Button title = 'Pickup Location' onPress={this.pickLocationHandler}/> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '75%',
  },
  button: {
    margin: 8,
  },
});

export default PickLocation;
