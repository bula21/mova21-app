import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import MovaText from '../generic/MovaText';
import languageManager from '../../helpers/LanguageManager';
import { Text } from 'react-native';
import MovaTheme from "../../constants/MovaTheme";

const LanguageSwitcherMain = styled.View`
  padding: 20px 0px;
`;

export default function LanguageSwitcher() {
  return (
      <LanguageSwitcherMain>
        <Text>
          <TouchableOpacity onPress={(e) => languageManager.changeLanguageTo("de")}>
            <MovaText style={{fontSize: 24, color: languageManager.currentLanguage === 'de' ? MovaTheme.colorBlack : MovaTheme.colorGrey}}>  DE  </MovaText>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => languageManager.changeLanguageTo("fr")}>
            <MovaText style={{fontSize: 24, color: languageManager.currentLanguage === 'fr' ? MovaTheme.colorBlack : MovaTheme.colorGrey}}>  FR  </MovaText>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => languageManager.changeLanguageTo("it")}>
            <MovaText style={{fontSize: 24, color: languageManager.currentLanguage === 'it' ? MovaTheme.colorBlack : MovaTheme.colorGrey}}>  IT  </MovaText>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => languageManager.changeLanguageTo("en")}>
            <MovaText style={{fontSize: 24, color: languageManager.currentLanguage === 'en' ? MovaTheme.colorBlack : MovaTheme.colorGrey}}>  EN  </MovaText>
          </TouchableOpacity>
        </Text>
      </LanguageSwitcherMain>
  );
}
