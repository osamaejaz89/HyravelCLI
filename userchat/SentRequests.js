import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSocket} from '../../context/SocketProvider';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as requestAction from '../../store/actions/requests';
import * as firebase from 'firebase';

const SentRequest = (props) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const currentUser = firebase.auth().currentUser.uid;
  const selectedRequests = useSelector((state) => state.requests.requests);
  const selectedReceivedRequests = selectedRequests.filter((req) => {
    return req.receiverId === currentUser;
  });

  const [receivedRequest, setReceivedRequest] = useState([]);
  const [reduxReceivedRequest, setReduxReceivedRequest] = useState(
    selectedReceivedRequests ? selectedReceivedRequests : [],
  );
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    socket.on('chat request', async (msg) => {
      console.log('received', msg);
      setReceivedRequest((oldRequest) => [...oldRequest, msg]);
      setReceiverId(msg.message.receiverId);
    });
  }, []);

  const loadReceivers = useCallback(async () => {
    await dispatch(requestAction.fetchRequests());
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadReceivers,
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadReceivers]);

  console.log(receivedRequest);

  if (receivedRequest.length !== 0 && reduxReceivedRequest.length === 0) {
    if (receiverId === currentUser) {
      return (
        <ScrollView>
          <View style={styles.screen}>
            {receivedRequest.map((requests) => {
              return (
                <View style={styles.request}>
                  <Text style={styles.requestInfo}>
                    {requests.message.senderName} has requested to negotiate
                    with you!
                  </Text>

                  <View style={styles.options}>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="check-circle"
                        color="green"
                        size={30}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="text-box"
                        color="#232252"
                        size={30}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Entypo name="circle-with-cross" color="red" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  } else if (reduxReceivedRequest.length !== 0) {
    return (
      <ScrollView>
        <View style={styles.screen}>
          {reduxReceivedRequest.map((requests) => {
            return (
              <View style={styles.request}>
                <Text style={styles.requestInfo}>
                  {requests.senderName} has requested to negotiate with you!
                </Text>

                <View style={styles.options}>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="check-circle"
                      color="green"
                      size={30}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="text-box"
                      color="#232252"
                      size={30}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Entypo name="circle-with-cross" color="red" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  } else if (reduxReceivedRequest.length === 0) {
    return (
      <View style={styles.screen2}>
        <Text style={{fontSize: 15}}>No chat request has been received!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },

  screen2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  request: {
    display: 'flex',
    backgroundColor: 'white',
    width: '95%',
    paddingBottom: 10,
    marginBottom: 5,
    paddingTop: 10,
    borderRadius: 15,
    borderBottomColor: '#E0E2E3',
    borderBottomWidth: 2,
    elevation: 2,
    alignItems: 'center',
  },

  requestInfo: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
  },

  options: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
});

export default SentRequest;
