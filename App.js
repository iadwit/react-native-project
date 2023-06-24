import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {Home,Page2} from './Screens';

// AppRegistry.registerComponent(appName, () => Route);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Page 1' }} />
        <Stack.Screen name="Page2" component={Page2} options={{ title: 'Page 2' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}