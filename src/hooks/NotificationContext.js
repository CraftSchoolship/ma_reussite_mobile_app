import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import config from '../../http/config';
import { getToken } from '../../http/http';
import { useNavigation } from "@react-navigation/native";
import SessionsScreen from '../screens/SessionsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import NoteScreen from '../screens/NoteScreen';


export async function registerDevice(userId) {
  if ((await Notifications.getPermissionsAsync()).status !== 'granted') {
    if ((await Notifications.requestPermissionsAsync()).status !== 'granted') {
      console.log('Permission not granted for push notifications!');
      return;
    }
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (config.debug || !Device.isDevice) {
    console.log("DEBUG MODE: Using Expo Push Notification");
    console.log('Expo Token:', (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data);
    return;
  }

  try {
    await axios.post(`${config.notification.server}/register`,{
      uid: config.notification.scope_prefix + userId,
      token: (await Notifications.getDevicePushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data,
      type: Platform.OS.toLocaleLowerCase()
    },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error("Device registration failed:", err);
  }
}

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
        console.log('Notification received:', notification);
        const { title, body, data } = notification.request.content;
        const timestamp = Date.now();
        const newItem = { title, body, data, timestamp };

        const OldNotifications = AsyncStorage.getItem('notifications');
        const parsed = OldNotifications ? JSON.parse(OldNotifications) : []
        const updated = [newItem, ...parsed];
        console.log(updated)
        AsyncStorage.setItem('notifications', JSON.stringify(updated));         
      });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response?.notification?.request?.content?.data;
      switch (data?.action) {
        case "open_class_detail":
          navigation.navigate("Groups")
          break;
        case "open_invoice_detail":
          navigation.navigate("Payment")
          break;
        case "open_grade_detail":
          navigation.navigate("Notes")
          break;
        // case "open_session_detail":
        //   navigation.navigate("Session")
        //   break;  
        default:
          break
      }

    });

    return () => {
        notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [navigation]);


  return (
    <NotificationContext.Provider>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
