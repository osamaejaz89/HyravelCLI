import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as firebase from "firebase";

const LoadingScreen = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate(user ? "App" : "Auth");
    });
  }, [])
  return(      
  <ImageBackground
    source={require("../assets/aikor.png")}
    style={styles.image}
  >
    <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  </ImageBackground>
  )
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
