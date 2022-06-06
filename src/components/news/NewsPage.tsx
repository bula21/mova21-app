import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {ScrollView, TouchableOpacity} from 'react-native';
import MovaText from '../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../constants/MovaTheme';
import IconBack from '../generic/IconBack';
import {INews} from './INews';
import {StackScreenProps} from '@react-navigation/stack';
import moment from 'moment';
import DateObjectFromDatetime from '../../helpers/DateObjectFromDatetime';
import MovaMarkdown from '../generic/MovaMarkdown';
import appConfig from '../../appConfig';
import languageManager from "../../helpers/LanguageManager";

const PageContainer = styled.SafeAreaView`
  flex: 1;
`;

const PageHeader = styled.View<{color: string}>`
  padding: 10px;
  padding-top: 20px;
  background-color: ${(props) => MovaTheme.getColorByName(props.color)};
`;

const NewsTitle = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const PageContent = styled.View`
  padding: 10px;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 240px;
`;

const NewsDate = styled.View`
  padding: 0;
  padding-bottom: 20px;
`;
const NewsDateText = styled.Text`
  color: ${MovaTheme.colorGrey};
`;

type RootStackParamList = {newspage: {news: INews}};
type Props = StackScreenProps<RootStackParamList, 'newspage'>;

export default function NewsPage({route, navigation}: Props) {
  const {news} = route.params;
  const {t} = useTranslation();
  moment.locale(languageManager.currentLanguage)

  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader color="blue">
            <MovaHeadingText>
              <IconBack /> {t('news')}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        {news.image !== null && news.image.filename_disk ? (
          <NewsImage source={{uri: appConfig.backendUrl + '/assets/' + news.image.filename_disk}} />
        ) : null}
        <PageContent>
          <NewsTitle>
            <MovaText style={{fontSize: 24}}>{news.title}</MovaText>
          </NewsTitle>
          <NewsDate>
            <MovaText>
              <NewsDateText>
                {moment(DateObjectFromDatetime(news.date)).fromNow()}
              </NewsDateText>
            </MovaText>
          </NewsDate>
          <MovaMarkdown navigation={navigation}>{news.content}</MovaMarkdown>
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}
