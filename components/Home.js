import React, {useState, useEffect} from 'react';
import { View, Button, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import Task from './Task';
import { retrieveTaskData } from './ReminderService'; // Import the retrieveTaskData function

const Home = ({ navigation }) => {
  const [taskData, setTaskData] = useState([]);

  const handleAddReminder = () => {
    navigation.navigate('AddTask');
  };

  useEffect(() => {
    retrieveData(); // Call the function to retrieve task data when the component mounts
  }, []);

  const retrieveData = async () => {
    try {
      const data = await retrieveTaskData(); // Retrieve the task data
      setTaskData(data); // Set the retrieved task data in state
    } catch (error) {
      Alert.alert('COULD NOT BE SAVED','something went wrong',[ {text: 'OK'}], {cancelable: false});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scheduled Tasks :</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
          {/* <Task task={{ task: 'lorem ipsum dolor sit amet titularlorem ipsum dolor sit amet titular', time: new Date() }} /> */}
          
        {
          taskData.map((task) => (
          <Task key={task.id} task={task} /> // Render Task component for each task object in taskData
          ))
        }
          
        
      </ScrollView>
      
      <View style={styles.newReminderButtonContainer}>
        <Button color="#9C1D9E" title='New Reminder' onPress={handleAddReminder} />
      </View>
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
  
  newReminderButtonContainer: {
    marginBottom: 10,
  },
});

export default Home;
