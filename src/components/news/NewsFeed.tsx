import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import NewsFeedItem from './NewsFeedItem';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackNavigationProp} from '@react-navigation/stack';
import {INews} from './INews';
import appConfig from '../../appConfig';

const MainContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const NewsHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
`;

async function loadNews(): Promise<INews[]> {
  return fetch(
    appConfig.backendUrl + '/data/items/news?fields=*.*&filter[language]=de',
  )
    .then((response) => response.json())
    .then((json) => {
      return json.data;
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

  // load on mount
  useEffect(() => {
    loadNews().then((response) => setNews(response));
  }, []);

  function onRefresh() {
    setRefreshing(true);
    loadNews().then((response) => {
      setNews(response);
      setRefreshing(false);
    });
  }

  return (
    <MainContainer>
      <FlatList
        data={news}
        renderItem={({item}) => (
          <NewsFeedItem news={item} navigation={navigation} />
        )}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <NewsHeader>
            <MovaHeadingText>mova-News</MovaHeadingText>
          </NewsHeader>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </MainContainer>
  );
}
