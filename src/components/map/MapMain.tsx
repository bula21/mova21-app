import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import languageManager from '../../helpers/LanguageManager';


const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default function MapMain() {

  const [language, setLanguage] = useState("de");

  // on mount
  useEffect(() => {
    setLanguage(languageManager.currentLanguage);
    // make sure the map updates, when the language changes
    const subscription = languageManager.onChange.subscribe(() => {
      setLanguage(languageManager.currentLanguage);
    })
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <MainContainer>
      <SafeAreaView edges={['top']} style={{flex: 1, alignSelf: 'stretch'}}>
        <WebView
            mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'}
            style={{alignSelf: 'stretch', flex: 1}}
            source={{ uri: 'https://map.mova.ch/ClientWebApp/legend?project=movaMapMobile&legend=Mobile&mapOnly=true&mapOnlySearch=true&lang=' + language }}
        />
      </SafeAreaView>
    </MainContainer>
  );
}
