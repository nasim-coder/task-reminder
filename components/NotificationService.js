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
    await Notifications.scheduleNotificationAsync({
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
  } catch (err) {
    throw new Error(err);
  }
};

// Function to schedule a weekly notification
const scheduleWeeklyNotification = async (taskTitle, taskNote, hours, minutes, day) => {
  try {
    // console.log('dayArr', typeof dayArr, dayArr, Array.isArray(dayArr));
    await Notifications.scheduleNotificationAsync({
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

  try {
    // Repeat daily
    if (task.frequency === 'daily') {
      await scheduleDailyNotification(task.task, task.taskNote, hours, minutes);
    }

    // Repeat weekly
    if (task.frequency === 'weekly') {
      await scheduleWeeklyNotification(task.task, task.taskNote, hours, minutes, task.selectedDays);
    }

    // Notify once
    if (task.frequency === 'once') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: task.task,
          body: task.taskNote,
        },
        trigger: {
          date: time,
        },
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

// Delete a scheduled notification
export const deleteScheduledNotification = async (notificationId) => {
  try {
    if (notificationId) {
      const isScheduled = await Notifications.getScheduledNotificationsAsync();
      const scheduledNotification = isScheduled.find(
        (notification) => notification.identifier === notificationId,
      );

      if (scheduledNotification) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        // console.log(`Canceled notification with ID: ${notificationId}`);
      } else {
        // console.log('Notification ID not found');
      }
    } else {
      // console.log('Invalid notification ID');
    }
  } catch (err) {
    throw new Error(err);
  }
};
