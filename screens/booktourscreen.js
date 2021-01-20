import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TouchableNativeFeedback,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as tourActions from "../store/actions/tour";

const booktour = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedTours = useSelector((state) => state.reducertour.booktours);
  const dispatch = useDispatch();

  const loadedBookTours = useCallback(async () => {
    setIsLoading(true);
    await dispatch(tourActions.fetchbookTour());

    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadedBookTours);

    return () => {
      willFocusSub.remove();
    };
  }, [loadedBookTours]);

  useEffect(() => {
    loadedBookTours();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  console.log(selectedTours);
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const renderBikeRider = (itemData) => {
    return (
      <TouchableCmp>
         <View style={styles.product}>
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>{itemData.item.displayName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.date}>{itemData.item.source}</Text>
                <Text style={{ fontSize: 13, color: "#1c2227", fontWeight: 'bold' }}> - </Text>
                <Text style={styles.date}>{itemData.item.destination}</Text>
               </View>
              <Text style={styles.cnic}>{itemData.item.status}</Text>

              <Text style={styles.description}>
                {itemData.item.book_description}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableCmp>
    );
  };
  return (
    <View>
    <View style={{marginTop: 30, width: '13%'}}>
    <TouchableOpacity
      style={{ padding: 15 }}
      onPress={props.navigation.openDrawer}
    >
      <FontAwesome5 name="bars" size={24} color="#161924" />
    </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <Text style={styles.ctitle}>Tour Bookings</Text>
    </View>

    <View style={{ padding: 10 }}>
      <FlatList
        onRefresh={loadedBookTours}
        refreshing={isRefreshing}
        data={selectedTours}
        keyExtractor={(item, index) => item.tourid}
        renderItem={renderBikeRider}
      />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  product: {
    width: "90%",
    maxWidth: "90%",
    height: 180,
    paddingVertical: "5%",
    shadowColor: "black",
    shadowOpacity: 0.86,
    shadowOffset: { width: 10, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    alignSelf:'center',
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "50%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
  },

  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "black",
    bottom: 5,
  },

  date: {
    fontSize: 13,
    fontWeight: '400',
    textTransform: "uppercase",
    color: "#1c2227",
  },
  
  cnic: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: "uppercase",
    color: "#1c2227",
    marginTop: 5,
  },

  tbutton: {
    fontSize: 18,
    marginVertical: 4,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  ctitle: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: -35,
    marginBottom: 40,
  },
  email: {
    fontSize: 18,
    marginVertical: 4,
    color: "#FFFFFF",
  },
  image: {
    width: "50%",
    height: "50%",
  },

  button: {
    marginTop: -10,
    borderRadius: 30,
    height: 30,
    width: 100,
    alignSelf: 'center',
    backgroundColor: "#1c2227",
    
  },

  buttonText: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 5,
    fontSize: 13,
    color: "white",
    fontWeight: 'bold',
    textTransform: "uppercase",
  },

  description: {
    alignItems: "center",
    fontSize: 14,
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 10,
  },
});
export default booktour;
