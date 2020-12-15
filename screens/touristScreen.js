import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TOURS } from "../data/dummy-tour";
import TouristItem from "../components/TouristItem";

const touristScreen = (props) => {
  const renderTourist = (itemData) => {
    return (
      <TouristItem
        source={itemData.item.source}
        destination={itemData.item.destination}
        description={itemData.item.description}
        
      />
    );
  };
  return (
    <View>
      <TouchableOpacity
        style={{ padding: 15, marginTop: 35 }}
        onPress={props.navigation.openDrawer}
      >
        <FontAwesome5 name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Select your Tour</Text>
      </View>

      <View>
        <FlatList
          data={TOURS}
          keyExtractor={(item, index) => item.id}
          renderItem={renderTourist}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "normal",
    textTransform: "uppercase",
    marginTop: -70,
  },
});

export default touristScreen;
