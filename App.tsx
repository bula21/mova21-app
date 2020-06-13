import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsMain from './components/news/NewsMain'
import InfosMain from './components/infos/InfosMain'
import RadioMain from "./components/radio/RadioMain";
import MapMain from "./components/map/MapMain";
import './i18n';
import MovaTheme from "./constants/MovaTheme";
import {useTranslation} from "react-i18next";
import { useFonts } from '@use-expo/font';
import {AppLoading} from "expo";
import MovaIcon from "./components/generic/MovaIcon";
import { SafeAreaProvider, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import moment from "moment";
import 'moment/locale/de';

const customFonts = {
	'MS-Bold': require('./assets/fonts/MS-Bold.otf'),
	'MS-BoldItalic': require('./assets/fonts/MS-BoldItalic.otf'),
};

const Tab = createBottomTabNavigator();

// set moment language
moment.locale('de');

export default function App() {
	const [isLoaded] = useFonts(customFonts);
	const { t } = useTranslation();

	if (!isLoaded) {
		return <SafeAreaProvider><AppLoading /></SafeAreaProvider>;
	}

	return (
		<SafeAreaProvider>
			<SafeAreaInsetsContext.Consumer>
				{insets =>
					<NavigationContainer>
						<Tab.Navigator
							tabBarOptions={{
								activeTintColor: MovaTheme.colorBlack,
								inactiveTintColor: MovaTheme.colorGrey,
								labelStyle: {
									fontFamily: 'MS-Bold',
									fontSize: 16
								},
								style: {
									paddingTop: 5,
									height: 70,
									marginBottom: insets? insets.bottom : 0,
									borderTopColor: '#fff'
								},
								tabStyle: {
									height: 60,
								}
							}}
						>
							<Tab.Screen
								name="news"
								component={NewsMain}
								options={{
									tabBarLabel: t('news'),
									tabBarIcon: ({focused, color, size}) => (
										<MovaIcon name={focused ? 'news' : 'news-outline'} size={40} color={color}/>
									),
								}}
							/>
							<Tab.Screen
								name="infos"
								component={InfosMain}
								options={{
									tabBarLabel: t('info'),
									tabBarIcon: ({focused, color, size}) => (
										<MovaIcon name={focused ? 'info' : 'info-outline'} size={40} color={color}/>
									),
								}}
							/>
							<Tab.Screen
								name="radio"
								component={RadioMain}
								options={{
									tabBarLabel: t('radio'),
									tabBarIcon: ({focused, color, size}) => (
										<MovaIcon name={focused ? 'radio' : 'radio-outline'} size={40} color={color}/>
									),
								}}
							/>
							<Tab.Screen
								name="map"
								component={MapMain}
								options={{
									tabBarLabel: t('map'),
									tabBarIcon: ({focused, color, size}) => (
										<MovaIcon name={focused ? 'map' : 'map-outline'} size={40} color={color}/>
									),
								}}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				}
			</SafeAreaInsetsContext.Consumer>
		</SafeAreaProvider>
	);
}
