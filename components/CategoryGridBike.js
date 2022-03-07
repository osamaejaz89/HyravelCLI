import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const CategoryGridBike = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.image}
                source={{ uri: props.image }}
              ></ImageBackground>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 190,
    margin: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "85%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    color: "#212121",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    height: "5%",
    padding: 10,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default CategoryGridBike;
