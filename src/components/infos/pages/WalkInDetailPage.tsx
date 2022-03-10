import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import MovaText from '../../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../../constants/MovaTheme';
import PageRefreshScrollView from "../PageRefreshScrollView";

const PageContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
  background: ${MovaTheme.colorYellow};
`;

const DayTitle = styled.View`
  padding: 10px;
`;

type RootStackParamList = {walkindetails: {label: string}};
type Props = StackScreenProps<RootStackParamList, 'walkindetails'>;

export default function WalkInDetailPage({route, navigation}: Props) {
  const {t} = useTranslation();

  // refresh on mount because data might have changed
  useEffect(() => {
    // TODO
  }, []);

  return (
    <PageRefreshScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {route.params.label}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <DayTitle>
          <MovaText style={{fontSize: 30}}>Tagesdetails</MovaText>
        </DayTitle>
      </PageContainer>
    </PageRefreshScrollView>
  );
}
