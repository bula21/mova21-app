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
import { useFonts } from '@use-expo/font';
import {AppLoading} from "expo";

const customFonts = {
	'MS-Bold': require('./assets/fonts/MS-Bold.otf'),
	'MS-BoldItalic': require('./assets/fonts/MS-BoldItalic.otf'),
};

const Tab = createBottomTabNavigator();

export default function App() {
	const [isLoaded] = useFonts(customFonts);
	const { t } = useTranslation();

	if (!isLoaded) {
		return <AppLoading />;
	}

	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: MovaTheme.colorBlack,
					inactiveTintColor: MovaTheme.colorGrey,
					labelStyle: {
						fontFamily: 'MS-Bold',
						fontSize: 18
					}
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
						tabBarLabel: t('info'),
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
