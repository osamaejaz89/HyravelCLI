// import messaging from '@react-native-firebase/messaging';
import firebase from 'react-native-firebase';
import {notificationManager} from './NotificationManager';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  checkPermission = (onRegister) => {
    firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission Rejected', error);
      });
  };

  getToken = (onRegister) => {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('User does not have a device token');
        }
      })
      .catch((error) => {
        console.log('getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('Request Permission Rejected', error);
      });
  };

  deleteToken = () => {
    //console.log('[FCMService] deleteToken');
    firebase
      .messaging()
      .deleteToken()
      .catch((error) => {
        console.log('Delete token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        onNotification(notification);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          const notification: Notification = notificationOpen.notification;
          onOpenNotification(notification);
          //this.removeDeliveredNotification(notification);
        }
      });

    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          const notification: Notification = notificationOpen.notification;
          onOpenNotification(notification);
          //this.removeDeliveredNotification(notification);
        }
      });

    this.messageListener = firebase.messaging().onMessage((message) => {
      onNotification(message);
    });

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh((fcmToken) => {
        console.log('New token: ', fcmToken);
        onRegister(fcmToken);
      });
  };

  unRegister = () => {
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
    this.onTokenRefreshListener();
  };

  buildChannel = (obj) => {
    return new firebase.notifications.Android.Channel(
      obj.channelId,
      obj.channelName,
      firebase.notifications.Android.Importance.High,
    ).setDescription(obj.channelDes);
  };

  buildNotification = (obj) => {
    firebase.notifications().android.createChannel(obj.channel);

    return new firebase.notifications.Notification()
      .setSound(obj.sound)
      .setNotificationId(obj.dataId)
      .setTitle(obj.title)
      .setBody(obj.content)
      .setData(obj.data)

      .android.setChannelId(obj.channel.channelId)
      .android.setLargeIcon(obj.largeIcon)
      .android.setSmallIcon(obj.smallIcon)
      .android.setColor(obj.colorBgIcon)
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setVibrate(obj.vibrate);
  };

  displayNotification = (notification) => {
    firebase
      .notifications()
      .displayNotification(notification)
      .catch((error) => console.log('Display Notification Error: ', error));
  };

  // removeDeliveredNotification = (notification) => {
  //   firebase
  //     .notifications()
  //     .removeDeliveredNotification(notification.notificationId);
  // };
}

export const fcmService = new FCMService();
