import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import AppDrawer from "./components/AppDrawer";
import MapScreen from "./screens/MapScreen";

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		News: {
			screen: NewsScreen,
		},
		Map: {
			screen: MapScreen,
		}
	},
	{
		initialRouteName: 'Home'
	}
);


const NavigationDrawer = createDrawerNavigator(
	{
		Stack: {
			screen: AppNavigator,
		}
	},
	{
		contentComponent: AppDrawer
	}
);

const AppNavigatorContainer = createAppContainer(NavigationDrawer);

export default class App extends React.Component {
	render() {
		return (
			<AppNavigatorContainer>
			</AppNavigatorContainer>
		);
	}
}
