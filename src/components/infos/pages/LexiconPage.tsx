import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Platform, SectionList, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaTheme from '../../../constants/MovaTheme';
import untypedWORDS from '../../../../assets/lexicon.json';
import {useTranslation} from 'react-i18next';
import languageManager from '../../../helpers/LanguageManager';
import MovaAccordion from '../../generic/MovaAccordion';
import MovaText from '../../generic/MovaText';
import MovaSearchbarHeading from '../../generic/MovaSearchbarHeading';

interface IWord {
  en: string;
  de: string;
  fr: string;
  it: string;
}

interface ISection {
  title: string;
  data: IWord[];
  elementsCount: number;
}

const WORDS: IWord[] = untypedWORDS;

const PageContainer = styled.SafeAreaView`
  background: ${MovaTheme.colorYellow}
  flex: 1;
`;

const PageHeader = styled.View`
  background: ${MovaTheme.colorYellow};
  height: 78px;
`;
const PageContent = styled.View`
  background-color: #fff;
  flex: 1;
`;

const SectionHeaderText = styled.Text`
  padding: 10px;
  font-size: 32px;
  font-weight: bold;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
`;

type RootStackParamList = {infospage: {page: IPage}};
type Props = {navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage};

export default function LexiconPage({navigation, page}: Props) {
  const {t} = useTranslation();

  const otherLanguagesIndex = ['de', 'en', 'fr', 'it'].filter(lang => lang !== languageManager.currentLanguage);
  const currentLanguageIndex = languageManager.currentLanguage as keyof IWord;
  const [sections, setSections] = useState<ISection[]>([]);

  const createSectionsFromWords = (words: IWord[]) => {
    const sortedWords = words.sort((a, b) => {
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

    const sections = sortedWords.reduce((sections: ISection[], word: IWord) => {
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
    setSections(sections);
  };

  const handleSearch = (words: IWord[]) => {
    createSectionsFromWords(words);
  };

  // Initial sections load
  useEffect(() => {
    createSectionsFromWords(WORDS);
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <MovaSearchbarHeading
          headerText={page.title}
          searchableAttributes={['en', 'de', 'fr', 'it']}
          getData={() => WORDS}
          getDefaultData={() => WORDS}
          handleSearch={handleSearch}
          navigation={navigation}></MovaSearchbarHeading>
      </PageHeader>
      <PageContent>
        <SectionList
          sections={sections}
          renderItem={({item, index, section}) => (
            <View style={{borderBottomWidth: index == section.elementsCount - 1 ? 0 : 3}}>
              <MovaAccordion header={item[currentLanguageIndex]} color={MovaTheme.colorOrange}>
                {otherLanguagesIndex.map(lang => (
                  <MovaText key={lang}>{item[lang as keyof IWord]}</MovaText>
                ))}
              </MovaAccordion>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => <SectionHeaderText>{title}</SectionHeaderText>}
          keyExtractor={(item, index) => index.toString()}
        />
      </PageContent>
    </PageContainer>
  );
}
