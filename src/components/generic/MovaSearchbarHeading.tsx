import React, {useRef, useState} from 'react';
import {Animated, Easing, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import MovaHeadingText from './MovaHeadingText';
import {useTranslation} from 'react-i18next';
import MovaIcon from './MovaIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../infos/IPage';
import IconBack from './IconBack';

type RootStackParamList = {infospage: {page: IPage}};

type Props<T> = {
  headerText: string;
  searchableAttributes: (keyof T)[];
  /** All data for which data should be applied. */
  getData: () => T[];
  /** Default data is displayed when search is inactive. */
  getDefaultData: () => T[];
  handleSearch: (data: T[]) => void;
  navigation?: StackNavigationProp<RootStackParamList, 'infospage'>;
  isFocused?: boolean;
};

const SearchBarHeader = styled.View`
  flex: 1;
  padding: 10px;
  flex-direction: row;
  margin-top: 10px;
`;

const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  font-size: 32px;
  border-bottom-width: 3px;
  border-color: black;
  margin-top: -10px;
  margin-left: 10px;
  flex-grow: 1;
`;

const MovaHeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MovaAnimatedHeaderContent = Animated.createAnimatedComponent(MovaHeaderContent);

export default function MovaSearchbarHeading<T>(props: Props<T>) {
  const {t} = useTranslation();
  const [isSearchActive, setSearching] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const animationProgress = useRef(new Animated.Value(0)).current;

  if(props.isFocused) {
    if (isSearchActive && !props.isFocused) {
      leaveSearch();
    }
  }

  function enterSearch() {
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.out(Easing.circle),
    }).start(() => {
      setSearching(true);
      animationProgress.setValue(0);
    });
  }

  function clearSearch() {
    if (searchKeyword === '') {
      leaveSearch();
    } else {
      onNewSearchKeyword('');
    }
  }

  function leaveSearch() {
    onNewSearchKeyword('');
    setSearching(false);
    animationProgress.setValue(1);
    Animated.timing(animationProgress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.out(Easing.circle),
    }).start();
  }

  function onNewSearchKeyword(keyword: string) {
    setSearchKeyword(keyword);
    if (keyword === '') {
      props.handleSearch(props.getDefaultData());
      return;
    }
    let objects = props.getData();
    if (isSearchActive && typeof keyword != 'undefined' && keyword) {
      const sanitized = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexp = new RegExp(sanitized, 'i');
      objects = objects.filter(object => {
        for (const key of props.searchableAttributes) {
          let str = object[key];
          if (typeof str === 'string' && regexp.test(str)) {
            return true;
          }
        }
      });
    }
    props.handleSearch(objects);
  }

  return (
    <SearchBarHeader>
      {!isSearchActive && (
        <MovaAnimatedHeaderContent
          style={[
            {
              flex: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.00001],
              }),
              opacity: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.5],
              }),
              fontSize: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 1],
              }),
              marginTop: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 25],
              }),
            },
          ]}>
          {props.navigation ? (
            <TouchableOpacity style={{marginRight: 12}} onPress={() => props.navigation!.goBack()}>
              <MovaHeadingText numberOfLines={1} ellipsizeMode={"tail"} style={{marginTop: -10, flex: 1, flexDirection: "row"}}>
                <IconBack />
                {props.headerText}
              </MovaHeadingText>
            </TouchableOpacity>
          ) : <MovaHeadingText style={{marginTop: 0}}>{props.headerText}</MovaHeadingText>}
        </MovaAnimatedHeaderContent>
      )}
      <SearchBar style={isSearchActive ? {flexGrow: 1} : {}}>
        <MovaIcon
          name="search-outline"
          size={48}
          color="black"
          onPress={() => (isSearchActive ? leaveSearch() : enterSearch())}
        />
        {isSearchActive && (
          <SearchInput onChangeText={onNewSearchKeyword} value={searchKeyword} placeholder={t('search_keyword')} />
        )}
        {isSearchActive && (
          <Icon
            name={'close-sharp'}
            size={40}
            color="black"
            onPress={() => clearSearch()}
            style={{paddingLeft: 10}}
          />
        )}
      </SearchBar>
    </SearchBarHeader>
  );
}
