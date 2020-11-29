import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity} from 'react-native';
import IconBack from '../generic/IconBack';
import MovaText from '../generic/MovaText';
import appConfig from '../../appConfig';

const PageContainer = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight()}px;
`;

const PageHeader = styled.View<{color: string}>`
  padding: 10px;
  padding-top: 20px;
`;

const PageContent = styled.View`
  padding: 10px;
`;

type Props = StackScreenProps<any, 'settings'>;

export default function SettingsMain({route, navigation}: Props) {
  const {t} = useTranslation();
  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader color="blue">
            <MovaHeadingText>
              <IconBack /> {t('settings')}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <PageContent>
          <MovaText style={{fontSize: 24}}>{t('Backend')}</MovaText>
          <MovaText>Backend URL: {appConfig.backendUrl}</MovaText>
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}
