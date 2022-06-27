import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import MovaTheme from "../../../constants/MovaTheme";
import {TouchableOpacity, Image, Linking} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import {useTranslation} from 'react-i18next';
import languageManager from '../../../helpers/LanguageManager';
import PageRefreshScrollView from "../PageRefreshScrollView";


interface ISponsor {
  src: any;
  url: string;
}

const PageContainer = styled.SafeAreaView`
  background-color: #fff;
  background: ${MovaTheme.colorYellow};
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
  background: ${MovaTheme.colorYellow};
`;

const PageContent = styled.View`
  background-color: #fff;
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

const UnterstuetzerinnenLabel = styled(MovaHeadingText)`
  padding: 10px;
  background-color: ${MovaTheme.colorYellow}
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
        url: "https://www.css.ch/"},
      { src: require(base_url_de + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_de + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_de + 'sbb.png'),
        url: "https://www.sbb.ch/"},
      { src: require(base_url_de + 'etavis.png'),
        url: "https://www.etavis.ch/"},
      { src: require(base_url_de + 'holzbau-schweiz.png'),
        url: "https://www.holzbau-schweiz.ch/"},
      { src: require(base_url_de + 'lions-club.png'),
        url: "https://www.lionsclubs.ch/"},
      { src: require(base_url_de + 'hajk.png'),
        url: "http://www.hajk.ch/"},
    ],
    'Unterstuetzerinnen' : [
      { src: require(base_url_de + 'sps.png'),
        url: "https://pfadistiftung.ch/"},
      { src: require(base_url_de + 'wallis.png'),
        url: "https://www.valais.ch/de/home"},
      { src: require(base_url_de + 'goms.png'),
        url: "https://www.goms.ch/"},
      { src: require(base_url_de + 'armee.png'),
        url: "https://www.vbs.admin.ch/de/home.html"},
    ]
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
        url: "https://www.css.ch/"},
      { src: require(base_url_en + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_en + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_en + 'sbb.png'),
        url: "https://www.sbb.ch/"},
      { src: require(base_url_en + 'etavis.png'),
        url: "https://www.etavis.ch/"},
      { src: require(base_url_en + 'holzbau-schweiz.png'),
        url: "https://www.holzbau-schweiz.ch/"},
      { src: require(base_url_en + 'lions-club.png'),
        url: "https://www.lionsclubs.ch/"},
      { src: require(base_url_en + 'hajk.png'),
        url: "http://www.hajk.ch/"},
    ],
    'Unterstuetzerinnen' : [
      { src: require(base_url_en + 'sps.png'),
        url: "https://pfadistiftung.ch/"},
      { src: require(base_url_en + 'wallis.png'),
        url: "https://www.valais.ch/de/home"},
      { src: require(base_url_en + 'goms.png'),
        url: "https://www.goms.ch/"},
      { src: require(base_url_en + 'armee.png'),
        url: "https://www.vbs.admin.ch/de/home.html"},
    ]
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
        url: "https://www.css.ch/"},
      { src: require(base_url_fr + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_fr + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_fr + 'sbb.png'),
        url: "https://www.sbb.ch/"},
      { src: require(base_url_fr + 'etavis.png'),
        url: "https://www.etavis.ch/"},
      { src: require(base_url_fr + 'holzbau-schweiz.png'),
        url: "https://www.holzbau-schweiz.ch/"},
      { src: require(base_url_fr + 'lions-club.png'),
        url: "https://www.lionsclubs.ch/"},
      { src: require(base_url_fr + 'hajk.png'),
        url: "http://www.hajk.ch/"},
    ],
    'Unterstuetzerinnen' : [
      { src: require(base_url_fr + 'sps.png'),
        url: "https://pfadistiftung.ch/fr/accueil/"},
      { src: require(base_url_fr + 'wallis.png'),
        url: "https://www.valais.ch/fr/home"},
      { src: require(base_url_fr + 'goms.png'),
        url: "https://www.goms.ch/fr"},
      { src: require(base_url_fr + 'armee.png'),
        url: "https://www.vbs.admin.ch/fr/home.html"},
    ]
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
        url: "https://www.css.ch/"},
      { src: require(base_url_it + 'matterhorn.png'),
        url: "https://www.matterhorngotthardbahn.ch/"},
      { src: require(base_url_it + 'postauto.png'),
        url: "https://www.postauto.ch/"},
      { src: require(base_url_it + 'sbb.png'),
        url: "https://www.sbb.ch/"},
      { src: require(base_url_it + 'etavis.png'),
        url: "https://www.etavis.ch/"},
      { src: require(base_url_it + 'holzbau-schweiz.png'),
        url: "https://www.holzbau-schweiz.ch/"},
      { src: require(base_url_it + 'lions-club.png'),
        url: "https://www.lionsclubs.ch/"},
      { src: require(base_url_it + 'hajk.png'),
        url: "http://www.hajk.ch/"},
    ],
    'Unterstuetzerinnen' : [
      { src: require(base_url_it + 'sps.png'),
        url: "https://pfadistiftung.ch/it/benvenuti/"},
      { src: require(base_url_it + 'wallis.png'),
        url: "https://www.valais.ch/it/home"},
      { src: require(base_url_it + 'goms.png'),
        url: "https://www.goms.ch/"},
      { src: require(base_url_it + 'armee.png'),
        url: "https://www.vbs.admin.ch/it/home.html"},
    ]
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
    <PageContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <PageHeader>
          <MovaHeadingText>
            <IconBack /> {page.title}
          </MovaHeadingText>
        </PageHeader>
      </TouchableOpacity>
      <PageRefreshScrollView>
        <PageContent>
          <HauptPartnerinnenLabel>{t('Hauptpartnerinnen')}</HauptPartnerinnenLabel>
          { partnerList(Partners['Hauptpartnerinnen']) }
          <PartnerinnenLabel>{t('Partnerinnen')}</PartnerinnenLabel>
          { partnerList(Partners['Partnerinnen']) }
          <UnterstuetzerinnenLabel>{t('Unterstuetzerinnen')}</UnterstuetzerinnenLabel>
          { partnerList(Partners['Unterstuetzerinnen']) }
        </PageContent>
      </PageRefreshScrollView>
    </PageContainer>
  );
}
