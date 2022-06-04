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
import LanguageManager from "../../../helpers/LanguageManager";

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

const ActivityDetails = styled.View`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const NoActivities = styled.View`
  padding: 150px 20px;
  flex: 1;
  align-self: center;
`;

type RootStackParamList = {walkindetails: {label: string; filter: string}};
type Props = StackScreenProps<RootStackParamList, 'walkindetails'>;

export default function WalkInDetailPage({route, navigation}: Props) {
  const {t} = useTranslation();

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  // refresh on mount because data might have changed
  useEffect(() => {
    setActivities(ActivitiesStore.getAll());
    setLoading(false);
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

  function getTranslatedProperty(activity: IActivity, property: string): string {
    let name: string = property + '_' + lang;
    // @ts-ignore
    return name in activity ? activity[name] : '';
  }

  let lang = LanguageManager.currentLanguage;

  let isCategoryView = ['walk-in', 'rover'].indexOf(route.params.filter) >= 0;

  let filteredActivities = activities.filter(activity =>
      activity.category === route.params.filter ||
      activity.date === route.params.filter ||
      (isCategoryView && activity.category === 'all')
  );

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
          filteredActivities.length
            ? filteredActivities.map(activity => (
              <ActivityListItem key={activity.id}>
                <MovaAccordion header={getTranslatedProperty(activity, 'title')} color={MovaTheme.colorBlue}>
                  <ActivityDescription>
                    <MovaText>{getTranslatedProperty(activity, 'description')}</MovaText>
                    {getTranslatedProperty(activity, 'location') &&
                        <ActivityDetails>
                          <MovaIcon name="ort-textgroesse" style={{marginTop: -5, marginLeft: -5, fontSize: 28}}/>
                          <MovaText>{getTranslatedProperty(activity, 'location')}</MovaText>
                        </ActivityDetails>
                    }
                    {getTranslatedProperty(activity, 'opening_hours') &&
                        <ActivityDetails>
                          <MovaIcon name="uhr-textgroesse" style={{marginTop: -5, marginLeft: -5, fontSize: 28}}/>
                          <MovaText>{getTranslatedProperty(activity, 'opening_hours')}</MovaText>
                        </ActivityDetails>
                    }
                  </ActivityDescription>
                </MovaAccordion>
              </ActivityListItem>
            ))
              : <NoActivities><MovaText>{isLoading ? '' : t('no_activities')}</MovaText></NoActivities>
        }
      </PageContainer>
    </ScrollView>
  );
}
