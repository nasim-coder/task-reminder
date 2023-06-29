/* eslint-disable no-use-before-define */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotification, deleteScheduledNotification } from './NotificationService';

export const saveReminder = async (reminder) => {
  // console.log(reminder);
  if (reminder?.frequency === 'weekly' && reminder?.selectedDays?.length === 0) {
    // console.log('savereminder', reminder);
    throw new Error('Please select days');
  }

  if (reminder?.frequency === 'once' && !reminder.date) {
    throw new Error('Please choose date');
  }

  if (reminder.task === '') {
    throw new Error('Please enter task to do');
  }

  try {
    // console.log(1, 'calling save data function');
    await saveTaskData(reminder);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export async function saveTaskData(taskData) {
  try {
    const savedTasks = await retrieveTaskData();
    const notificationId = await scheduleNotification(taskData);
    // eslint-disable-next-line no-param-reassign
    taskData.notificationId = notificationId;
    if (savedTasks) {
      savedTasks.push(taskData); // Add the taskData to the savedTasks array
      await AsyncStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    } else {
      await AsyncStorage.setItem('savedTasks', JSON.stringify([taskData]));
    }
    return true;
  } catch (e) {
    throw new Error(e);
  }
}

export async function retrieveTaskData() {
  try {
    return JSON.parse(await AsyncStorage.getItem('savedTasks'));
  } catch (err) {
    throw new Error(err);
  }
}

export const deleteById = async (id) => {
  try {
    const tasks = await retrieveTaskData();
    // get the notificationId of the task
    let todDeleteNotificationId;
    tasks.forEach((elem) => {
      if (elem.id === id) {
        todDeleteNotificationId = elem.notificationId;
      }
    });

    // cancel notification
    await deleteScheduledNotification(todDeleteNotificationId);

    // remove task from the array
    const remainingTasks = tasks.filter((task) => task.id !== id);
    // save remaining tasks
    if (remainingTasks) {
      await AsyncStorage.setItem('savedTasks', JSON.stringify(remainingTasks));
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};
