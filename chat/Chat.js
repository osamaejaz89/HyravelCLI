import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as firebase from 'firebase';
import Messages from './Messages';
import {useSocket} from '../../context/SocketProvider';
import * as messagesAction from '../../store/actions/chatMessage';

const Chat = (props) => {
  const dispatch = useDispatch();
  const selectedMessages = useSelector((state) => state.messages.messages);
  console.log(selectedMessages);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(
    selectedMessages ? selectedMessages : [],
  );
  const [conversationId, setConversationId] = useState(
    props.navigation.getParam('conversationId'),
  );
  const socket = useSocket();

  const loadMessages = useCallback(async () => {
    await dispatch(messagesAction.fetchMessage(conversationId));
  });

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadMessages,
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadMessages]);

  useEffect(() => {
    loadMessages();
  }, [dispatch]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
    });

    socket.on('disconnect', () => {
      console.log('user has left!');
    });
  }, []);

  const submitChatMessage = async () => {
    await socket.emit('chat message', {
      message: message,
      userId: firebase.auth().currentUser.uid,
      conversationId: conversationId,
    });

    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        dispatch(
          messagesAction.saveMessage(
            conversationId,
            token,
            message,
            firebase.auth().currentUser.uid,
          ),
        );
      });

    setMessage('');
  };

  const getMessages = (msgProp) => {
    setMessage(msgProp);
  };

  return (
    <Messages
      message={message}
      getMessages={getMessages}
      submitFunction={submitChatMessage}
      chatMessages={chatMessages}
    />
  );
};

export default Chat;
