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

const NotificationContext = createContext({
  scheduleLocalNotification: async () => {},
  notifications: [],
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('notifications');
      if (stored) setNotifications(JSON.parse(stored));
    })();
  }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
        console.log('Notification received:', notification);
        const { title, body, data } = notification.request.content;
        const timestamp = Date.now();
        const newItem = { title, body, data, timestamp };

        setNotifications(prev => {
          const updated = [newItem, ...prev];
          AsyncStorage.setItem('notifications', JSON.stringify(updated));
          return updated;
        });
      });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const action = response?.notification?.request?.content?.data?.action;
      const data = response?.notification?.request?.content?.data;

      console.log('Tapped notification action:', action);
      console.log('Tapped notification:', JSON.stringify(response));
      switch (action) {
        case "open_session_detail":
          navigation.navigate(SessionsScreen)
          break;
        // case "open_class_detail":
        //   navigation.navigate(routes.PARTICIPANTS,{class_id: data.class_id})
        //   break;
        case "open_invoice_detail":
          navigation.navigate(PaymentScreen)
          break;
        case "open_grade_detail":
          navigation.navigate(NoteScreen)
          break;
        // case "absent_session":
        //   navigation.navigate(routes.ATTENDANCE)
        //   break;
        default:
          break
      }

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received:',notification);
      });
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [navigation]);

  const scheduleLocalNotification = async ({ title, body, data, trigger }) => {
    await Notifications.scheduleNotificationAsync({ content: { title, body, data }, trigger: trigger || null });
  };

  return (
    <NotificationContext.Provider value={{ scheduleLocalNotification, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
