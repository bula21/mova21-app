import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import languageManager from '../../helpers/LanguageManager';
import { useFocusEffect } from '@react-navigation/native';


const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

type Props = { route: { params: { id?: any } }};

export default function MapMain({route}: Props) {

  const [language, setLanguage] = useState("de");
  const [mapUrl, setMapUrl] = useState('');

  function getBaseUrl(): string {
    return 'https://map.mova.ch/ClientWebApp/legend?project=movaMapMobile&legend=Mobile&mapOnly=true&mapOnlySearch=true';
  }

  // on mount
  useEffect(() => {
    setMapUrl(getBaseUrl());
    setLanguage(languageManager.currentLanguage);
    // make sure the map updates, when the language changes
    const subscription = languageManager.onChange.subscribe(() => {
      setLanguage(languageManager.currentLanguage);
    })
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // update url from map link
  useFocusEffect(
    React.useCallback(() => {
      if (route && route.params && route.params.id) {
        setMapUrl(getBaseUrl() + '&search=3eb795f9-6a91-4f83-a387-4a89541e7b39&searchScale=4000&query=' + route.params.id);
      }
    }, [mapUrl, route])
  );

  return (
    <MainContainer>
      <SafeAreaView edges={['top']} style={{flex: 1, alignSelf: 'stretch'}}>
        {mapUrl ? <WebView
            mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'}
            style={{alignSelf: 'stretch', flex: 1}}
            source={{uri: mapUrl + '&lang=' + language}}
          />
          : null
        }
      </SafeAreaView>
    </MainContainer>
  );
}
