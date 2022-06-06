import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaMarkdown from '../../generic/MovaMarkdown';
import MovaText from '../../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../../constants/MovaTheme';
import {InfopagesStore} from '../../../stores/InfopagesStore';
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
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function BikePage({navigation, page}: Props) {
  const {t} = useTranslation();

  // refresh on mount because live numbers might have changed
  useEffect(() => {
    InfopagesStore.reload();
  }, []);

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
    <PageRefreshScrollView>
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
            <MovaText style={{fontSize: 24, marginBottom: 5}}>{t('bike_currently_available')}</MovaText>
            {availabilityRow(t('bikes'), page.data.bikes_available ? page.data.bikes_available : 0)}
            {availabilityRow(t('cargobikes'), page.data.cargobikes_available ? page.data.cargobikes_available : 0)}
            {availabilityRow(t('biketrailers'), page.data.trailers_available ? page.data.trailers_available : 0)}
          </StatusContent>
        ) : (
          <StatusContent>
            <MovaText>{t('bike_closed')}</MovaText>
          </StatusContent>
        )}
        <PageContent>
          <MovaMarkdown>{page.content}</MovaMarkdown>
        </PageContent>
      </PageContainer>
    </PageRefreshScrollView>
  );
}
