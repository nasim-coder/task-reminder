import * as Notifications from 'expo-notifications';

// Function to register for push notifications
export const registerForPushNotificationsAsync = async () => {
  // Check if the device supports push notifications
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // If not yet granted, ask for permission
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // If permission granted, get the device's push token
  if (finalStatus === 'granted') {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token); // Log the push token
    // Save the token to your server or AsyncStorage for future use
  }
};

// Function to schedule a daily notification
export const scheduleDailyNotification = (notificationContent) => {
  Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: {
      hour: 12, // Set the hour for the daily notification
      minute: 0, // Set the minute for the daily notification
      repeats: true, // Set the notification to repeat daily
    },
  });
};

// Function to schedule a weekly notification
export const scheduleWeeklyNotification = (notificationContent) => {
  Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: {
      weekday: 1, // Set the weekday for the weekly notification (0 for Sunday, 1 for Monday, and so on)
      hour: 12, // Set the hour for the weekly notification
      minute: 0, // Set the minute for the weekly notification
      repeats: true, // Set the notification to repeat weekly
    },
  });
};
