import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaTheme from '../../../constants/MovaTheme';
import {WebView} from "react-native-webview";

const PageContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
  background: ${MovaTheme.colorYellow};
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;


type RootStackParamList = {infospage: {page: IPage}};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function UrlPage({navigation, page}: Props) {
  return (
    <PageContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <PageHeader>
          <MovaHeadingText>
            <IconBack /> {page.title}
          </MovaHeadingText>
        </PageHeader>
      </TouchableOpacity>
      <MainContainer>
        <SafeAreaView style={{flex: 1, alignSelf: 'stretch'}}>
          <WebView
              style={{alignSelf: 'stretch', flex: 1}}
              source={{ uri: page.data && page.data.url ? page.data.url : 'https://mova.ch' }}
          />
        </SafeAreaView>
      </MainContainer>
    </PageContainer>
  );
}
