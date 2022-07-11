import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import styled from 'styled-components/native';
import NewsFeedItem from './NewsFeedItem';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackNavigationProp} from '@react-navigation/stack';
import {INews} from './INews';
import languageManager from '../../helpers/LanguageManager';
import LanguageManager from '../../helpers/LanguageManager';
import { BackendProxy } from '../../helpers/BackendProxy';
import MovaLoading from "../generic/MovaLoading";
import { IWeather } from '../weather/IWeather';
import {useTranslation} from 'react-i18next';
import chooseRandom from '../../helpers/ArrayHelpers';

const MainContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const NewsHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
`;

async function loadNews(showNoInternet: boolean = false): Promise<INews[]> {
  return BackendProxy.fetchJson(
    'items/news?fields=*.*&sort=-date&filter[language]=' + (await languageManager.getCurrentLanguageAsync()),
    showNoInternet,
  )
    .then((json) => {
      return json ? json.data : [];
    })
    .catch((error) => {
      console.error(error);
    });
}

async function loadWeatherEntriesOfToday(showNoInternet: boolean = false): Promise<IWeather[]> {
  return BackendProxy.fetchJson(
    'items/Weather?fields=*.*&sort=-date&filter[date]=' + new Date().toISOString().split('T')[0],
    showNoInternet
  )
    .then((json) => {
      return json ? json.data : [];
    })
    .catch((error) => {
      console.error(error);
    });
}

type NavigationProp = StackNavigationProp<
  {newspage: {news: INews}},
  'newspage'
>;

export default function NewsMain({navigation}: {navigation: NavigationProp}) {
  const [news, setNews] = useState<INews[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [clickCounter, setClickCounter] = useState<number>(0);
  const {t} = useTranslation();

  // load on mount
  useEffect(() => {
    loadNews().then((response) => {
      loadWeatherEntriesOfToday().then((weatherEntriesOfToday) => {
        unshiftMeteoToNews(weatherEntriesOfToday, response);
        setLoading(false);        
        setNews(response);
      })
    });
    LanguageManager.onChange.subscribe(() => onRefresh());
    BackendProxy.subscribe(onRefresh);
  }, []);

  function onRefresh(showNoInternet: boolean = false) {
    setRefreshing(true);
    loadNews(showNoInternet).then((response) => {
      loadWeatherEntriesOfToday(showNoInternet).then((weatherEntriesOfToday) => {
        unshiftMeteoToNews(weatherEntriesOfToday, response);
        setRefreshing(false);        
        setNews(response);
      })
      setClickCounter(0)
    });
  }

  function unshiftMeteoToNews(weatherEntriesOfToday: IWeather[], response: INews[]) {
    if (weatherEntriesOfToday.length > 0) {
      let minTemp = Math.min(...weatherEntriesOfToday.map(w => w.temperature));
      let maxTemp = Math.max(...weatherEntriesOfToday.map(w => w.temperature));
      let title = `${minTemp}° - ${maxTemp}°`;
      let icon = weatherEntriesOfToday.find(e => e.daytime = 'Midday')?.weather ?? weatherEntriesOfToday[0].weather;
      let funnyExcept = getFunnyExerpt(weatherEntriesOfToday)
      let exerpt = funnyExcept.substring(0, funnyExcept.indexOf(':') + 1);
      let exerptNontTransparent = funnyExcept.substring(funnyExcept.indexOf(':') + 1);
      let meteoNews: INews = {
        title: title,
        content: icon,
        date: new Date().toISOString(),
        excerpt: exerpt,
        excerptNonTransparent: exerptNontTransparent,
        image: null,
        language: '',
        isMeteo: true,
        id: -1
      };
      response.unshift(meteoNews);
    }
  }

  function getFunnyExerpt(weatherEntriesOfToday: IWeather[]): string {
    var currentHour = new Date().getHours()
    let base: string;
    let addtions: string[] = [];
    if (currentHour > 20 || currentHour < 5) {
      base = t('tonight');
      let weatherOfTonight = weatherEntriesOfToday.find(e => e.daytime == 'Night');
      if (weatherOfTonight) {
        if (weatherOfTonight.temperature < 10) {
          if (weatherOfTonight.temperature <= 0)
            addtions.push(chooseRandom(['🧊'])); 
          if (weatherOfTonight.temperature < 5)
            addtions.push(chooseRandom(['🥶🥶🥶'])); 
          if (weatherOfTonight.temperature < 8)
            addtions.push(chooseRandom(['🥶🥶'])); 
          else
            addtions.push(chooseRandom(['🥶'])); 
        }
        if (['Sun'].includes(weatherOfTonight.weather)) {
          addtions.push(chooseRandom(['🌛', '🌃'])); 
        }
        if (['CloudRain', 'CloudSunRain'].includes(weatherOfTonight.weather)) {
          addtions.push(chooseRandom(['☔'])); 
        }
        addtions.push(chooseRandom(['😴', '🛌', '⛺', '👻' ]));        
      }
    }
    else {
      base = t('thisAfternoon');
      let weatherOfAfternoon = weatherEntriesOfToday.find(e => e.daytime = 'Midday');
      if (weatherOfAfternoon) {
        if (weatherOfAfternoon.temperature > 25) {
          if (weatherOfAfternoon.temperature > 30)
            addtions.push(chooseRandom(['🔥🔥🔥'])); 
          else
            addtions.push(chooseRandom(['🥵', '🌶'])); 
        }
        if (['Cloud', 'CloudSun'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['🙄', '🥱', '😔', '🤔'])); 
        }
        if (['Thunderstorm'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['😲', '😔', '🧊🐈', '⚠', '🚨']));
        }
        if (['Sun'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['🤘', '😎', '⛱', '🧴', '🏊‍♀️', '🙌' ]));
        }
        if (['CloudRain', 'CloudSunRain'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['☔']));
        }
        if (['CloudSunRain'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['🌈']));
        }
        if (['Fog'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['👻' ]));
        }
        if (['Snow'].includes(weatherOfAfternoon.weather)) {
          addtions.push(chooseRandom(['⛄', '⛷']));
        }
        if (addtions.length == 0) {
          addtions.push(weatherOfAfternoon.weather); 
        }
      }
    }
    return `${base}:   ${shuffle(addtions).join('  ')}`;
  }

  function onHeaderClick() {
    setClickCounter(clickCounter + 1);
    if (clickCounter >= 7) {
      setClickCounter(0);
      navigation.navigate('settings');
    }
  }

  return (
    <MainContainer>
      {isLoading
          ?
            <View style={{marginTop: 150}}><MovaLoading/></View>
          :
            <FlatList
              data={news}
              renderItem={({item}) => (
                  <NewsFeedItem news={item} navigation={navigation}/>
              )}
              keyExtractor={(item) => String(item.id)}
              ListHeaderComponent={
                <NewsHeader>
                  <MovaHeadingText onPress={() => onHeaderClick()}>
                    mova-News
                  </MovaHeadingText>
                </NewsHeader>
              }
              refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={()=>onRefresh(true)}/>
              }
          />
      }
    </MainContainer>
  );
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};