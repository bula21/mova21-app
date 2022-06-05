import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfosList from './InfosList';
import InfosPage from './InfosPage';
import WalkInDetailPage from "./pages/WalkInDetailPage";

const Stack = createStackNavigator();

export default function InfosMain() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="infolist" component={InfosList} />
      <Stack.Screen name="infopage" component={InfosPage} />
      <Stack.Screen name="walkindetails" component={WalkInDetailPage} />
    </Stack.Navigator>
  );
}
