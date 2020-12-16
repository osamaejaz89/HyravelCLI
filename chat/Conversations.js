import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import * as firebase from 'firebase';
import {useSocket} from '../../context/SocketProvider';

const Conversations = (props) => {
  const currentUserId = firebase.auth().currentUser.uid;
  const socket = useSocket();

  const selectedRequests = useSelector((state) => state.requests.requests);

  const acceptedRequests = selectedRequests.filter((req) => {
    return req.status === 'accepted';
  });

  const currentUserAcceptedRequests = acceptedRequests.filter((req) => {
    return req.senderId === currentUserId || req.receiverId === currentUserId;
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
        const senderName = req.senderName.replace(/ /g, '');
        const receiverName = req.receiverName.replace(/ /g, '');
        const currentUserName = firebase
          .auth()
          .currentUser.displayName.replace(/ /g, '');

        return (
          <TouchableOpacity
            style={styles.conversationBox}
            onPress={async () => {
              await socket.emit('join', {conversationId: req.conversationId});
              props.navigation.push('ChatMessages', {
                conversationId: req.conversationId,
                currentUserName:
                  currentUserName === senderName ? receiverName : senderName,
              });
            }}>
            <View>
              <Image
                style={styles.avatar}
                source={require('../../assets/blank.png')}
              />
            </View>

            <View>
              <Text style={styles.userName}>
                {currentUserName === senderName ? receiverName : senderName}
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
