import React from "react";
//import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import * as firebase from "firebase";

import { Icon, Button, Container, Header, Content, Left } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

export default class DriverNotFound extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }
  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/dnf.jpg")}
        style={styles.image}
      >
        <View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.abutton}
              onPress={() => props.navigation.navigate('driverScreen')}
            >
              <Text style={{ color: "#fff", fontWeight: '600', fontSize: 20 }}>
                TRY AGAIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    marginTop: -60,
    resizeMode: "cover",
    justifyContent: "center",
  },

  abutton: {
    marginTop: 300,
    alignSelf: 'center',
    backgroundColor: "#E9446A",
    borderRadius: 50,
    height: 70,
    width: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});
