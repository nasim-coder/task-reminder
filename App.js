import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
export default function App() {
  return (
    <View style={styles.container}>
      <View style = {styles.taskWrapper}>
      <Text style={styles.title}>Todays Tasks :</Text>
        <View style={styles.items}>
          <Task />
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

  },

  taskWrapper: {
    paddingTop: 40,
    marginHorizontal: 40,
  },
});
