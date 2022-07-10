import React, {useEffect, useState} from 'react';
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
import PageRefreshScrollView from "../PageRefreshScrollView";
import { BikeAvailabilityStore } from '../../../stores/BikeAvailabilityStore';
import { IBikeAvailability } from './IBikeAvailability';

const PageContainer = styled.SafeAreaView`
  background: ${MovaTheme.colorYellow};
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
  background: ${MovaTheme.colorYellow};
`;
const PageContent = styled.View`
  padding: 10px;
  background-color: #fff;
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
  const [bikeAvailability, setBikeAvailability] = useState<IBikeAvailability | null>(null);
  
  // refresh on mount because live numbers might have changed
  useEffect(() => {
    setBikeAvailability(BikeAvailabilityStore.get());
    const subscription = BikeAvailabilityStore.subscribe(() => setBikeAvailability(BikeAvailabilityStore.get()));
    BikeAvailabilityStore.reload();
    return () => {
      subscription.unsubscribe();
    };
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
    <PageContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <PageHeader>
          <MovaHeadingText>
            <IconBack /> {page.title}
          </MovaHeadingText>
        </PageHeader>
      </TouchableOpacity>
      <PageRefreshScrollView>
        {bikeAvailability?.is_open ? (
          <StatusContent>
            <MovaText style={{fontSize: 24, marginBottom: 5}}>{t('bike_currently_available')}</MovaText>
            {availabilityRow(t('bikes'), bikeAvailability?.regular_bikes ? bikeAvailability?.regular_bikes : 0)}
            {availabilityRow(t('cargobikes'), bikeAvailability?.cargo_bikes ? bikeAvailability?.cargo_bikes : 0)}
            {availabilityRow(t('biketrailers'), bikeAvailability?.bike_trailers ? bikeAvailability?.bike_trailers : 0)}
          </StatusContent>
        ) : (
          <StatusContent>
            <MovaText>{t('bike_closed')}</MovaText>
          </StatusContent>
        )}
        <PageContent>
          <MovaMarkdown navigation={navigation}>{page.content}</MovaMarkdown>
        </PageContent>
      </PageRefreshScrollView>
    </PageContainer>
  );
}
