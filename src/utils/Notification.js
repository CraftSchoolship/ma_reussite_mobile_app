import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import axios from 'axios';
import config from '../../http/config';
import { getToken } from '../../http/http';

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

  let DeviceToken;
  try {
    DeviceToken = (await Notifications.getDevicePushTokenAsync({
      projectId: '4851c23f-ab7b-43da-8a23-655dd4c59f28',
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


console.log("Device Token:", DeviceToken);

  try {
    const response = await axios.post(`${config.ServerBaseUrl}/register`,
    {
      uid:userId,
      token:DeviceToken,
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
