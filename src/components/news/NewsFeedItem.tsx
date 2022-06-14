import React from 'react';
import styled from 'styled-components/native';
import MovaText from '../generic/MovaText';
import MovaTheme from '../../constants/MovaTheme';
import {TouchableOpacity} from 'react-native';
import {INews} from './INews';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import DateObjectFromDatetime from '../../helpers/DateObjectFromDatetime';
import appConfig from '../../appConfig';
import languageManager from "../../helpers/LanguageManager";

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
    <TouchableOpacity
      onPress={() => navigation.navigate('newspage', {news: news})}
      activeOpacity={1}
    >
      <NewsItemContainer color="blue">
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
  );
}
