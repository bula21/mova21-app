import React from 'react';
import styled from 'styled-components/native';
import MovaText from '../generic/MovaText';
import MovaTheme from '../../constants/MovaTheme';
import { Platform, TouchableOpacity, View } from 'react-native';
import {INews} from './INews';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import DateObjectFromDatetime from '../../helpers/DateObjectFromDatetime';
import appConfig from '../../appConfig';
import languageManager from "../../helpers/LanguageManager";
import { weatherIconDetailedByType } from '../weather/WeatherDayGroup';

const NewsItemContainer = styled.View<{color: string}>`
  padding-bottom: 20px;
  background-color: ${(props) => MovaTheme.getColorByName(props.color)};
  margin-bottom: 10px;
`;

const NewsItemTitle = styled.View`
  padding: 10px;
  padding-bottom: 0;
`;

const NewsItemDate = styled.View`
  padding: 10px;
  padding-top: 5px;
`;
const NewsItemDateText = styled.Text`
  color: ${MovaTheme.colorGrey};
`;

const NewsImageContainer = styled.View`
  background: white;
`;

const MeteoContainer = styled.View`
  background: ${MovaTheme.colorYellow};
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 240px;
`;

type NavigationProp = StackNavigationProp<
  {newspage: {news: INews}},
  'newspage'
>;

export default function NewsFeedItem({
  news,
  navigation,
}: {
  news: INews;
  navigation: NavigationProp;
}) {
  moment.locale(languageManager.currentLanguage)
  return (
    news.isMeteo ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('weatherPage', {news: news})}
          activeOpacity={1}
        >
          <MeteoContainer>
            <View>
              <MovaText style={{fontSize: 24, marginTop: 5}}>{news.title}</MovaText>
              <MovaText style={{marginTop: Platform.OS === 'ios' ? 5 : 0}}>
                <NewsItemDateText>{news.excerpt}</NewsItemDateText>
              </MovaText>
            </View>
            <View>
              {weatherIconDetailedByType(news.content, 70)}
            </View>
          </MeteoContainer>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('newspage', {news: news})}
          activeOpacity={1}
        >
          <NewsItemContainer color={news.color ? news.color : 'blue'}>
            {news.image !== null && news.image.filename_disk ? (
                <NewsImageContainer>
                  <NewsImage source={{uri: appConfig.backendUrl + '/assets/' + news.image.filename_disk}} />
                </NewsImageContainer>
            ) : null}
            <NewsItemTitle>
              <MovaText style={{fontSize: 24}}>{news.title}</MovaText>
            </NewsItemTitle>
            <NewsItemDate>
              <MovaText>
                <NewsItemDateText>
                  {moment(DateObjectFromDatetime(news.date)).fromNow()}
                </NewsItemDateText>
              </MovaText>
            </NewsItemDate>
          </NewsItemContainer>
        </TouchableOpacity>
      )
  );
}
