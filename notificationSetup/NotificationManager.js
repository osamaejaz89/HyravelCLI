import PushNotification from 'react-native-push-notification';

class NotificationManager {
  configure = (onRegister, onNotification, onOpenNotification) => {
    PushNotification.configure({
      onRegister: function (token) {
        onRegister(token);
        console.log('[NotificationManager] onRegister token:', token);
      },

      onNotification: function (notification) {
        console.log('[NotificationManager] onNotification:', notification);

        notification.userInteraction = true;

        if (notification.userInteraction) {
          onOpenNotification(notification);
        } else {
          onNotification(notification);
        }

        notification.finish('backgroundFetchResultNoData');
      },
    });
  };

  _buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      ...this._buildAndroidNotification(id, title, message, data, options),

      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false,
    });
  };

  cancelAllLocalNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  unregister = () => {
    PushNotification.unregister();
  };
}

export const notificationManager = new NotificationManager();
