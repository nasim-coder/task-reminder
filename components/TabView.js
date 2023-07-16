/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Daily from './Daily';
import Weekly from './Weekly';
import Once from './Once';

const Tab = createMaterialTopTabNavigator();

function TabView() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#9C1D9E', borderTopWidth: 0 },
        tabBarLabelStyle: { color: 'white' },
        tabBarIndicatorStyle: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen name="Daily" component={Daily} options={{ title: 'Daily' }} />
      <Tab.Screen name="Weekly" component={Weekly} options={{ title: 'Weekly' }} />
      <Tab.Screen name="once" component={Once} options={{ title: 'once' }} />
    </Tab.Navigator>
  );
}

export default TabView;
