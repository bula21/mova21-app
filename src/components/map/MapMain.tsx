import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';


const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default function MapMain() {
  return (
    <MainContainer>
      <SafeAreaView style={{flex: 1, alignSelf: 'stretch'}}>
            <WebView style={{alignSelf: 'stretch', flex: 1}} source={{ uri: 'https://map.mova.ch/ClientWebApp/?project=movaMap&legend=Public&rotation=0.00&scale=20370&center=2666060,1150607&layers=08c222ca-6b24-4071-8e3f-daff3fed16c1' }} />
      </SafeAreaView>
    </MainContainer>
  );
}
