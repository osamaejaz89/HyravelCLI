import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import { DrawerNavigatorItems } from "react-navigation-drawer";
//import { Feather } from "@expo/vector-icons";

//import { Ionicons } from "@expo/vector-icons";
import Iconicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import * as firebase from "firebase";

state = {
  email: "",
  displayName: "",
};

signOutUser = () => {
  firebase.auth().signOut();
};
export default Sidebar = (props) => (
  <ScrollView>
    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>

    <View
      style={{
        padding: 10,
        marginLeft: 25,
      }}
    >
      <TouchableOpacity onPress={signOutUser}>
        <View style={{ flexDirection: "row", backgroundColor: '#ffc200', width: 150, height: 40, borderRadius: 30, marginTop: 280, justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ textAlign: 'center', justifyContent:'center', alignContent: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 6 }}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    color: "#53115B",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8,
  },
});
