import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookActions from "../store/actions/bookbike";
import * as senderActions from "../store/actions/bikes";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { BottomPopup } from './BottomPopup';

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

  const [frommode, setfromMode] = useState("fromdate");
  const [tomode, settoMode] = useState("todate");

  const [fromshow, setfromshow] = useState(false);
  const [toshow, settoshow] = useState(false);
  const [status, setstatus] = useState('Pending');

  const [days, setdays] = useState("");
  const [charges, totalCharges] = useState("");

  const fromChange = (event, selectedDate) => {
    const currentfromDate = selectedDate || book_fromdate;
    setfromshow(Platform.OS === "ios");
    setfromdate(currentfromDate);
  };

  const toChange = (event, selectedtoDate) => {
    const currenttoDate = selectedtoDate || book_todate;
    settoshow(Platform.OS === "ios");
    settodate(currenttoDate);
  };

  const showFromMode = (currentfromMode) => {
    setfromshow(true);
    setfromMode(currentfromMode);
  };

  const showToMode = (currenttoMode) => {
    settoshow(true);
    settoMode(currenttoMode);
  };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };
  const showToDatepicker = () => {
    showToMode("todate");
  };
  const showFromDatepicker = () => {
    showFromMode("fromdate");
  };
  // const showDatepicker = () => {
  //   showMode('date');
  // };
  var popupref = React.createRef()
  const onShowPopup = () => {
    popupref.show()
  }

  const onClosePopup = () => {
    popupref.close()
  }
  let currentdays;
  currentdays = Math.round(
    (book_todate - book_fromdate) / (1000 * 60 * 60 * 24)
  );
  let currentcharges;
  currentcharges = currentdays * selectedBike.Bike_charges;

  return (
    <ScrollView style={{ backgroundColor: '#1c2227' }}>
      <View style={{ backgroundColor: 'transparent', flexDirection: 'row', }}>
        <TouchableOpacity
          style={{
            padding: 15,
            marginTop: 5,
            width: "15%",
            backgroundColor: "#1c2227",
          }}
          onPress={() => props.navigation.navigate("BikeDetails")}
        >
          <FontAwesome5 name="arrow-circle-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            marginTop: 5,
            width: "15%",
            left: 300,
            backgroundColor: "#1c2227",
          }}
          onPress={() => props.navigation.navigate("Home")}
        >
          <FontAwesome5 name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: selectedBike.url }} style={styles.image} />

      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>From Date</Text>

          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginTop: -30,
              width: "15%",
              backgroundColor: "#1c2227",
            }}
            onPress={showFromDatepicker} title="From Date"
          >
            <FontAwesome5 name="calendar-day" size={30} color="#fff" />
          </TouchableOpacity>

          {/* <Button style={styles.button}  /> */}
          <Text style={styles.result}>{moment(book_fromdate).format('MMMM, Do YYYY')}</Text>
          {fromshow && (
            <DateTimePicker
              testID="fromdate"
              value={book_fromdate}
              mode={frommode}
              is24Hour={true}
              display="calendar"
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
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginTop: -30,
              width: "15%",
              backgroundColor: "#1c2227",
            }}
            onPress={showToDatepicker} title="From Date"
          >
            <FontAwesome5 name="calendar-day" size={30} color="#fff" />
          </TouchableOpacity>

          {/* <Button onPress={showToDatepicker} title="To Date" /> */}
          <Text style={styles.result}>{moment(book_todate).format('MMMM, Do YYYY')}</Text>
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

          <Text style={{ color: '#D5FF00', fontSize: 15 }}>{currentdays} * {selectedBike.car_charges_driver}</Text>
          <Text style={{ color: '#D5FF00', fontSize: 15 }}>{currentcharges}</Text>
          <Text style={{ color: '#D5FF00', fontSize: 15, marginBottom: 20 }}>Status: {status}</Text>
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
            marginTop={-10}
            maxLength={13}
            id="CNIC"
            label="CNIC"
            keyboardType="numeric"
            placeholder="42201-1234567-1"
            placeholderTextColor="#929191"
            required
            autoCapitalize="none"
            value={book_cnic}
            onChangeText={(text) => setcnic(text)}
          />
        </View>
        {/* <View style={styles.formControl}>
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
        </View> */}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              // changeStatus

              await dispatch(
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
              // await dispatch(
              //   requestActions.bookRequest(
              //     currentcharges,
              //     currentdays,
              //     selectedBike.car_Brand,
              //     selectedBike.car_name,
              //     book_fromdate,
              //     book_todate,
              //     book_cnic,
              //     book_description,
              //     status,
              //   )
              // )

               popupref.show();

              settodate("");
              setfromdate("");
              setcnic("");
              setdescription("");
              setstatus("Pending")

              //props.navigation.pop(2)
            }}
          >
            {/* <TouchableWithoutFeedback onPress={onShowPopup}> */}
            <Text style={{ color: "#1c2227", fontSize: 18, fontWeight: 'bold' }}>BOOK</Text>
            {/* </TouchableWithoutFeedback> */}
            <BottomPopup
              title="Ride Booked"
              ref={(target) => popupref = target}
              onTouchOutside={onClosePopup} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

BookBikeScreen.navigationOptions = (navigationData) => {
  const carId = navigationData.navigation.getParam("carId");
  const selectedBike = vwcars.find((car) => car.id === carId);
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

  result: {
    color: '#ffc500',
    fontSize: 16,
    marginTop: -10,
    marginBottom: 20,
  },

  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  input: {
    color: '#ffc500',
    fontSize: 18,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  button: {
    marginTop: "15%",
    width: '40%',
    height: '25%',
    borderRadius: 30,
    backgroundColor: "#ffbc00",
    overflow: "hidden",
    padding: "3%",
    paddingHorizontal: "10%",
    alignItems: "center",
    elevation: 5,
    //flexDirection: "row"
  },
  image: {
    width: "70%",
    height: 200,
    alignSelf: 'center',
  },
});

export default BookBikeScreen;
