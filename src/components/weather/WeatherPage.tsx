import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../constants/MovaTheme';
import IconBack from '../generic/IconBack';
import {IWeather} from './IWeather';
import { StackScreenProps} from '@react-navigation/stack';
import { IWeatherDayGroup } from './IWeatherDayGroup';
import WeatherDayGroup from './WeatherDayGroup';
import LanguageManager from '../../helpers/LanguageManager';
import { BackendProxy } from '../../helpers/BackendProxy';

const PageContainer = styled.SafeAreaView<{color: string}>`
  background: ${(props) => MovaTheme.getColorByName(props.color)};
  flex: 1;
`;

const PageHeader = styled.View<{color: string}>`
  padding: 10px;
  padding-top: 20px;
  background-color: ${(props) => MovaTheme.getColorByName(props.color)};
`;

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group])
      previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);


async function loadWeather(showNoInternet: boolean = false): Promise<IWeatherDayGroup[] | void> {
    const offset = new Date().getTimezoneOffset()
    let dateStart = new Date(new Date().getTime() - (offset*60*1000))
    let dateStartString = dateStart.toISOString().split('T')[0]
    let dateEnd = new Date(new Date().getTime() - (offset*60+1000) + (86400000*3))
    let dateEndString = dateEnd.toISOString().split('T')[0]
    return BackendProxy.fetchJson(`/items/Weather?fields=*.*&sort=date&filter[date][_between]=[${dateStartString},${dateEndString}]`, showNoInternet)
      .then((json) => {
        let weatherEntries: IWeather[];
        weatherEntries = json.data;
        let groups = groupBy(weatherEntries, x => x.date);
        let weatherGroups: IWeatherDayGroup[] = [];
        for (let date in groups) {
          weatherGroups.push({
            date: date,
            morning: groups[date].find(w => w.daytime == 'Morning'),
            midday: groups[date].find(w => w.daytime == 'Midday'),
            evening: groups[date].find(w => w.daytime == 'Evening'),
            night: groups[date].find(w => w.daytime == 'Night')
          });
        }
        return weatherGroups;
      })
      .catch((error) => {
        console.error(error);
      });
  }

//type RootStackParamList = {infospage: {page: IPage}};
//type Props = {navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage};

type RootStackParamList = {weatherPage: {}};
type Props = StackScreenProps<RootStackParamList, 'weatherPage'>;

export default function WeatherPage({navigation}: Props) {
  const [weatherDayGroups, setWeatherDayGroups] = useState<IWeatherDayGroup[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const {t} = useTranslation();

  // load on mount
  useEffect(() => {
    loadWeather().then((response) => setWeatherDayGroups(response ?? []));
    LanguageManager.onChange.subscribe(() => onRefresh());
  }, []);

  function onRefresh() {
    setRefreshing(true);
    loadWeather(true).then((response) => {
      setWeatherDayGroups(response ?? []);
      setRefreshing(false);
    });
  }

  return (
    <PageContainer color="blue">
      <FlatList
        data={weatherDayGroups}
        renderItem={({item, index}) => WeatherDayGroup(item, t, index)}
        keyExtractor={(item) => String(item.date)}
        ListHeaderComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <PageHeader color="blue">
              <MovaHeadingText>
                <IconBack /> {t('weather')}
              </MovaHeadingText>
            </PageHeader>
          </TouchableOpacity>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </PageContainer>
  );
}
