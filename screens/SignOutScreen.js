import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
import * as firebase from "firebase";

export default class SignOutScreen extends React.Component {
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
        <Text>SignOut Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
