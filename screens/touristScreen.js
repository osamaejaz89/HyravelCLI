import React, {useState, useEffect, useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TOURS } from "../data/dummy-tour";
import TouristItem from "../components/TouristItem";
import * as senderActions from "../store/actions/tour";
import { useSelector, useDispatch } from "react-redux";

const touristScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedTours = useSelector((state) => state.reducertour.tours);
  const dispatch = useDispatch();

  const loadTours = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.fetchTour());
    //setData(selectedDrivers);
    // setArrayHolder(selectedDrivers);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadTours);

    return () => {
      willFocusSub.remove();
    };
  }, [loadTours]);

  useEffect(() => {
    loadTours();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  console.log(selectedTours);
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
          onRefresh={loadTours}
          refreshing={isRefreshing}
          data={selectedTours}
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
