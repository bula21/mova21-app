import React from 'react';

import styled from 'styled-components/native';
import MovaText from '../generic/MovaText';
import moment from 'moment';
import { IWeatherDayGroup } from './IWeatherDayGroup';
import { IWeather } from './IWeather';
import { StyleSheet, View } from 'react-native';
import MovaIcon from '../generic/MovaIcon';
import MovaTheme from '../../constants/MovaTheme';
import chooseRandom from '../../helpers/ArrayHelpers';

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

export function weatherIconByType(type: String, size: number = 50) {
  switch (type) {
    case 'Cloud': return <MovaIcon name="wolke" size={size} />;
    case 'CloudSun': return <MovaIcon name="wolke-sonne" size={size} />
    case 'CloudSunRain': return <MovaIcon name="wolke-sonne-regen" size={size} />
    case 'CloudRain': return <MovaIcon name="regen" size={size} />
    case 'Sun': return <MovaIcon name="sonne" size={size} />
    case 'Thunderstorm': return <MovaIcon name="blitz" size={size} />
    case 'Fog': return <MovaIcon name="nebel" size={size} />
    case 'Snow': return <MovaIcon name="schnee" size={size} />
    case undefined: return <MovaIcon name="regen" size={size} />
  }
}

export function weatherIconDetailedByType(type: String, size: number = 50) {
  switch (type) {
    case 'Cloud': return <MovaIcon name={chooseRandom(["wetter-figuren-wolke-scumpa", "wetter-figuren-wolke-valo", "wetter-figuren-wolke-vinci-tarantula"])} size={size} />;
    case 'CloudSun': return <MovaIcon name={chooseRandom(["wetter-figuren-wolke-sonne-fidu", "wetter-figuren-wolke-sonne-gaudi", "wetter-figuren-wolke-sonne-valo", "wetter-figuren-wolke-sonne-vinci-tarantula"])} size={size} />
    case 'CloudSunRain': return <MovaIcon name={chooseRandom(["wetter-figuren-wolke-sonne-regen-dispa", "wetter-figuren-wolke-sonne-regen-onesta", "wetter-figuren-wolke-sonne-regen-vinci-tarantula"])} size={size} />
    case 'CloudRain': return <MovaIcon name={chooseRandom(["wetter-figuren-regen-onesta", "wetter-figuren-regen-vinci-tarantula"])} size={size} />
    case 'Sun': return <MovaIcon name={chooseRandom(["wetter-figuren-sonne-deci", "wetter-figuren-sonne-dispa", "wetter-figuren-sonne-scumpa", "wetter-figuren-sonne-vinci-tarantula"])} size={size} />
    case 'Thunderstorm': return <MovaIcon name={chooseRandom(["wetter-figuren-blitz-deci", "wetter-figuren-blitz-gaudi", "wetter-figuren-blitz-vinci-tarantula"])} size={size} />
    case 'Fog': return <MovaIcon name={chooseRandom(["wetter-figuren-nebel-gaudi", "wetter-figuren-nebel-vinci-tarantula", "wetter-figuren-regen-fidu"])} size={size} />
    case 'Snow': return <MovaIcon name={chooseRandom(["wetter-figuren-schnee-scumpa", "wetter-figuren-schnee-vinci-tarantula", ""])} size={size} />
    case undefined: return <MovaIcon name={chooseRandom(["", "", ""])} size={size} />
  }
}

export default function WeatherDayGroup(weatherDayGroup: IWeatherDayGroup, t: any, index: number) {
  let weatherDayTime = (weatherItem: IWeather | undefined) => {
    return weatherItem ? (
    <WeatherDayTime>
      <MovaText style={{marginBottom: 10, marginTop: 10}}>{t(getTranslationKeyForDayTime(weatherItem))}</MovaText>
      {weatherIconByType(weatherItem?.weather)}
      <MovaText style={{marginTop: 10}}>{weatherItem.temperature}°</MovaText>
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
