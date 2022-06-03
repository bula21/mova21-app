import React from 'react';

import styled from 'styled-components/native';
import MovaText from '../generic/MovaText';
import moment from 'moment';
import { IWeatherDayGroup } from './IWeatherDayGroup';
import { IWeather } from './IWeather';
import { StyleSheet, View } from 'react-native';
import MovaIcon from '../generic/MovaIcon';
import MovaTheme from '../../constants/MovaTheme';

const WeatherDayGroupContainer = styled.View`
  width: 100%;
`;

const WeatherGroupItemTitle = styled.View`
  padding: 10px;
  padding-bottom: 0;
`;

const WeatherDayTimes = styled.View`
  padding: 10px;
  padding-top: 0;
  display: flex;
  flexDirection: row;
  alignItems: center;
`;

const WeatherDayTime = styled.View`
  width: 25%;
  align-items: center;
`;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center', 
		alignSelf: 'center'
	},
});

function getTranslationKeyForDayTime(weather: IWeather | undefined): string {
  switch (weather?.daytime) {
    case 'Night':
      return 'weather_daytime_night';
    case 'Morning':
      return 'weather_daytime_morning';
    case 'Midday':
      return 'weather_daytime_midday';
    case 'Evening':
      return 'weather_daytime_evening';
  }
  return '';
}

function getColor(index: number) {
  return index % 2 ? MovaTheme.colorBlue : MovaTheme.colorYellow;
}

export default function WeatherDayGroup(weatherDayGroup: IWeatherDayGroup, t: any, index: number) {
  let weatherIconByType = (type: String)  => {
    switch (type) {
      case 'Cloud': return <MovaIcon name="weather" size={50} />;
      case 'CloudSun': return <MovaIcon name="sonne" size={50} />
      case 'CloudSunRain': return <MovaIcon name="regen" size={50} />
      case 'CloudRain': return <MovaIcon name="regen" size={50} />
      case 'Sun': return <MovaIcon name="sonne" size={50} />
      case 'Thunderstorm': return <MovaIcon name="blitz" size={50} />
      case 'Fog': return <MovaIcon name="weather" size={50} />
      case 'Snow': return <MovaIcon name="regen" size={50} />
      case undefined: return <MovaIcon name="search-outline" size={50} />
    }
  }

  let weatherDayTime = (weatherItem: IWeather | undefined) => {
    return weatherItem ? (
    <WeatherDayTime>
      <MovaText>{t(getTranslationKeyForDayTime(weatherItem))}</MovaText>
      {weatherIconByType(weatherItem?.weather)}
      <MovaText>{weatherItem.temperature}°</MovaText>
    </WeatherDayTime>) : null
  }

  return (
    <WeatherDayGroupContainer style={{
      backgroundColor: getColor(index),
    }}>
      <WeatherGroupItemTitle>
        <MovaText style={{fontSize: 24}}>{moment(weatherDayGroup.date, 'YYYY-MM-DD').format('dddd, D. MMM')}</MovaText>
      </WeatherGroupItemTitle>
      <WeatherDayTimes>        
        {weatherDayTime(weatherDayGroup.morning)}
        {weatherDayTime(weatherDayGroup.midday)}
        {weatherDayTime(weatherDayGroup.evening)}
        {weatherDayTime(weatherDayGroup.night)}        
      </WeatherDayTimes>
    </WeatherDayGroupContainer>
  )
}