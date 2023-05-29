import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';

export default function App() {

  const [tasks, setTasks] = useState([]);

  return (
    <View style={styles.container}>
      <View style = {styles.taskWrapper}>
      <Text style={styles.title}>Todays Tasks :</Text>
        <View style={styles.items}>
          <Task task={{taskTitle:'hello', description:'lorem ipsum', time: Date.now()}} />
          <Task task={{taskTitle:'hello', description:'lorem ipsum', time: Date.now()}} />
        </View>
      </View>
    </View>
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a2b2c2',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  items: {
    marginTop: 10,
  },

  taskWrapper: {
    paddingTop: 40,
    marginHorizontal: 20,
  },
});
