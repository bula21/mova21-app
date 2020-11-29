/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import "./src/i18n";
//import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
//TrackPlayer.registerPlaybackService(() => require('./service.js'));
