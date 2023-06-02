import React from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import Task from './Task';

const Home = ({ navigation }) => {
  const handleAddReminder = () => {
    navigation.navigate('AddTask');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scheduled Tasks :</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
          <Task task={{ taskTitle: 'lorem ipsum dolor sit amet titularlorem ipsum dolor sit amet titular', time: new Date() }} />
          <Task task={{ taskTitle: 'hello', description: 'lorem ipsum', time: new Date() }} />
          
        
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
