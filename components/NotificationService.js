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
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: taskTitle,
        body: taskNote,
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
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
    // console.log('dayArr', typeof dayArr, dayArr, Array.isArray(dayArr));
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: taskTitle,
        body: taskNote,
      },
      trigger: {
        weekday: day,
        hour: hours,
        minute: minutes,
        repeats: true,
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
      notificationId = await scheduleDailyNotification(task.task, task.taskNote, hours, minutes);
    }

    // Repeat weekly
    if (task.frequency === 'weekly') {
      notificationId = await scheduleWeeklyNotification(task.task, task.taskNote, hours, minutes, task.selectedDays);
    }

    // Notify once
    if (task.frequency === 'once') {
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: task.task,
          body: task.taskNote,
        },
        trigger: {
          date: time,
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
