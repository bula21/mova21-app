import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../constants/MovaTheme';
import MovaText from '../generic/MovaText';
import MovaIcon from '../generic/MovaIcon';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from './IPage';
import {InfopagesStore} from "../../stores/InfopagesStore";
import LanguageSwitcher from "./LanguageSwitcher";

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.View`
  flexGrow: 1
`;

const SearchInput = styled.TextInput`
  font-size: 32px;
  borderBottomWidth: 1px;
  borderColor: gray;
`;

type NavigationProp = StackNavigationProp<
  {infopage: {page: IPage}},
  'infopage'
>;

export default function InfosList({navigation}: {navigation: NavigationProp}) {
  const {t} = useTranslation();

  const [pages, setPages] = useState<IPage[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const [isSearchActive, setSearching] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  function onNewSearchKeyword(keyword: string) {
    setSearchKeyword(keyword);
    let pages = InfopagesStore.get();
    if (isSearchActive && typeof keyword != 'undefined' && keyword) {
      const sanitized = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexp = new RegExp(sanitized, 'i');
      pages = pages.filter((page) =>
        regexp.test(page.title) || regexp.test(page.content)
      );
    }
    setPages(pages);
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
            {!isSearchActive &&
              <MovaHeadingText>{t('info')}</MovaHeadingText>
            }
            <MovaIcon
              name='search-outline'
              size={50}
              color='black'
              onPress={() => setSearching(!isSearchActive)}
            />
            {isSearchActive &&
              <SearchBar>
                <SearchInput
                  onChangeText={onNewSearchKeyword}
                  value={searchKeyword}
                  placeholder={t('search_keyword')}
                />
              </SearchBar>
            }
          </InfosHeader>

        }
        ListFooterComponent={
          <LanguageSwitcher />
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </MainContainer>
  );
}
