import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaText from '../../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../../constants/MovaTheme';
import PageRefreshScrollView from "../PageRefreshScrollView";
import IconDetailView from "../../generic/IconDetailView";

const PageContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
  background: ${MovaTheme.colorYellow};
`;

const SectionTitle = styled.View`
  padding: 10px;
  padding-top: 60px;
  background: ${MovaTheme.colorBlack};
  color: ${MovaTheme.colorWhite}
`;

const DayView = styled.View`
  padding: 10px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  border-bottom-color: ${MovaTheme.colorBlack};
  border-bottom-width: 1px;
`;
const DayLabel = styled.View`

`;
const DayPill = styled.Text`
  padding: 4px 12px;
  margin-left: 10px;
  text-align: center;
  border-radius: 25px;
  background: ${MovaTheme.colorBlack};
`;
const DaySpacer = styled.View`
flex: 1;
`;
const DayIcon = styled.View`
  width: 10%;
  text-align: right;
  border-radius: 5px;
  float: left;
  align-self: flex-end;
`;

type RootStackParamList = {
    walkindetails?: {label: string},
    infospage: {page: IPage}
};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function WalkInPage({navigation, page}: Props) {
  const {t} = useTranslation();

  let dayRow = (label: string, pillText: string = '') => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('walkindetails', {label: label})}>
          <DayView>
            <DayLabel>
              <MovaText style={{fontSize: 20}}>{label}</MovaText>
            </DayLabel>
            {pillText ?
                <DayPill>
                  <MovaText style={{color: 'white'}}>{pillText}</MovaText>
                </DayPill>
              : []
            }
            <DaySpacer/>
            <DayIcon>
              <IconDetailView/>
            </DayIcon>
          </DayView>
        </TouchableOpacity>
    )
  }

  return (
    <PageRefreshScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {page.title}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <SectionTitle>
          <MovaText style={{color: '#ffffff', fontSize: 30}}>{t('every_day')}</MovaText>
        </SectionTitle>
        {dayRow(t('walk-in_activities'))}
        <SectionTitle>
          <MovaText style={{color: '#ffffff', fontSize: 30}}>{t('in_the_next_days')}</MovaText>
        </SectionTitle>
        {dayRow('So, 26. Juli', t('today'))}
        {dayRow('Mo, 27. Juli', t('tomorrow'))}
        {dayRow('Di, 28. Juli')}
        {dayRow('Mi, 29. Juli')}
        {dayRow('Do, 30. Juli')}
        {dayRow('Fr, 31. Juli')}
        {dayRow('Sa, 1. August')}
        {dayRow('So, 2. August')}
        {dayRow('Mo, 3. August')}
        {dayRow('Di, 4. August')}
      </PageContainer>
    </PageRefreshScrollView>
  );
}
