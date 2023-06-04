import { AsyncStorage } from '@react-native-async-storage/async-storage';


export const saveReminder = (reminder) => {
    
    if (reminder?.frequency === 'weekly' && reminder?.selectedDays?.length === 0) {
        console.log('savereminder', reminder);
        throw new Error('Please select days');
    }

    if (reminder?.frequency === 'once' && !reminder.date) {
        throw new Error('Please choose date');
    }

    if (reminder.task == '') {
        throw new Error('Please enter task to do');
    }

    return true;
}


async function saveTaskData(taskData) {
    try {
      await AsyncStorage.setItem('taskData', JSON.stringify(taskData));
    } catch (e) {
      console.error(e);
    }
  }
  
  async function retrieveTaskData() {
    const taskData = await AsyncStorage.getItem('taskData');
    return JSON.parse(taskData);
  }