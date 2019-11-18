import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import AppDrawer from "./components/AppDrawer";
import MapScreen from "./screens/MapScreen";
import i18n from './i18n';

const AppNavigator = createStackNavigator(
	{
		home: {
			screen: HomeScreen,
			navigationOptions: {
				title: 'Café21 - Bula21 - Cafe21'
			}
		},
		news: {
			screen: NewsScreen,
			navigationOptions: {
				title: i18n.t('news')
			}
		},
		map: {
			screen: MapScreen,
			navigationOptions: {
				title: i18n.t('map')
			}
		}
	},
	{
		initialRouteName: 'home'
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
