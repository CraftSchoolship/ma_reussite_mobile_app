import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import axios from 'axios';
import config from '../../http/config';
import { getToken } from '../../http/http';
import Constants from "expo-constants";

export async function registerDevice(userId) {


  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications");
    return;
  }

  let finalStatus;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log("Permission not granted for push notifications!");
    return;
  }

  let deviceToken;
  try {
    deviceToken = (await Notifications.getDevicePushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })).data;
  } catch (error) {
    console.error("Error getting push token:", error);
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const uid = config.notification.scope_prefix + userId;

  try {
    const response = await axios.post(`${config.notification.server}/register`,
    {
      uid:uid,
      token:deviceToken,
      type:Platform.OS
    },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Device registered successfully:", response.data);
  } catch (err) {
    console.error("Device registration failed:", err.response?.data || err.message);
  }
}