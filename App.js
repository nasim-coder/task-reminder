import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8be9a2de',
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
