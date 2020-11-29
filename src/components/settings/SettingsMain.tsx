import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {Button, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import IconBack from '../generic/IconBack';
import MovaText from '../generic/MovaText';
import appConfig from '../../appConfig';

const PageContainer = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight()}px;
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
            <MovaText>Sprachwechsler hier einfügen</MovaText>
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
