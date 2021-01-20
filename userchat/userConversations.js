import React, { useState, useEffect, useCallback } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase'
import {useSocket} from '../context/SocketProvider';
import * as requestActions from "../store/actions/request";

const Conversations = (props) => {
  const currentUserId = firebase.auth().currentUser.uid;
  const socket = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedRequests = useSelector((state) => state.reducerRequest.request);
  const dispatch = useDispatch();

  const loadedRequest = useCallback(async () => {
    setIsLoading(true);
    await dispatch(requestActions.fetchRequest());
    //setData(selectedCars);
    // setArrayHolder(selectedCars);
    setIsLoading(false);
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadedRequest);

    return () => {
      willFocusSub.remove();
    };
  }, [loadedRequest]);

  useEffect(() => {
    loadedRequest();
  }, [dispatch]);
  
//   useEffect(() => {
//     const UserLocation = database().ref(`DriversRequests/${key}/UserLocation`);
//     UserLocation.on("value", datasnap=>{
//       setUser(datasnap.val())
//       console.log(User);
//     })
//  }, []);

  
  const acceptedRequests = selectedRequests.filter((req) => {
    return req.status === 'Accept';
  });

  

  const currentUserAcceptedRequests = acceptedRequests.filter((req) => {
    return req.driverId === currentUserId || req.userId === currentUserId;
  });

  
  if (currentUserAcceptedRequests.length === 0) {
    return (
      <View style={styles.screen2}>
        <Text>No conversations found!</Text>
      </View>
    );
  }
  console.log(currentUserAcceptedRequests);
// return(
//   <View>
//     <Text>Conversations</Text>
//   </View>
// )
  return (
    <View style={styles.screen}>
      {currentUserAcceptedRequests.map((req) => {
        const username = req.username;
        const driverName = req.driverName;
        const currentUserName = firebase.auth().currentUser.displayName;
        
        return (
          <TouchableOpacity
            style={styles.conversationBox}
            onPress={async () => {
              await socket.emit('join', {conversationId: req.conversationId});
              props.navigation.push('userChat', {
                conversationId: req.conversationId,
                currentUserName:
                  currentUserName === username ? driverName : username,
              });
            }}>
            <View>
              <Image
                style={styles.avatar}
                source={require('../assets/blank.png')}
              />
            </View>

            <View>
              <Text style={styles.userName}>
                {currentUserName === username ? driverName : username}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
 };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 8,
    alignItems: 'center',
  },

  screen2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  conversationBox: {
    width: '95%',
    height: '12%',
    borderColor: '#E0E2E3',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70,
    resizeMode: 'contain',
  },

  userName: {
    marginTop: '7%',
    marginLeft: '6%',
    fontWeight: 'bold',
  },
});

export default Conversations;
