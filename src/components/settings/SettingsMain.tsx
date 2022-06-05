import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {Button, Image, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import IconBack from '../generic/IconBack';
import MovaText from '../generic/MovaText';
import appConfig from '../../appConfig';
import languageManager from '../../helpers/LanguageManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovaLoading from "../generic/MovaLoading";

let pkg = require('../../../package.json');

const PageContainer = styled.SafeAreaView`
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
  padding-top: 20px;
`;

const PageContent = styled.View`
  padding: 10px;
`;

const SettingsSection = styled.View`
  margin-bottom: 40px;
`;

type Props = StackScreenProps<any, 'settings'>;

export default function SettingsMain({route, navigation}: Props) {
  const {t} = useTranslation();
  const [newUrl, updateNewUrl] = useState(appConfig.backendUrl);
  const [showDev, setShowDev] = useState<boolean>(false);

  function applyUrl() {
    appConfig.backendUrl = newUrl;
  }

  let clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  }

  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> Hidden Page 🌚
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <PageContent>
          <SettingsSection>
            <MovaText style={{fontSize: 24, marginBottom: 10}}>
              Sprache
            </MovaText>
            <Button onPress={(e) => languageManager.changeLanguageTo("de")} title={t('language_german')} />
            <Button onPress={(e) => languageManager.changeLanguageTo("fr")} title={t('language_french')} />
            <Button onPress={(e) => languageManager.changeLanguageTo("it")} title={t('language_italian')} />
            <Button onPress={(e) => languageManager.changeLanguageTo("en")} title={t('language_english')} />
          </SettingsSection>
          <SettingsSection>
            <MovaText style={{fontSize: 24, marginBottom: 10}}>App</MovaText>
            <View style={{marginBottom: 30}}>
              <Button onPress={clearAsyncStorage} title="Clear Cache" />
            </View>
            <TouchableOpacity onPress={() => setShowDev(!showDev)}>
              <MovaText style={{textAlign: 'center'}}>App Version {pkg.version}</MovaText>
            </TouchableOpacity>
          </SettingsSection>
          { showDev ?
                <SettingsSection>
                  <MovaText style={{fontSize: 24, marginBottom: 10}}>
                    Development Settings 👷
                  </MovaText>
                  <MovaText style={{marginBottom: 10}}>Backend URL:</MovaText>
                  <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10}}
                    onChangeText={(text) => updateNewUrl(text)}
                    value={newUrl}
                  />
                  <Button onPress={applyUrl} title="Change Backend" />
                </SettingsSection>
              : null
          }
          <MovaLoading/>
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}
