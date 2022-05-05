import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import MovaText from '../../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../../constants/MovaTheme';
import PageRefreshScrollView from "../PageRefreshScrollView";
import {ActivitiesStore} from "../../../stores/ActivitiesStore";
import {IActivity} from "./IActivity";
import MovaAccordion from "../../generic/MovaAccordion";
import MovaIcon from "../../generic/MovaIcon";

const PageContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
  background: ${MovaTheme.colorYellow};
`;

const ActivityListItem = styled.View`
  border-bottom-width: 1px;
  border-color: black;
`;

const ActivityDescription = styled.View`
  padding: 15px 0;
`;
const ActivityLocation = styled.View`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type RootStackParamList = {walkindetails: {label: string}};
type Props = StackScreenProps<RootStackParamList, 'walkindetails'>;

export default function WalkInDetailPage({route, navigation}: Props) {
  const {t} = useTranslation();

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  // refresh on mount because data might have changed
  useEffect(() => {
    setActivities(ActivitiesStore.getAll());
    const subscription = ActivitiesStore.subscribe((act: IActivity[]) => {
      setActivities(act);
    });
    ActivitiesStore.reload();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function onRefresh() {
    setRefreshing(true);
    ActivitiesStore.reload().then(() => {
      setActivities(ActivitiesStore.getAll());
      setRefreshing(false);
    });
  }

  return (
    <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
    >
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {route.params.label}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        {
          activities.map(activity => (
            <ActivityListItem>
              <MovaAccordion header={activity.title_de} color={MovaTheme.colorBlue}>
                <ActivityDescription>
                  {activity.location_de &&
                    <ActivityLocation>
                      <MovaIcon name="map" style={{marginRight: 4, fontSize: 18}}/>
                      <MovaText>{activity.location_de}</MovaText>
                    </ActivityLocation>
                  }
                  <MovaText>{activity.description_de}</MovaText>
                </ActivityDescription>
              </MovaAccordion>
            </ActivityListItem>
          ))
        }
      </PageContainer>
    </ScrollView>
  );
}
