import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import styled from 'styled-components/native';
import NewsFeedItem from './NewsFeedItem';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackNavigationProp} from '@react-navigation/stack';
import {INews} from './INews';
import appConfig from '../../appConfig';
import languageManager from '../../helpers/LanguageManager';
import LanguageManager from '../../helpers/LanguageManager';
import { BackendProxy } from '../../helpers/BackendProxy';
import MovaLoading from "../generic/MovaLoading";

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

type NavigationProp = StackNavigationProp<
  {newspage: {news: INews}},
  'newspage'
>;

export default function NewsMain({navigation}: {navigation: NavigationProp}) {
  const [news, setNews] = useState<INews[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [clickCounter, setClickCounter] = useState<number>(0);

  // load on mount
  useEffect(() => {
    loadNews().then((response) => {
      setLoading(false)
      setNews(response)
    });
    LanguageManager.onChange.subscribe(() => onRefresh());
    BackendProxy.subscribe(onRefresh);
  }, []);

  function onRefresh(showNoInternet: boolean = false) {
    setRefreshing(true);
    loadNews(showNoInternet).then((response) => {
      setNews(response);
      setRefreshing(false);
      setClickCounter(0)
    });
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
