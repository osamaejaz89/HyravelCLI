import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
// import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function Header({ navigation, title }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  const openProfile = () => {
    props.navigation.navigate("profilescreen");
  };

  return (
    <View style={styles.header}>
      {/* <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      /> */}
      <View>
        <Text style={styles.headerText}>Hyravel</Text>
      </View>

      {/* <MaterialIcons
        name="menu"
        size={28}
        onPress={openProfile}
        style={styles.righticon}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
  righticon: {
    position: "absolute",
    right: 16,
  },
});
