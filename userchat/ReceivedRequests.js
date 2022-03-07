import 'react-native-get-random-values';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as requestAction from '../../store/actions/requests';
import * as firebase from 'firebase';
import SwitchSelector from 'react-native-switch-selector';
import * as usersActions from '../../store/actions/currentUser';

import {v4 as uuidv4} from 'uuid';
import {useNotification} from '../../context/NotificationProvider';
// import {FlatList} from 'react-native-gesture-handler';

const ReceivedRequest = (props) => {
  let status = 'pending';
  let status2 = '';
  let conversationId = '';

  const displayName = firebase.auth().currentUser.displayName + ' ';
  var notificationBody =
    status2 === 'declined'
      ? 'declined your negotiation request'
      : 'accepted your negotiation request';
  const title = 'New negotiation request!';
  const content = displayName + notificationBody;

  const dispatch = useDispatch();
  const sendNotification = useNotification();
  const currentUser = firebase.auth().currentUser.uid;
  const selectedRequests = useSelector((state) => state.requests.requests);
  const users = useSelector((state) => state.currentUser.users);

  /*------------------------Receiver-------------------------------*/
  const selectedReceivedRequests = selectedRequests.filter((req) => {
    return req.receiverId === currentUser;
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  /*-----------------------Sender--------------------------------*/
  const selectedSentRequests = selectedRequests.filter((req) => {
    return req.senderId === currentUser;
  });

  /*------------------------------------------------------------*/

  const [switchState, setSwitchState] = useState('Received');
  const [requestStatus, setRequestStatus] = useState(status);

  /*----------------------Effects------------------------------*/

  const loadReceivers = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(requestAction.fetchRequests());
    await dispatch(usersActions.FetchUsers());
    setIsRefreshing(false);
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

  const findDeviceToken = (senderId) => {
    var y;
    var foundDeviceTokens = [];

    for (y in users) {
      if (senderId === y) {
        foundDeviceTokens.push(users[y].deviceToken);
      }
    }

    sendNotification(foundDeviceTokens, title, content);
  };

  /*---------------------OnPressFunctions-----------------------*/
  const toggleStatus = async (
    requestId,
    conversationId,
    senderName,
    receiverName,
    senderId,
    receiverId,
    receiverRequestId,
    senderRequestId,
  ) => {
    setRequestStatus(status2);

    await firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        dispatch(
          requestAction.updateRequest(
            requestId,
            status2,
            conversationId,
            token,
            senderName,
            receiverName,
            senderId,
            receiverId,
            receiverRequestId,
            senderRequestId,
          ),
        );
      });

    findDeviceToken(senderId);
  };

  const options = [
    {label: 'Received', value: 'Received'},
    {label: 'Sent', value: 'Sent'},
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={loadReceivers} refreshing={isRefreshing} />
      }>
      <View>
        <View>
          <SwitchSelector
            initial={0}
            onPress={(value) => setSwitchState(value)}
            textColor="#232252"
            selectedColor="white"
            buttonColor="#232252"
            borderColor="#232252"
            hasPadding
            style={{marginHorizontal: 30, marginTop: 5}}
            options={options}
          />
        </View>

        {/*--------------------------------------------------Receiver------------------------------------------------*/}
        {switchState === 'Received' && (
          <View>
            {selectedReceivedRequests.length !== 0 ? (
              <View>
                <View style={styles.screen}>
                  {selectedReceivedRequests.map((requests) => {
                    status = requests.status;
                    return (
                      <View
                        style={
                          requests.status === 'declined' ||
                          requestStatus === 'declined'
                            ? styles.request2
                            : requests.status === 'accepted' ||
                              requestStatus === 'accepted'
                            ? styles.request3
                            : styles.request
                        }>
                        <Text
                          style={
                            requests.status === 'declined' ||
                            requestStatus === 'declined'
                              ? styles.requestInfo2
                              : requests.status === 'accepted' ||
                                requestStatus === 'accepted'
                              ? styles.requestInfo3
                              : styles.requestInfo
                          }>
                          {requests.senderName} has requested to negotiate with
                          you!
                        </Text>

                        {requests.status === 'pending' &&
                        requestStatus === 'pending' ? (
                          <View style={styles.options}>
                            <TouchableOpacity
                              onPress={() => {
                                status2 = 'accepted';
                                conversationId = uuidv4();
                                toggleStatus(
                                  requests.requestId,
                                  conversationId,
                                  requests.senderName,
                                  requests.receiverName,
                                  requests.senderId,
                                  requests.receiverId,
                                  requests.receiverRequestId,
                                  requests.senderRequestId,
                                );
                              }}>
                              <MaterialIcons
                                name="check-circle"
                                color="green"
                                size={30}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                props.navigation.navigate('chatRequests', {
                                  receiverRequestId: requests.receiverRequestId,
                                  senderRequestId: requests.senderRequestId,
                                });
                              }}>
                              <MaterialCommunityIcons
                                name="text-box"
                                color="#232252"
                                size={30}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                status2 = 'declined';

                                toggleStatus(
                                  requests.requestId,
                                  conversationId,
                                  requests.senderName,
                                  requests.receiverName,
                                  requests.senderId,
                                  requests.receiverId,
                                  requests.receiverRequestId,
                                  requests.senderRequestId,
                                );
                              }}>
                              <Entypo
                                name="circle-with-cross"
                                color="red"
                                size={30}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : requestStatus === 'declined' ||
                          requests.status === 'declined' ? (
                          <View style={styles.decline}>
                            <Text style={{color: '#9C0006'}}>
                              You have declined this request!
                            </Text>

                            <Entypo name="cross" color="#9C0006" size={23} />
                          </View>
                        ) : requestStatus === 'accepted' ||
                          requests.status === 'accepted' ? (
                          <View style={styles.decline}>
                            <Text style={{color: '#006100'}}>
                              You have accepted this request!
                            </Text>

                            <Entypo name="check" color="#006100" size={23} />
                          </View>
                        ) : (
                          <View>
                            <Text>Error</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : selectedReceivedRequests.length === 0 ? (
              <View style={styles.screen2}>
                <Text style={{fontSize: 15}}>
                  No chat request has been received!
                </Text>
              </View>
            ) : (
              <View>
                <Text>Error</Text>
              </View>
            )}
          </View>
        )}

        {/* -------------------------------------------------------------Sent-----------------------------------------------------*/}
        {switchState === 'Sent' && (
          <View>
            {selectedSentRequests.length !== 0 ? (
              <ScrollView>
                <View style={styles.screen}>
                  {selectedSentRequests.map((requests) => {
                    return (
                      <View
                        style={
                          requests.status === 'declined' ||
                          requestStatus === 'declined'
                            ? styles.request2
                            : requests.status === 'accepted' ||
                              requestStatus === 'accepted'
                            ? styles.request3
                            : styles.request
                        }>
                        <Text
                          style={
                            requests.status === 'declined' ||
                            requestStatus === 'declined'
                              ? styles.requestInfo2
                              : requests.status === 'accepted' ||
                                requestStatus === 'accepted'
                              ? styles.requestInfo3
                              : styles.requestInfo
                          }>
                          You have sent negotiation request to{' '}
                          {requests.receiverName}
                        </Text>

                        {requests.status === 'pending' ? (
                          <View
                            style={
                              (styles.options,
                              {flexDirection: 'row', marginTop: 14})
                            }>
                            <MaterialCommunityIcons
                              name="timer-sand"
                              color="#EEC303"
                              size={25}
                            />
                          </View>
                        ) : requests.status === 'declined' ? (
                          <View style={styles.decline}>
                            <Text style={{color: '#9C0006', marginRight: 4}}>
                              Your request has been declined!
                            </Text>

                            <MaterialIcons
                              name="sentiment-very-dissatisfied"
                              color="#9C0006"
                              size={22}
                            />
                          </View>
                        ) : requests.status === 'accepted' ? (
                          <View style={styles.decline}>
                            <Text style={{color: '#006100', marginRight: 4}}>
                              Your request has been accepted!
                            </Text>

                            <MaterialIcons
                              name="sentiment-very-satisfied"
                              color="#006100"
                              size={22}
                            />
                          </View>
                        ) : (
                          <View>
                            <Text>Error!</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            ) : selectedSentRequests.length === 0 ? (
              <View style={styles.screen2}>
                <Text style={{fontSize: 15}}>
                  No chat requests have been sent!
                </Text>
              </View>
            ) : (
              <View>
                <Text>Error</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },

  screen2: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  decline: {
    width: '60%',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },

  request2: {
    display: 'flex',
    backgroundColor: '#FFC7CE',
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

  request3: {
    display: 'flex',
    backgroundColor: '#C6EFCE',
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

  requestInfo2: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#9C0006',
  },

  requestInfo3: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#006100',
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

export default ReceivedRequest;
