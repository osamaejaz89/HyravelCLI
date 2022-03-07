import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase'
import {useSocket} from '../context/SocketProvider';

const Conversations = (props) => {
  const currentUserId = auth().currentUser.uid;
  const socket = useSocket();
  const selectedRequests = useSelector((state) => state.reducerRequest.request);

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

  
  return (
    <View style={styles.screen}>
      {currentUserAcceptedRequests.map((req) => {
        const username = req.username;
        const driverName = req.driverName;
        const currentUserName = auth().currentUser.displayName;
        useEffect(() => {
        console.log(req.conversationId);
 }, []);
        return (
          <TouchableOpacity
            style={styles.conversationBox}
            onPress={async () => {
              await socket.emit('join', {conversationId: req.conversationId});
              props.navigation.push('driverChat', {
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
