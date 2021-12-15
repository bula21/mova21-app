import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../constants/MovaTheme';
import MovaText from '../generic/MovaText';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from './IPage';
import {InfopagesStore} from "../../stores/InfopagesStore";

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

export default function InfosList({navigation}: {navigation: NavigationProp}) {
  const {t} = useTranslation();

  const [pages, setPages] = useState<IPage[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  // load on mount
  useEffect(() => {
    setPages(InfopagesStore.get());
    const subscription = InfopagesStore.subscribe((pages: IPage[]) => {
      setPages(pages);
    })
    InfopagesStore.reload();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function onRefresh() {
    setRefreshing(true);
    InfopagesStore.reload().then(() => {
      setPages(InfopagesStore.get());
      setRefreshing(false);
    });
  }

  function getColor(item: IPage, index: number): string {
    if (item.list_color && item.list_color.length === 7 && item.list_color[0] === '#') {
      return item.list_color;
    }
    return index % 2 ? MovaTheme.colorBlue : MovaTheme.colorYellow;
  }

  return (
    <MainContainer>
      <FlatList
        data={pages}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('infopage', {page: item})}>
            <InfosItem
              style={{
                backgroundColor: getColor(item, index)
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
