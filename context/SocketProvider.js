import React, {useEffect, useContext, useState} from 'react';
import io from 'socket.io-client';
import * as firebase from 'firebase';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider(props) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged');
        const socket = io('http://192.168.1.101:3000');

        setSocket(socket);

        socket.on('disconnect', () => {
          console.log('user has left!');
        });
      }
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}
