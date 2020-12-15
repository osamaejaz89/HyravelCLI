import React from "react";
//import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Screen from "./Screen";
import * as firebase from "firebase";

import { Icon, Button, Container, Header, Content, Left } from "native-base";
import Category from "../components/Category";
import DateTime from "../components/Date";
const { height, width } = Dimensions.get("window");

export default class fourWheelScreen extends React.Component {
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
      <View style={styles.navigate}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={this.props.navigation.openDrawer}
          >
            <FontAwesome5 name="bars" size={24} color="#161924" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <View style={(styles.navigate, styles.container)}>
              <Text>Hi {this.state.displayName}!</Text>
            </View>

            <View>
              <DateTime />
            </View>
            <ScrollView scrollEventThrottle={16}>
              <View
                style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    paddingHorizontal: 20,
                  }}
                >
                  Choose Your Car
                </Text>

                <View style={{ height: 130, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <Category
                      imageUri={require("../assets/download.jpg")}
                      name="Suzuki"
                    />
                    <Category
                      imageUri={require("../assets/download.jpg")}
                      name="Honda"
                    />
                    <Category
                      imageUri={require("../assets/download.jpg")}
                      name="Toyota"
                    />
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("Car")}
                    >
                      <Category name="SEE ALL" />
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
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
  navigate: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    width: "80%",
    height: "10%",
    borderColor: "black",
    borderWidth: 3,
    padding: 10,
  },
});
