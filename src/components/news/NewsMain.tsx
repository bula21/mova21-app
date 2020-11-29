import React from 'react';
import NewsFeed from './NewsFeed';
import NewsPage from './NewsPage';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsMain from '../settings/SettingsMain';

const Stack = createStackNavigator();

export default function NewsMain() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="newsfeed" component={NewsFeed} />
      <Stack.Screen name="newspage" component={NewsPage} />
      <Stack.Screen name="settings" component={SettingsMain} />
    </Stack.Navigator>
  );
}
