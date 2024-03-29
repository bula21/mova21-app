/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Platform } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import MovaTheme from './src/constants/MovaTheme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import RadioMain from './src/components/radio/RadioMain';
import NewsMain from './src/components/news/NewsMain';
import './src/i18n';
import MovaIcon from './src/components/generic/MovaIcon';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/it';
import InfosMain from './src/components/infos/InfosMain';
import MapMain from './src/components/map/MapMain';
import languageManager from './src/helpers/LanguageManager';
import SplashScreen from 'react-native-splash-screen';
import Toast, { InfoToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

const Tab = createBottomTabNavigator();

// set moment language
moment.locale('de');

languageManager.applyLanguageFromStorageOrDevice();

const App = () => {
  const {t} = useTranslation();
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1500);
  });

  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <>
          <NavigationContainer>
            <Tab.Navigator
              tabBarOptions={{
                allowFontScaling: false,
                activeTintColor: MovaTheme.colorBlack,
                inactiveTintColor: MovaTheme.colorGrey,
                labelStyle: {
                  fontFamily:
                    Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold',
                  fontSize: 16,
                },
                style: {
                  paddingTop: 5,
                  height: 70,
                  marginBottom: insets ? insets.bottom : 0,
                  borderTopColor: '#fff',
                },
                tabStyle: {
                  height: 60,
                },
              }}>
              <Tab.Screen
                name="news"
                component={NewsMain}
                options={{
                  tabBarLabel: t('news'),
                  tabBarIcon: ({focused, color, size}) => (
                    <MovaIcon
                      name={focused ? 'news' : 'news-outline'}
                      size={40}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="infos"
                component={InfosMain}
                options={{
                  tabBarLabel: t('info'),
                  tabBarIcon: ({focused, color, size}) => (
                    <MovaIcon
                      name={focused ? 'info' : 'info-outline'}
                      size={40}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="radio"
                component={RadioMain}
                options={{
                  tabBarLabel: t('radio'),
                  tabBarIcon: ({focused, color, size}) => (
                    <MovaIcon
                      name={focused ? 'radio' : 'radio-outline'}
                      size={40}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="map"
                component={MapMain}
                options={{
                  tabBarLabel: t('map'),
                  tabBarIcon: ({focused, color, size}) => (
                    <MovaIcon
                      name={focused ? 'map' : 'map-outline'}
                      size={40}
                      color={color}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
          <Toast config={toastConfig} />
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
};

export default App;

const fontFamily = Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold';
const toastConfig = {
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      text1Style={{
        fontFamily: fontFamily,
        fontSize: 16
      }}
      text2Style={{
        fontFamily: fontFamily,
        fontSize: 15
      }}
      style={{ borderLeftColor: MovaTheme.colorBlue }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontFamily: fontFamily,
        fontSize: 16
      }}
      text2Style={{
        fontFamily: fontFamily,
        fontSize: 15
      }}
      style={{ borderLeftColor: MovaTheme.colorOrange }}
    />
  )
};
