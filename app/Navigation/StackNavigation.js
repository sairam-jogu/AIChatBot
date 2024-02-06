import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ChatScreen from '../pages/ChatScreen';
import HomeScreen from '../pages/HomeScreen'

const StackNavigation = () => {

    const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator screenOptions = {{headerShown:false}}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="chat" component={ChatScreen} />
      </Stack.Navigator>
  )
}

export default StackNavigation