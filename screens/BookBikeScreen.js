import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookActions from "../store/actions/bookbike";
import * as senderActions from "../store/actions/bikes";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const BookBikeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);

  const selectedBikes = useSelector((state) => state.reducerbikes.bikes);
  const dispatch = useDispatch();

  const loadBikes = useCallback(async () => {
    setIsLoading(true);
    await dispatch(senderActions.fetchBike());
    //setData(selectedBikes);
    // setArrayHolder(selectedBikes);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadBikes);

    return () => {
      willFocusSub.remove();
    };
  }, [loadBikes]);

  useEffect(() => {
    loadBikes();
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="black" />
  //     </View>
  //   );
  // }
  console.log(selectedBikes);
  

  

  const bikeId = props.navigation.getParam("bikeId");
  const selectedBike = selectedBikes.find((bike) => bike.Bike_ID === bikeId);
  
  const [book_cnic, setcnic] = useState("");
  const [book_fromdate, setfromdate] = useState(new Date());
  const [book_todate, settodate] = useState(new Date());
  const [book_description, setdescription] = useState("");


  const [frommode, setfromMode] = useState('fromdate');
  const [tomode, settoMode] = useState('todate');
  
  const [fromshow,setfromshow] = useState(false);
  const [toshow,settoshow] = useState(false);
  
  const [days, setdays] = useState('');
  const [charges, totalCharges] = useState('');
  

  const fromChange = (event, selectedDate) => {
    const currentfromDate = selectedDate || book_fromdate;
    setfromshow(Platform.OS === 'ios');
    setfromdate(currentfromDate);
  };

  const toChange = (event, selectedtoDate) => {
    const currenttoDate = selectedtoDate || book_todate;
    settoshow(Platform.OS === 'ios');
    settodate(currenttoDate);
  };

  const showFromMode = (currentfromMode) => {
    setfromshow(true);
    setfromMode(currentfromMode);
  }
  

  const showToMode = (currenttoMode) => {
    settoshow(true);
    settoMode(currenttoMode);
  }

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };
  const showToDatepicker = () =>{
    showToMode('todate');
  }
  const showFromDatepicker = () =>{
    showFromMode('fromdate');
  }
  // const showDatepicker = () => {
  //   showMode('date');
  // };

  
  let currentdays;
    currentdays = Math.round((book_todate - book_fromdate)/(1000*60*60*24))
  let currentcharges;
    currentcharges = currentdays * selectedBike.Bike_charges;
  return (
    <ScrollView>
      <Image source={{uri: selectedBike.url}} style={styles.image} />

      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>From Date</Text>
          <Button onPress={showFromDatepicker} title="From Date" />
          <Text>{moment(book_fromdate).format('MMMM, Do YYYY')}</Text>
          {fromshow && (
        <DateTimePicker
          testID="fromdate"
          value={book_fromdate}
          mode={frommode}
          is24Hour={true}
          display="default"
          onChange={fromChange}
        />
      )}

          {/* <TextInput
            style={styles.input}
            id="FromDate"
            label="FromDate"
            keyboardType="default"
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#929191"
            required
            autoCapitalize="none"
            value={book_fromdate}
            onChangeText={(text) => setfromdate(text)}
          /> */}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>To Date</Text>
          <Button onPress={showToDatepicker} title="To Date" />
          <Text>{moment(book_todate).format('MMMM, Do YYYY')}</Text>
          {toshow && (
        <DateTimePicker
          testID="todate"
          value={book_todate}
          mode={tomode}
          is24Hour={true}
          display="default"
          onChange={toChange}
        />
      )}
      
        <Text>{currentdays} * {selectedBike.Bike_charges}</Text>
        <Text>{currentcharges}</Text>
          {/* <TextInput
            style={styles.input}
            id="toDate"
            label="toDate"
            keyboardType="default"
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#929191"
            required
            autoCapitalize="none"
            value={book_todate}
            onChangeText={(text) => settodate(text)}
          /> */}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>CNIC</Text>
          <TextInput
            style={styles.input}
            id="CNIC"
            label="CNIC"
            keyboardType="number-pad"
            placeholder="42201-1234567-1"
            placeholderTextColor="#929191"
            required
            autoCapitalize="none"
            value={book_cnic}
            onChangeText={(text) => setcnic(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            id="description"
            label="description"
            keyboardType="default"
            placeholder="Description"
            placeholderTextColor="#929191"
            required
            autoCapitalize="none"
            value={book_description}
            onChangeText={(text) => setdescription(text)}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(
                bookActions.bookBike(
                  currentcharges,
                  currentdays,
                  selectedBike.Bike_Brand,
                  selectedBike.Bike_name,
                  book_fromdate,
                  book_todate,
                  book_cnic,
                  book_description
                )
              );

              settodate("");
              setfromdate("");
              setcnic("");
              setdescription("");

              props.navigation.pop(2);
            }}
          >
            <Text style={{ color: "#ffffff" }}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// BookBikeScreen.navigationOptions = (navigationData) => {
//   const bikeId = navigationData.navigation.getParam("bikeId");
//   const selectedBike = selectedBikes.find((bike) => bike.id === bikeId);
// };
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  button: {
    marginTop: "1%",
    borderRadius: 20,
    backgroundColor: "#E9446A",
    overflow: "hidden",
    padding: "3%",
    paddingHorizontal: "10%",
    alignItems: "center",
    elevation: 5,
    //flexDirection: "row"
  },
  image: {
    width: "100%",
    height: 200,
  },
});

export default BookBikeScreen;
