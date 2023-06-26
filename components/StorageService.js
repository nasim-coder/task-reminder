import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveReminder = async (reminder) => {
  // console.log(reminder);
  if (reminder?.frequency === 'weekly' && reminder?.selectedDays?.length === 0) {
    // console.log('savereminder', reminder);
    throw new Error('Please select days');
  }

  if (reminder?.frequency === 'once' && !reminder.date) {
    throw new Error('Please choose date');
  }

  if (reminder.task == '') {
    throw new Error('Please enter task to do');
  }

  try {
    // console.log(1, 'calling save data function');
    await saveTaskData(reminder);
    return true;
  } catch (err) {
    throw new Error(err)
  }
}

export async function saveTaskData(taskData) {
  try {
    let savedTasks = await retrieveTaskData();
    // console.log(savedTasks);
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
    throw new Error(err)
  }
}

export const deleteById = async (id) => {
  try {
    let tasks = await retrieveTaskData();
    const savedTasks = tasks.filter((task) => task.id !== id);
    if (savedTasks) {
      await AsyncStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    }
    return true;
  } catch (err) {
    throw new Error(err)
  }

}

