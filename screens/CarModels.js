import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { BRANDS, CARS } from "../data/dummy-data";
import CarItem from "../components/CarItem";

const CarDetails = (props) => {
  const cars = useSelector((state) => state.cars.availableCars);
  const renderCarItem = (itemData) => {
    return (
      <CarItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        price={itemData.item.price}
        onViewDetail={() => {
          props.navigation.navigate("CD", {
            carId: itemData.item.id,
            carTitle: itemData.item.title,
          });
        }}
        onBook={() => {
          props.navigation.navigate("Book", {
            carId: itemData.item.id,
            carTitle: itemData.item.title,
          });
        }}
        onSelectCar={() => {
          props.navigation.navigate("CD", {
            carId: itemData.item.id,
            carTitle: itemData.item.title,
          });
        }}
      />
    );
  };
  const catId = props.navigation.getParam("brandId");
  const displayedCars = CARS.filter((car) => car.brandIds.indexOf(catId) >= 0);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Select your Car</Text>
      <FlatList
        data={displayedCars}
        keyExtractor={(item, index) => item.id}
        renderItem={renderCarItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

CarDetails.navigationOptions = (navigationData) => {
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
  title: {
    fontSize: 25,
    fontWeight: "normal",
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default CarDetails;
