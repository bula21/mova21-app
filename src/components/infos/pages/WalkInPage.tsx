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
import moment from 'moment';
import languageManager from "../../../helpers/LanguageManager";

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
    walkindetails?: {label: string, filter: string},
    infospage: {page: IPage}
};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function WalkInPage({navigation, page}: Props) {
  const {t} = useTranslation();

  let dayRow = (label: string, filter: string = '') => {
    let pillText: string = '';
    if (filter == todayISO) { pillText = t('today')}
    if (filter === tomorrowISO) { pillText = t('tomorrow')}
    return (
        <TouchableOpacity onPress={() => navigation.navigate('walkindetails', {label: label, filter: filter})} key={filter}>
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

  // specific dates to show
  let dates = [
      '2022-07-23',
      '2022-07-24',
      '2022-07-25',
      '2022-07-26',
      '2022-07-27',
      '2022-07-28',
      '2022-07-29',
      '2022-07-30',
      '2022-07-31',
      '2022-08-01',
      '2022-08-02',
      '2022-08-03',
      '2022-08-04',
      '2022-08-05',
      '2022-08-06',
  ];

  // from Date Object to YYYY-MM-DD
  let toISODate = (date: Date): string => {
      return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
  }

  // from YYYY-MM-DD to Date Object
  let fromISODate = (date: string): Date => {
      return new Date(parseInt(date.substring(0,4)), parseInt(date.substring(5,7)) - 1, parseInt(date.substring(8,10)));
  }

  let formatReadableDate = (date: Date): string => {
      return moment(date).format('dd, D. MMMM');
  }

  let today = new Date();
  let todayISO = toISODate(today);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let tomorrowISO = toISODate(tomorrow);

  moment.locale(languageManager.currentLanguage)

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
        {dayRow(t('walk-in_activities'), 'walk-in')}
        {dayRow(t('rover_activities'), 'rover')}
        <SectionTitle>
          <MovaText style={{color: '#ffffff', fontSize: 30}}>{t('in_the_next_days')}</MovaText>
        </SectionTitle>
        {dates.filter(date => date >= todayISO).map(date => (
            dayRow(formatReadableDate(fromISODate(date)), date)
        ))}
      </PageContainer>
    </PageRefreshScrollView>
  );
}
