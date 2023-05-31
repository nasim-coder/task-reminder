import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import AddTask from './components/AddTask';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Reminders' }} />
        <Stack.Screen name="AddTask" component={AddTask} options={{ title: 'Add New Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
