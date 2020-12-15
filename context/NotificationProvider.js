import React, {useContext} from 'react';
import {NetworkInfo} from 'react-native-network-info';

const NotificationContext = React.createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider(props) {
  const sendNotification = async (tokens, title, content) => {
    var ip;

    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      ip = ipv4Address;
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/notification/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            token: tokens,
            title: title,
            content: content,
          }),
        },
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NotificationContext.Provider value={sendNotification}>
      {props.children}
    </NotificationContext.Provider>
  );
}
