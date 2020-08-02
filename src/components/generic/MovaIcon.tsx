import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../assets/mova-icon-font/selection.json';

//const expoAssetId = require("../../../assets/mova-icon-font/fonts/icomoon.ttf");
export default createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);
