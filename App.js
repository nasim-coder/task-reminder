/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import AddTask from './components/AddTask';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Task Reminder',
            headerStyle: { backgroundColor: '#9C1D9E' }, // Set your desired background color
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{
            title: 'Add New Task',
            headerStyle: { backgroundColor: '#9C1D9E' }, // Set your desired background color
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
