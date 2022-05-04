import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {Platform, SectionList, TouchableOpacity, View} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaTheme from '../../../constants/MovaTheme';
import untypedWORDS from '../../../../assets/lexicon.json';
import { useTranslation } from 'react-i18next';
import languageManager from '../../../helpers/LanguageManager';
import MovaAccordion from '../../generic/MovaAccordion';
import MovaText from '../../generic/MovaText';


interface IWord {
  "en": string;
  "de": string;
  "fr": string;
  "it": string;
}

const WORDS: IWord[] = untypedWORDS;

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
`;


const SectionHeaderText = styled.Text`
  padding: 10px;
  font-size: 32px;
  font-weight: bold;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
`;


type RootStackParamList = {infospage: {page: IPage}};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function LexiconPage({navigation, page}: Props) {
  const {t} = useTranslation();

  const otherLanguagesIndex = ['de', 'en', 'fr', 'it'].filter(lang => lang !== languageManager.currentLanguage);
  const currentLanguageIndex = languageManager.currentLanguage as keyof IWord;

  // Sort data by current language indexing
  const sortedWords = WORDS.sort((a, b) => {
    const aValue = a[currentLanguageIndex];
    const bValue = b[currentLanguageIndex];
    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });

  // Create a list of sections based on the first letter of the sorted words
  const sections = sortedWords.reduce((sections: any[], word: IWord) => {
    const firstLetter = word[currentLanguageIndex].charAt(0).toUpperCase();
    const section = sections.find(section => section.title === firstLetter);
    if (section) {
      section.data.push(word);
      section.elementsCount += 1;
    } else {
      sections.push({title: firstLetter, data: [word], elementsCount: 1});
    }
    
    return sections;
  }, []);


  return (
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {page.title}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <PageContent>
        <SectionList
          sections={sections}
          renderItem={({item, index, section}) => (
            <View style={{borderBottomWidth: index == section.elementsCount-1 ? 0 : 3}}>
              <MovaAccordion header={item[currentLanguageIndex]}>
                {
                  otherLanguagesIndex.map(lang => (
                    <MovaText key={lang}>{item[lang as keyof IWord]}</MovaText>
                  ))
                }
              </MovaAccordion>
            </View>
            )
          }
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeaderText>{title}</SectionHeaderText>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        </PageContent>
      </PageContainer>
  );
}
