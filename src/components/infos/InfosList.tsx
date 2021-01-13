import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../constants/MovaTheme';
import MovaText from '../generic/MovaText';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from './IPage';
import appConfig from '../../appConfig';
import languageManager from '../../helpers/LanguageManager';
import {RxEmitter} from 'rxemitter';

const MainContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const InfosItem = styled.View`
  padding: 10px;
`;

const InfosHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
`;

type NavigationProp = StackNavigationProp<
  {infopage: {page: IPage}},
  'infopage'
>;

async function loadPages(): Promise<IPage[]> {
  return fetch(appConfig.backendUrl + '/data/items/pages?filter[language]=' + (await languageManager.getCurrentLanguage()))
    .then((response) => response.json())
    .then((json) => {
      return json.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function InfosList({navigation}: {navigation: NavigationProp}) {
  const {t} = useTranslation();

  const [pages, setPages] = useState<IPage[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  // load on mount
  useEffect(() => {
    loadPages().then((response) => setPages(response));
  }, []);

  function onRefresh() {
    setRefreshing(true);
    loadPages().then((response) => {
      setPages(response);
      setRefreshing(false);
    });
  }

  RxEmitter.on('Language_Changed').subscribe(() => onRefresh());

  return (
    <MainContainer>
      <FlatList
        data={pages}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('infopage', {page: item})}>
            <InfosItem
              style={{
                backgroundColor:
                  index % 2 ? MovaTheme.colorBlue : MovaTheme.colorYellow,
              }}>
              <MovaText style={{fontSize: 40}}>{item.title}</MovaText>
            </InfosItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <InfosHeader>
            <MovaHeadingText>{t('info')}</MovaHeadingText>
          </InfosHeader>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </MainContainer>
  );
}
