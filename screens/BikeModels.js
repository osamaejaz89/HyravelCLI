import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { BRANDS, BIKES } from "../data/dummy-bike";
import BikeItem from "../components/BikeItem";

const BikeDetails = (props) => {
  const bikes = useSelector((state) => state.bikes.availableBikes);
  const renderBikeItem = (itemData) => {
    return (
      <BikeItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        price={itemData.item.price}
        onViewDetail={() => {
          props.navigation.navigate("BD", {
            bikeId: itemData.item.id,
            bikeTitle: itemData.item.title,
          });
        }}
        onBook={() => {
          props.navigation.navigate("BookBike", {
            bikeId: itemData.item.id,
            bikeTitle: itemData.item.title,
          });
        }}
        onSelectBike={() => {
          props.navigation.navigate("BD", {
            bikeId: itemData.item.id,
            bikeTitle: itemData.item.title,
          });
        }}
      />
    );
  };
  const catId = props.navigation.getParam("brandId");
  const displayedBikes = BIKES.filter(
    (bike) => bike.brandIds.indexOf(catId) >= 0
  );
  return (
    <View style={styles.screen}>
      <Text>The Bike Model Screen</Text>
      <FlatList
        data={displayedBikes}
        keyExtractor={(item, index) => item.id}
        renderItem={renderBikeItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

BikeDetails.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("brandId");
  const selectedbrand = BRANDS.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedbrand.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BikeDetails;
