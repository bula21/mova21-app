import React from 'react';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {ScrollView, TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackScreenProps} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaMarkdown from '../../generic/MovaMarkdown';
import MovaText from '../../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../../constants/MovaTheme';

const PageContainer = styled.View`
  background-color: #fff;
  flex: 1;
  margin-top: ${getStatusBarHeight()}px;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
`;
const PageContent = styled.View`
  padding: 10px;
`;
const StatusContent = styled.View`
  padding: 10px;
  background: ${MovaTheme.colorYellow};
`;

const AvailabilityView = styled.View`
  padding: 5px 0;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
`;
const AvailabilityLabel = styled.View`
  width: 90%;
`;
const AvailabilityCount = styled.View`
  width: 10%;
  text-align: right;
  border-radius: 5px;
`;

type RootStackParamList = {infospage: {page: IPage}};
type Props = StackScreenProps<RootStackParamList, 'infospage'>;

export default function BikePage({route, navigation}: Props) {
  const {t} = useTranslation();
  const {page} = route.params;

  let availabilityRow = (label: string, count: number) => {
    return (
      <AvailabilityView>
        <AvailabilityLabel>
          <MovaText>{label}</MovaText>
        </AvailabilityLabel>
        <AvailabilityCount style={{'backgroundColor': count <= 0 ? MovaTheme.colorOrange : 'white' }}>
          <MovaText style={{textAlign: 'center'}}>
            {count}
          </MovaText>
        </AvailabilityCount>
      </AvailabilityView>
    )
  }

  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {page.title}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        {page.data.open ? (
          <StatusContent>
            <MovaText style={{fontSize: 24, marginBottom: 5}}>{t('Aktuell verfügbar')}</MovaText>
            {availabilityRow(t('Velos'), page.data.bikes_available ? page.data.bikes_available : 0)}
            {availabilityRow(t('Cargobikes'), page.data.cargobikes_available ? page.data.cargobikes_available : 0)}
            {availabilityRow(t('Veloanhänger'), page.data.trailers_available ? page.data.trailers_available : 0)}
          </StatusContent>
        ) : (
          <StatusContent>
            <MovaText>{t('Der Veloverleih ist derzeit geschlossen.')}</MovaText>
          </StatusContent>
        )}
        <PageContent>
          <MovaMarkdown>{page.content}</MovaMarkdown>
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}
