import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as Animatable from "react-native-animatable";

export default class SplashComponent extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/aikor.png")}
        style={styles.image}
        animation={"adeInUpBig"}
      >
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}></View>
          <Animatable.View style={styles.footer} animation={"fadeInUpBig"}>
            <Text style={styles.title} animation={"ZoomInDown"}>
              Driver
            </Text>

            <TouchableOpacity
              style={styles.button}
              animation={"bounceIn"}
              onPress={() => this.props.navigation.navigate("DriverSignIn")}
            >
              <Text style={{ color: "#fff", fontWeight: "500" }}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.abutton}
              onPress={() => this.props.navigation.navigate("DriverRegister")}
            >
              <Text style={{ color: "black", fontWeight: "500" }}>Sign Up</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ImageBackground>
    );
  }
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.5 * 0.4;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  logo: {
    width: 300,
    height: height_logo,
  },

  title: {
    color: "#1F1F1F",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    marginHorizontal: 50,
    marginTop: 50,
    backgroundColor: "#E9446A",
    borderRadius: 30,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  abutton: {
    marginHorizontal: 50,
    marginTop: 10,
    borderColor: "#E9446A",
    borderWidth: 2,
    borderRadius: 30,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  SignIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
