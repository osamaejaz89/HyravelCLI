import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import MenuNavigation from "./navigation/MenuNavigator";
// import Push from "./components/Push"
import carsReducer from "./store/reducers/cars";
import bikesReducer from "./store/reducers/bikes";
import bookReducer from "./store/reducers/book";
import bookbikeReducer from "./store/reducers/bookbike";
import driverReducer from "./store/reducers/drivers";
import { NotificationProvider } from "./context/NotificationProvider";
import { SocketProvider } from "./context/SocketProvider";

import { fcmService } from "./notificationSetup/FCMService";
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/currentUser';
import docReducer from './store/reducers/documents';
import driverAuthReducer from './store/reducers/driverAuth'
import currentDriverReducer from './store/reducers/currentDriver'
import requestReducer from './store/reducers/request'

import * as firebase from "firebase";

const rootReducer = combineReducers({
  cars: carsReducer,
  bikes: bikesReducer,
  reducerbook: bookReducer,
  reducerbikebook: bookbikeReducer,
  reducerdriver: driverReducer,
  reducercars: carsReducer,
  reducerbikes: bikesReducer,
  auth: authReducer,
  currentUser: userReducer,
  reducersDoc: docReducer,
  driverAuth: driverAuthReducer,
  currentDriver: currentDriverReducer,
  reducerRequest: requestReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
var firebaseConfig = {
  apiKey: "AIzaSyBpdfiIp41H9IrYUtjA9ked_wqEnNEEfkQ",
  authDomain: "hyravelproject.firebaseapp.com",
  databaseURL: "https://hyravelproject.firebaseio.com",
  projectId: "hyravelproject",
  storageBucket: "hyravelproject.appspot.com",
  messagingSenderId: "163913437781",
  appId: "1:163913437781:web:35e3ba7530520dd5b43adc",
  measurementId: "G-YTPY62W3K0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default function App() {
  useEffect(() => {
    fcmService.register(onRegister, onNotification, onOpenNotification);
  }, []);

  function onRegister(token) {
    // console.log('[NotificationFCM] onRegister', token);
  }

  function onNotification(notify) {
    console.log("[NotificationFCM] onNotification", notify);
    const channelObj = {
      channelId: "SampleID",
      channelName: "SampleName",
      channelDes: "SampleDes",
    };

    const channel = fcmService.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify._notificationId,
      title: notify._title,
      content: notify._body,
      sound: "default",
      channel: channel,
      data: {},
      colorBgIcon: "black",
      largeIcon: "sparern_launcher",
      smallIcon: "sparern_launcher",
      vibrate: true,
    };

    const notification = fcmService.buildNotification(buildNotify);
    fcmService.displayNotification(notification);
  }

  function onOpenNotification(notify) {
    console.log("[NotificationFCM] onOpenNotification", notify);
    alert("Open Notification: ", +notify._body);
  }

  return (
    <Provider store={store}>
      <NotificationProvider>
        <SocketProvider>
          <MenuNavigation />
        </SocketProvider>
      </NotificationProvider>
    </Provider>
  );
}
