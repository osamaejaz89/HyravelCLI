import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
  ScrollView,
} from "react-native";

const TouristItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.product}>
        <Image style={styles.image} source={require("../assets/naran2.jpg")}/>
         <View style={styles.textView}>
           <Text style={styles.itemTitle}>{props.source} -</Text>
           <Text style={styles.itemTitle2}>{props.destination}</Text>
           <Text style={styles.itemDesc}></Text>
         </View>
          <View style={styles.actions}>
            <Button
              title="View Details"
              color="transparent"
              onPress={props.onViewDetail}
            />
            <Button title="Book" color="transparent" onPress={props.onBook} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  viewDetail:{
    marginTop: 18,
    borderRadius: 30,
    height: 35,
    width: 150,
    alignSelf: 'flex-start',
    left: 0,
    backgroundColor: "#ffcc00", 
  },
  
  product: {
    width: "85%",
    height: 400,
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    alignSelf:'center',
  },

  textView:{
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },

  image:{
    width: '100%',
    height: 400,
    borderRadius: 10,
  },

  itemTitle:{
    color: '#fff',
    fontSize: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight : 'bold',
    textTransform: 'uppercase',
    elevation: 5,
  },

  itemTitle2 :{
    color: '#fff',
    fontSize: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    marginTop: -10,
    fontWeight : 'bold',
    textTransform: 'uppercase',
    elevation: 5,
  },

  itemDesc:{
    color: '#fff',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 10,
    elevation: 5,
  },

  
  price: {
    right:'30%',
    fontSize: 18,
    marginTop: 6,
    marginBottom: 20,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -50,
    paddingHorizontal: 12,
  },
});

export default TouristItem;
