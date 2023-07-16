/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTask from './components/AddTask';
import TabView from './components/TabView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabView"
        screenOptions={{
          headerStyle: { backgroundColor: '#9C1D9E' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="TabView"
          component={TabView}
          options={{
            title: 'Task Reminder',
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
