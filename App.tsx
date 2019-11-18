import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import AppDrawer from "./components/AppDrawer";
import MapScreen from "./screens/MapScreen";
import './i18n';
import {withTranslation, WithTranslation} from 'react-i18next';

const AppNavigator = createStackNavigator(
	{
		home: {
			screen: HomeScreen,
		},
		news: {
			screen: NewsScreen,
		},
		map: {
			screen: MapScreen,
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

class App extends React.Component<WithTranslation> {
	render() {
		return (
			<AppNavigatorContainer>
			</AppNavigatorContainer>
		);
	}
}

export default withTranslation()(App)
