import React from "react";
//import React, { Component } from "react";

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import * as firebase from "firebase";

import { Icon, Button, Container, Header, Content, Left } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

export default class SettingsScreen extends React.Component {
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
      <View>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={this.props.navigation.openDrawer}
        >
          <FontAwesome5 name="bars" size={24} color="#161924" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text>Settings Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
