import React, {useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaMarkdown from '../../generic/MovaMarkdown';
import {Linking} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MovaTheme from "../../../constants/MovaTheme";
import MovaText from "../../generic/MovaText";
import PageRefreshScrollView from "../PageRefreshScrollView";
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {useTranslation} from 'react-i18next';

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

const CallContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  background: ${MovaTheme.colorOrange};
  height: 80px;
`;

const CallButtonContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type RootStackParamList = {infospage: {page: IPage}};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function GenericPage({navigation, page}: Props) {

  const {t} = useTranslation();

  const [location, setLocation] = useState<GeoPosition|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>('');

  const initiateCall = async () => {
    if (isLoading) {
      return; // only call once
    }
    setIsLoading(true);
    setLocation(null);
    setLocationErrorMessage('');

    try {
      // wait for user permissions and ignore the result
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Standort senden",
            message: "Deinen Standort an die mova Notfall-Zentrale übermitteln.",
            buttonNeutral: "Jetzt nicht",
            buttonNegative: "Abbrechen",
            buttonPositive: "OK"
          }
        );
      }
    } catch (err) {
      // ignore errors
      console.warn(err);
    } finally {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          setIsLoading(false);
          Linking.openURL(`tel:${page.data.phone_number}`)
        },
        (error) => {
          console.log(error.code, error.message);
          setIsLoading(false);
          setLocationErrorMessage(error.message);
          Linking.openURL(`tel:${page.data.phone_number}`)
        },
        {enableHighAccuracy: true, timeout: 3000, maximumAge: 60000}
      );
    }
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
        <PageContent>
          <MovaMarkdown>{page.data && page.data.textBeforeButton ? page.data.textBeforeButton : ''}</MovaMarkdown>
          <CallContainer>
            <TouchableOpacity onPress={() => initiateCall()}>
              <CallButtonContent>
                <Icon name="phone" size={40} color="black" />
                <MovaText style={{fontSize: 24, paddingLeft: 20}}>{isLoading ? t('starting_call') + ' ...' : page.data.phone_number}</MovaText>
              </CallButtonContent>
            </TouchableOpacity>
          </CallContainer>
          {location ? <MovaText style={{fontSize: 10, color: '#ccc', textAlign: 'center'}}>{t('location')}: {location.coords.latitude}, {location.coords.longitude}, {t('location_accuracy')}: {Math.round(location.coords.accuracy)}m</MovaText> : null}
          {locationErrorMessage ? <MovaText style={{fontSize: 10, color: '#c51919', textAlign: 'center'}}>{t('location')}: {locationErrorMessage}</MovaText> : null}
          <MovaMarkdown>{page.content}</MovaMarkdown>
        </PageContent>
      </PageContainer>
    </PageRefreshScrollView>
  );
}
