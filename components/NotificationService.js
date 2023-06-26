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
const scheduleDailyNotification = async (taskTitle, taskNote, hours, minutes) => {
    return await Notifications.scheduleNotificationAsync({
        content: {
            title: taskTitle,
            body: taskNote,
        },
        trigger: {
            hour: hours, // Set the hour for the daily notification
            minute: minutes, // Set the minute for the daily notification
            repeats: true, // Set the notification to repeat daily
        },
    });
};

// Function to schedule a weekly notification
const scheduleWeeklyNotification = (taskTitle, taskNote, hours, minutes, dayArr) => {
    return Notifications.scheduleNotificationAsync({
        content: {
            title: taskTitle,
            body: taskNote,
        },
        trigger: {
            weekdays: dayArr, // Set the weekday for the weekly notification (0 for Sunday, 1 for Monday, and so on)
            hour: hours, // Set the hour for the weekly notification
            minute: minutes, // Set the minute for the weekly notification
            repeats: true, // Set the notification to repeat weekly
        },
    });
};

export const scheduleNotification = async (task) => {

    let time = new Date(task.time);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    console.log('time', time, 'hours', hours, 'minutes', minutes);

    try {
        // repeat daily
        if (task.selectedDays.length == 7 || task.frequency == 'daily') {
            const notificationId = await scheduleDailyNotification(task.task, task.taskNote, hours, minutes);
            console.log('notificationId', notificationId);
            return notificationId;
        }

        // repeat weekly
        if (task.frequency == 'weekly') {
            const notificationId = await scheduleWeeklyNotification(task.task, task.taskNote, hours, minutes, task.selectedDays);
            return notificationId;
        }

        // notify once
        if (task.frequency == 'once') {


        }
    } catch (err) {
        throw new Error(err)
    }
}

