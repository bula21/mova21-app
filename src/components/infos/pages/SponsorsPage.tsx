import React, { useState } from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import MovaTheme from "../../../constants/MovaTheme";
import {ScrollView, TouchableOpacity, Image, Linking} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import {useTranslation} from 'react-i18next';
import languageManager from '../../../helpers/LanguageManager';


interface ISponsor {
  src: any;
  url: string;
}

const PageContainer = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
`;

const HauptPartnerinnenLabel = styled(MovaHeadingText)`
  padding: 10px;
  background-color: ${MovaTheme.colorBlue};
  font-size: 30px;
`;

const PartnerinnenLabel = styled(MovaHeadingText)`
  padding: 10px;
  background-color: ${MovaTheme.colorOrange}
  font-size: 30px;
`;

const CoPartnerinnenLabel = styled(MovaHeadingText)`
  padding: 10px;
  background-color: ${MovaTheme.colorYellow}
  font-size: 30px;
`;

const UnterstutzerLabel = styled(MovaHeadingText)`
  padding: 10px;
  background-color: ${MovaTheme.colorGrey}
  font-size: 30px;
`;

const base_url = '../../../../assets/sponsors/';
const base_url_de = base_url + 'de/';
const base_url_fr = base_url + 'fr/';
const base_url_en = base_url + 'en/';
const base_url_it = base_url + 'it/';

const partners_data: any = {
  'de': {
    'Hauptpartnerinnen' :  [
      { src: require(base_url_de + 'migros.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_de + 'post.png'),
        url: "https://www.post.ch"},
      { src: require(base_url_de + 'mobiliar.png'),
        url: "https://www.mobiliar.ch"}
    ],
    'Partnerinnen' : [
      { src: require(base_url_de + 'css.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_de + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_de + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_de + 'sbb.png'),
        url: "https://www.sbb.ch/"},
    ],
    'Co-Partnerinnen' : [
      { src: require(base_url_de + 'hajk.png'),
        url: "https://www.hajk.ch/"},
    ],
    'Unterstutzer' : [
      { src: require(base_url_de + 'sps.png'),
        url: "https://pfadistiftung.ch/"},
    ],
  },
  'en': {
    'Hauptpartnerinnen' :  [
      { src: require(base_url_en + 'migros.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_en + 'post.png'),
        url: "https://www.post.ch"},
      { src: require(base_url_en + 'mobiliar.png'),
        url: "https://www.mobiliar.ch"}
    ],
    'Partnerinnen' : [
      { src: require(base_url_en + 'css.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_en + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_en + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_en + 'sbb.png'),
        url: "https://www.sbb.ch/"},
    ],
    'Co-Partnerinnen' : [
      { src: require(base_url_en + 'hajk.png'),
        url: "https://www.hajk.ch/"},
    ],
    'Unterstutzer' : [
      { src: require(base_url_en + 'sps.png'),
        url: "https://pfadistiftung.ch/"},
    ],
  },
  'fr': {
    'Hauptpartnerinnen' :  [
      { src: require(base_url_fr + 'migros.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_fr + 'post.png'),
        url: "https://www.post.ch"},
      { src: require(base_url_fr + 'mobiliar.png'),
        url: "https://www.mobiliar.ch"}
    ],
    'Partnerinnen' : [
      { src: require(base_url_fr + 'css.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_fr + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_fr + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_fr + 'sbb.png'),
        url: "https://www.sbb.ch/"},
    ],
    'Co-Partnerinnen' : [
      { src: require(base_url_fr + 'hajk.png'),
        url: "https://www.hajk.ch/"},
    ],
    'Unterstutzer' : [
      { src: require(base_url_fr + 'sps.png'),
        url: "https://pfadistiftung.ch/"},
    ],
  },
  'it': {
    'Hauptpartnerinnen' :  [
      { src: require(base_url_it + 'migros.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_it + 'post.png'),
        url: "https://www.post.ch"},
      { src: require(base_url_it + 'mobiliar.png'),
        url: "https://www.mobiliar.ch"}
    ],
    'Partnerinnen' : [
      { src: require(base_url_it + 'css.png'),
        url: "https://www.migros.ch"},
      { src: require(base_url_it + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_it + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_it + 'sbb.png'),
        url: "https://www.sbb.ch/"},
    ],
    'Co-Partnerinnen' : [
      { src: require(base_url_it + 'hajk.png'),
        url: "https://www.hajk.ch/"},
    ],
    'Unterstutzer' : [
      { src: require(base_url_it + 'sps.png'),
        url: "https://pfadistiftung.ch/"},
    ],
  },
}

type RootStackParamList = {infospage: {page: IPage}};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function SponsorsPage({navigation, page}: Props) {
  const {t} = useTranslation();
  const Partners = partners_data[languageManager.currentLanguage]

  const partnerList = (sponsors: ISponsor[] | undefined) => {
    return (
      sponsors ?
        (sponsors.map((sponsor, id) => {
            return(
              <TouchableOpacity key={sponsor.url} onPress={() => Linking.openURL(sponsor.url)}>
                <ImageContainer style={{borderTopWidth: id == 0 ? 0 : 2}}>
                  <Image
                    source={sponsor.src}
                    style={{width: "75%", height: 100}}
                    resizeMode={'contain'}
                  />
                </ImageContainer>
              </TouchableOpacity>
            )
          })
      ) : null
    );
  }

  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {page.title}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <HauptPartnerinnenLabel>{t('Hauptpartnerinnen')}</HauptPartnerinnenLabel>
        { partnerList(Partners['Hauptpartnerinnen']) }
        <PartnerinnenLabel>{t('Partnerinnen')}</PartnerinnenLabel>
        { partnerList(Partners['Partnerinnen']) }
        <CoPartnerinnenLabel>{t('Co-Partnerinnen')}</CoPartnerinnenLabel>
        { partnerList(Partners['Co-Partnerinnen']) }
        <UnterstutzerLabel>{t('Unterstutzer')}</UnterstutzerLabel>
        { partnerList(Partners['Unterstutzer']) }
      </PageContainer>
    </ScrollView>
  );
}
