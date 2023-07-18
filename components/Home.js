/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  View, StyleSheet, ScrollView, Alert, TouchableOpacity, ToastAndroid, StatusBar,
} from 'react-native';
import { FAB } from 'react-native-paper';
import Task from './Task';
import { retrieveTaskData, deleteById } from './StorageService'; // Import the retrieveTaskData function

// eslint-disable-next-line react/prop-types
function Home({ frequencyData }) {
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState(null);
  // console.log('taskData', taskData);
  const handleAddReminder = () => {
    // eslint-disable-next-line react/prop-types
    navigation.navigate('AddTask');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      retrieveData();
    }
  }, [isFocused]);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    retrieveData(); // Call the function to retrieve task data when the component mounts
  }, []);

  const retrieveData = async () => {
    // console.log('retriev called');
    try {
      const data = await retrieveTaskData(); // Retrieve the task data
      setTaskData(data); // Set the retrieved task data in state
    } catch (error) {
      Alert.alert('COULD NOT BE SAVED', 'something went wrong', [{ text: 'OK' }], { cancelable: false });
    }
  };

  const handleTaskLongPress = (task) => {
    // Show contextual menu options (delete, edit)
    Alert.alert(
      'Want to delete it?',
      null,
      [
        // { text: 'Edit', onPress: () => editTask(task) },
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteTask(task) },
      ],
      {
        cancelable: true,
        containerStyle: { justifyContent: 'center' },
      },
    );
  };

  const deleteTask = async (task) => {
    try {
      const deleted = await deleteById(task.id);
      if (deleted) {
        ToastAndroid.show('Reminder deleted Successfully!', ToastAndroid.LONG);
        await retrieveData();
      }
    } catch (err) {
      ToastAndroid.show(err, ToastAndroid.LONG);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C1D9E" />
      <ScrollView contentContainerStyle={styles.contentContainer}>

        {
          // eslint-disable-next-line max-len
          taskData !== null && taskData.filter((task) => task.frequency === frequencyData).map((task) => (
            <TouchableOpacity
              key={task.id}
              onLongPress={() => handleTaskLongPress(task)}
            >
              <Task task={task} />
            </TouchableOpacity>
          ))
        }

      </ScrollView>
      <FAB
        icon="plus"
        // label='Save'
        color="white"
        style={styles.fab}
        onPress={handleAddReminder}
      />
      {/* <View style={styles.newReminderButtonContainer}>
        <Button color="#9C1D9E" title="New Reminder" onPress={handleAddReminder} />
      </View> */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAB6EA',
    padding: 10,
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // newReminderButtonContainer: {
  //   marginBottom: 10,
  // },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 35,
    bottom: 35,
    backgroundColor: '#9C1D9E',
    borderRadius: 50, // Set the borderRadius to half the width/height to make it round
  },
});

export default Home;
