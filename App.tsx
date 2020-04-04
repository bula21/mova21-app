import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import NewsMain from './components/news/NewsMain'
import InfosMain from './components/infos/InfosMain'
import RadioMain from "./components/radio/RadioMain";
import MapMain from "./components/map/MapMain";
import './i18n';
import MovaTheme from "./constants/MovaTheme";
import {useTranslation} from "react-i18next";


const Tab = createBottomTabNavigator();

export default function App() {
	const { t } = useTranslation();
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: MovaTheme.colorOrange,
					inactiveTintColor: MovaTheme.colorBlue,
				}}
			>
				<Tab.Screen
					name="news"
					component={NewsMain}
					options={{
						tabBarLabel: t('news'),
						tabBarIcon: ({focused, color, size}) => (
							<Ionicons name="md-bonfire" size={size} color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="infos"
					component={InfosMain}
					options={{
						tabBarLabel: t('infos'),
						tabBarIcon: ({focused, color, size}) => (
							<Ionicons name="ios-information-circle-outline" size={size} color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="radio"
					component={RadioMain}
					options={{
						tabBarLabel: t('radio'),
						tabBarIcon: ({focused, color, size}) => (
							<Ionicons name="ios-musical-notes" size={size} color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="map"
					component={MapMain}
					options={{
						tabBarLabel: t('map'),
						tabBarIcon: ({focused, color, size}) => (
							<Ionicons name="ios-map" size={size} color={color}/>
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
