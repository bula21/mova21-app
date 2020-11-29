/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import "./src/i18n";
//import LanguageManager from './src/helpers/LanguageManager';
//import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
//LanguageManager.applyLanguageFromStorageOrDevice();
//TrackPlayer.registerPlaybackService(() => require('./service.js'));
