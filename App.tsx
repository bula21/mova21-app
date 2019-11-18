import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		News: {
			screen: NewsScreen,
		}
	},
	{
		initialRouteName: 'Home'
	}
);

export default createAppContainer(AppNavigator);
