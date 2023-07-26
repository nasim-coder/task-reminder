/* eslint-disable no-console */
// import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Function to schedule a daily notification
const scheduleDailyNotification = async (taskTitle, taskNote, hours, minutes) => {
  try {
    // create channel
    // eslint-disable-next-line no-use-before-define
    const channelId = await getOrCreateNotificationChannel('dailyNotificationChannelId');
    // scheduling daily notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: taskTitle,
        body: taskNote,
        sound: 'ringtone.wav',
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
        channelId,
      },
    });
    return notificationId;
  } catch (err) {
    throw new Error(err);
  }
};

// Function to schedule a weekly notification
const scheduleWeeklyNotification = async (taskTitle, taskNote, hours, minutes, day) => {
  try {
    // eslint-disable-next-line no-use-before-define
    const channelId = await getOrCreateNotificationChannel('weeklyNotificationChannelId');
    // console.log('dayArr', typeof dayArr, dayArr, Array.isArray(dayArr));
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: taskTitle,
        body: taskNote,
        sound: 'ringtone.wav',
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        weekday: day,
        hour: hours,
        minute: minutes,
        repeats: true,
        channelId,
      },
    });
    return notificationId;
  } catch (err) {
    throw new Error(err);
  }
};

export const scheduleNotification = async (task) => {
  const time = new Date(task.time);
  const date = new Date(task.date);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  // Set the year, month, and day from the date
  time.setFullYear(date.getFullYear());
  time.setMonth(date.getMonth());
  time.setDate(date.getDate());
  let notificationId;
  try {
    // ask for notification permission if not provided
    // eslint-disable-next-line no-use-before-define
    if (!isPermitted()) {
      throw new Error('Notification permission denied');
    }
    // Repeat daily
    if (task.frequency === 'daily') {
      // eslint-disable-next-line max-len
      notificationId = await scheduleDailyNotification(task.task, task.taskNote, hours, minutes);
    }

    // Repeat weekly
    if (task.frequency === 'weekly') {
      // eslint-disable-next-line max-len
      notificationId = await scheduleWeeklyNotification(task.task, task.taskNote, hours, minutes, task.selectedDays);
    }

    // Notify once
    if (task.frequency === 'once') {
      // eslint-disable-next-line no-use-before-define
      const channelId = await getOrCreateNotificationChannel('onceNotificationChannelId');
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: task.task,
          body: task.taskNote,
          sound: 'ringtone.wav',
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          date: time,
          channelId,
        },
      });
    }
    return notificationId;
  } catch (err) {
    throw new Error(err);
  }
};

// Delete a scheduled notification
export const deleteScheduledNotification = async (notificationId) => {
  console.log('notificationId', notificationId);
  try {
    if (notificationId) {
      console.log('reached here');
      const isScheduled = await Notifications.getAllScheduledNotificationsAsync();
      console.log('isScheduled', isScheduled);
      const scheduledNotification = isScheduled.find(
        (notification) => notification.identifier === notificationId,
      );
      console.log('scheduledNotification', scheduledNotification);
      if (scheduledNotification) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        console.log(`Canceled notification with ID: ${notificationId}`);
      } else {
        console.log('Notification ID not found');
      }
    } else {
      console.log('Invalid notification ID');
    }
    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

async function isPermitted() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function getOrCreateNotificationChannel(channelId) {
  try {
    // const channelId = id.toString(); // Use the task ID as the channel ID
    let ChannelName;
    if (channelId === 'dailyNotificationChannelId') {
      ChannelName = 'Daily Notification';
    } else if (channelId === 'weeklyNotificationChannelId') {
      ChannelName = 'Weekly Notification';
    } else if (channelId === 'onceNotificationChannelId') {
      ChannelName = 'Once Notification';
    }

    const existingChannel = await Notifications.getNotificationChannelAsync(channelId);
    console.log('existingChannel', existingChannel);
    // if channel already exist return channel id
    if (existingChannel) {
      return channelId;
    }
    // if channel does not exist create new channel and return channel Id
    await Notifications.setNotificationChannelAsync(channelId, {
      name: ChannelName,
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'ringtone.wav', // Replace with the appropriate sound file
      vibrationPattern: [0, 250, 250, 250], // Define a vibration pattern if desired
      enableLights: true,
      lockscreenVisibility: 1,
    });
    return channelId;
  } catch (err) {
    throw new Error(err);
  }
}
