import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import * as firebase from "react-native-firebase";

const Push = () => {
    useEffect(() => {
        getToken();
        createChannel();
        notificationsListner();
    },[])
    // * get tokken

    const getToken = async() => {
        const firebaseToken = await firebase.messaging().getToken();
        console.log(firebaseToken)
    }
    //create Channel

    const createChannel = () => {
        const channel = new firebase.notifications.Android.Channel(
            'channelId', 
            'channelName', 
            firebase.notifications.Android.Importance.Max
            ).setDescription('Description')
            
            firebase.notifications().android.createChannel(channel);
    };

    //foreground notifications

    const notificationsListner = () => {
        firebase.notifications().onNotification((notification) => {
            if(Platform.OS === 'android'){
                const localNotification = new firebase.notifications.Notification({
                    sound: 'default',
                    show_in_foreground: true
                })
                .setNotificationId(notification.notificationId).setTitle(notification.title).setSubtitle(notification.subtitle).setBody(notification.body).setData(notification.data).android.setChannelId('channelId').android.setPriority(firebase.notifications.Android.Priority.High);

                firebase.notifications().displayNotification(localNotification).catch((err)=>console.log(err))
            }
        })
    }
  

  };
  



export default Push