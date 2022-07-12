import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import { Platform, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackScreenProps} from '@react-navigation/stack';
import MovaText from '../../generic/MovaText';
import {useTranslation} from 'react-i18next';
import MovaTheme from '../../../constants/MovaTheme';
import {ActivitiesStore} from "../../../stores/ActivitiesStore";
import {IActivity} from "./IActivity";
import MovaAccordion from "../../generic/MovaAccordion";
import MovaIcon from "../../generic/MovaIcon";
import LanguageManager from "../../../helpers/LanguageManager";
import MovaMarkdown from '../../generic/MovaMarkdown';
import MovaSearchbarHeading from '../../generic/MovaSearchbarHeading';
import moment from 'moment';

const PageContainer = styled.SafeAreaView`
  background: ${MovaTheme.colorYellow};
  flex: 1;
`;

const PageHeader = styled.View`
  padding: 10px;
`;

const ActivityListItem = styled.View`
  border-bottom-width: 2px;
  border-color: black;
`;

const ActivityDescription = styled.View`
  padding: 0;
  padding-bottom: 10px;
`;

const ActivityDetails = styled.View`
  margin-top: 5px;
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

  const updateActivities = (activities: IActivity[]) => {
    let filteredActivities = activities.filter(activity => {
      let dates: string[] = getDatesFromActivity(activity);
      return isAllView ||
        activity.category === route.params.filter ||
          (
            !isCategoryView &&
            (
              !activity.date ||
              dates.indexOf(route.params.filter) >= 0
            )
          ) ||
        (isCategoryView && activity.category === 'all')
    }).sort((a, b) => {
      return getTranslatedProperty(a, 'title').localeCompare(getTranslatedProperty(b, 'title'));
    });
    setActivities(filteredActivities);
  }

  // refresh on mount because data might have changed
  useEffect(() => {
    updateActivities(ActivitiesStore.getAll());
    setLoading(false);
    const subscription = ActivitiesStore.subscribe((act: IActivity[]) => {
      updateActivities(act);
    });
    ActivitiesStore.reload();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function onRefresh() {
    setRefreshing(true);
    ActivitiesStore.reload(true).then(() => {
      updateActivities(ActivitiesStore.getAll());
      setRefreshing(false);
    });
  }

  // from YYYY-MM-DD to Date Object
  let fromISODate = (date: string): Date => {
    return new Date(parseInt(date.substring(0,4)), parseInt(date.substring(5,7)) - 1, parseInt(date.substring(8,10)));
  }

  let formatReadableDate = (date: Date): string => {
    return moment(date).format('dd, D. MMMM');
  }

  function getTranslatedProperty(activity: IActivity, property: string): string {
    let name: string = property + '_' + lang;
    // @ts-ignore
    return name in activity ? (activity[name] ? activity[name] : '') : '';
  }

  function getDatesFromActivity(activity: IActivity): string[] {
    let dates: string[] = [];
    if (activity.date && !activity.is_permanent) {
      dates = activity.date.split(',');
      dates = dates.map(date => date.trim());
      dates = dates.map(date => date.substring(0,10));
      dates = dates.filter(date => !!date);
    }
    return dates;
  }

  function formatDates(activity: IActivity): string {
    let dates: string[] = getDatesFromActivity(activity);
    if (dates.length > 0) {
      let formattedDates: string[] = dates.map(date => formatReadableDate(fromISODate(date)));
      return formattedDates.join(' / ');
    }
    return '';
  }

  let lang = LanguageManager.currentLanguage;
  moment.locale(lang);

  let isAllView = route.params.filter === 'all';
  let isCategoryView = ['walk-in', 'rover'].indexOf(route.params.filter) >= 0;

  function openMap(activity: IActivity) {
    if (activity && activity.map_location_id) {
      navigation.navigate('map', { id: activity.map_location_id });
    }
  }

  return (
    <PageContainer>
        <PageHeader>
            <View style={{ height: 78 }}>
                <MovaSearchbarHeading
                  headerText={route.params.label}
                  searchableAttributes={[
                    'title_de',
                    'title_fr',
                    'title_it',
                    'location_de',
                    'location_fr',
                    'location_it',
                    'description_de',
                    'description_fr',
                    'description_it',
                  ]}
                  getData={ActivitiesStore.getAll}
                  getDefaultData={ActivitiesStore.getAll}
                  handleSearch={updateActivities}
                  navigation={navigation}/>
            </View>
        </PageHeader>
      <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
      >
        {
          activities.length
            ? activities.map(activity => (
              <ActivityListItem key={activity.id}>
                <MovaAccordion header={getTranslatedProperty(activity, 'title')} color={activity.category === 'rover' ? MovaTheme.colorOrange : MovaTheme.colorBlue}>
                  <ActivityDescription>
                    <MovaMarkdown navigation={navigation} coloredLinks={false}>{getTranslatedProperty(activity, 'description')}</MovaMarkdown>
                    {getTranslatedProperty(activity, 'location') &&
                        <TouchableOpacity onPress={() => openMap(activity)} activeOpacity={1}>
                          <ActivityDetails>
                            <MovaIcon name="ort-textgroesse" style={{marginTop: Platform.OS === 'ios' ? -6 : -3, marginLeft: -5, fontSize: 28}}/>
                            <MovaText style={{textDecorationLine: activity.map_location_id ? 'underline' : 'none'}}>{getTranslatedProperty(activity, 'location')}</MovaText>
                          </ActivityDetails>
                        </TouchableOpacity>
                    }
                    {(getTranslatedProperty(activity, 'opening_hours') || activity.date) ?
                        <ActivityDetails>
                          <MovaIcon name="uhr-textgroesse" style={{marginTop: Platform.OS === 'ios' ? -5 : -2, marginLeft: -5, fontSize: 28}}/>
                          <View>
                            <MovaText>{getTranslatedProperty(activity, 'opening_hours')}</MovaText>
                            <MovaText>{activity.date ? formatDates(activity) : t('every_day')}</MovaText>
                          </View>
                        </ActivityDetails>
                        : null
                    }
                  </ActivityDescription>
                </MovaAccordion>
              </ActivityListItem>
            ))
              : <NoActivities><MovaText>{isLoading ? '' : t('no_activities')}</MovaText></NoActivities>
        }
      </ScrollView>
    </PageContainer>
  );
}
