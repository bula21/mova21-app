import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../constants/MovaTheme';
import MovaText from '../generic/MovaText';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from './IPage';
import {InfopagesStore} from '../../stores/InfopagesStore';
import LanguageSwitcher from './LanguageSwitcher';
import {useIsFocused} from '@react-navigation/native';
import MovaSearchbarHeading from '../generic/MovaSearchbarHeading';
import MovaLoading from "../generic/MovaLoading";

const MainContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const InfosItem = styled.View`
  padding: 10px;
`;

const InfosHeader = styled.View`
  height: 80px;
`;

type NavigationProp = StackNavigationProp<{infopage: {page: IPage}}, 'infopage'>;

function mainPageFilter(page: IPage): boolean {
  return page.sub_page === false;
}

function mainPages(): IPage[] {
  return InfopagesStore.get().filter(mainPageFilter);
}

export default function InfosList({navigation}: {navigation: NavigationProp}) {
  const {t} = useTranslation();

  const [pages, setPages] = useState<IPage[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleSearch = (pages: IPage[]) => {
    setPages(pages);
  };
  const isFocused = useIsFocused();

  // load on mount
  useEffect(() => {
    setPages(mainPages());
    const subscription = InfopagesStore.subscribe((pages: IPage[]) => {
      setPages(pages.filter(mainPageFilter));
    });
    InfopagesStore.reload(false).then(() => {
      setLoading(false)
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function onRefresh() {
    setRefreshing(true);
    InfopagesStore.reload(true).then(() => {
      setPages(mainPages());
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
      { isLoading
          ?
          <View style={{marginTop: 150}}><MovaLoading/></View>
          :
            <FlatList
              data={pages}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => navigation.navigate('infopage', {page: item})}>
                  <InfosItem
                    style={{
                      backgroundColor: getColor(item, index),
                    }}>
                    <MovaText style={{fontSize: 40}}>{item.title}</MovaText>
                  </InfosItem>
                </TouchableOpacity>
              )}
              keyExtractor={item => String(item.id)}
              ListHeaderComponent={
                <InfosHeader>
                  <MovaSearchbarHeading
                    headerText={t('info')}
                    searchableAttributes={['title', 'content']}
                    getData={InfopagesStore.get}
                    getDefaultData={mainPages}
                    handleSearch={handleSearch}
                    isFocused={isFocused}></MovaSearchbarHeading>
                </InfosHeader>
              }
              ListFooterComponent={<LanguageSwitcher />}
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
      }
    </MainContainer>
  );
}
