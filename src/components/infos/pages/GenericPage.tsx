import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaMarkdown from '../../generic/MovaMarkdown';
import MovaTheme from '../../../constants/MovaTheme';
import PageRefreshScrollView from "../PageRefreshScrollView";

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
  padding-top: 0;
  background: #fff;
`;

type RootStackParamList = {infospage: {page: IPage}};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function GenericPage({navigation, page}: Props) {
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
          <MovaMarkdown navigation={navigation}>{page.content}</MovaMarkdown>
        </PageContent>
      </PageRefreshScrollView>
    </PageContainer>
  );
}
