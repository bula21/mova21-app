import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {Button, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import IconBack from '../generic/IconBack';
import MovaText from '../generic/MovaText';
import appConfig from '../../appConfig';
import languageManager from '../../helpers/LanguageManager';

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
  const [newUrl, updateNewUrl] = React.useState(appConfig.backendUrl);

  function applyUrl() {
    appConfig.backendUrl = newUrl;
  }

  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {t('settings')}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <PageContent>
          <SettingsSection>
            <MovaText style={{fontSize: 24, marginBottom: 10}}>
              {t('language')}
            </MovaText>
            <Button onPress={(e) => languageManager.changeLanguageTo("de")} title={t('language_german')} />
            <Button onPress={(e) => languageManager.changeLanguageTo("fr")} title={t('language_french')} />
            <Button onPress={(e) => languageManager.changeLanguageTo("it")} title={t('language_italian')} />
            <Button onPress={(e) => languageManager.changeLanguageTo("en")} title={t('language_english')} />
          </SettingsSection>
          <SettingsSection>
            <MovaText style={{fontSize: 24, marginBottom: 10}}>
              Development Settings
            </MovaText>
            <MovaText>Backend URL:</MovaText>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => updateNewUrl(text)}
              value={newUrl}
            />
            <Button onPress={applyUrl} title="Change Backend" />
          </SettingsSection>
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}
