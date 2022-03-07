import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase'
import Feather from "react-native-vector-icons/Feather";
import {ScrollView} from 'react-native';

const Messages = (props) => {
  return (
    <View style={styles.screen}>
      {props.chatMessages.map((chatMessage) => {
        return chatMessage.userId === auth().currentUser.uid ? (
          <View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'flex-end',
                width: '100%',
                display: 'flex',
              }}>
              <View style={styles.dummyCurrentMsg}>
                <Text style={styles.dummyCurrentText} key={chatMessage.message}>
                  {chatMessage.message}
                </Text>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'flex-start',
                width: '100%',
                display: 'flex',
              }}>
              <View style={styles.dummyReceivedMsg}>
                <Text
                  style={styles.dummyReceivedText}
                  key={chatMessage.message}>
                  {chatMessage.message}
                </Text>
              </View>
            </ScrollView>
          </View>
        );
      })}

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          onChangeText={(chatMessage) => {
            props.getMessages(chatMessage);
          }}
          value={props.message}
          placeholder="Type a message"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => props.submitFunction()}>
          <Feather name="send" color="white" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },

  inputArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },

  input: {
    borderColor: '#F0F0F0',
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'white',
    width: '83%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 6,
    elevation: 2,
    paddingLeft: 20,
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
  },

  sendButton: {
    backgroundColor: '#232252',
    width: '13%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 6,
    marginBottom: 10,
  },

  dummyCurrentMsg: {
    backgroundColor: '#232252',
    maxWidth: '82%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  dummyReceivedMsg: {
    backgroundColor: 'white',
    maxWidth: '82%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: '#F0F0F0',
    borderWidth: 2,
  },

  dummyCurrentText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
  },

  dummyReceivedText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#232252',
  },
});

export default Messages;
