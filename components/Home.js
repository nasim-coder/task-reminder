import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import Task from './Task';
const Home = ({ navigation }) => {

  const handleAddReminder = () => {
    navigation.navigate('AddTask');
  };

  return (
    <View style={styles.container}>
      <View style = {styles.taskWrapper}>
      <Text style={styles.title}>Todays Tasks :</Text>
        <View style={styles.items}>
          <Task task={{taskTitle:'hello', description:'lorem ipsum', time: Date.now()}} />
          <Task task={{taskTitle:'hello', description:'lorem ipsum', time: Date.now()}} />
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title='Add New Reminder'
          onPress={handleAddReminder}
        />
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
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Home;
