import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RadioPlayer from './RadioPlayer';
import RadioInfo from './RadioInfo';

const Stack = createStackNavigator();

export default function RadioMain() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="player" component={RadioPlayer} />
      <Stack.Screen name="infopage" component={RadioInfo} />
    </Stack.Navigator>
  );
}
