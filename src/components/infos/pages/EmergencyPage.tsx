import React from 'react';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {ScrollView, TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaMarkdown from '../../generic/MovaMarkdown';
import MovaIcon from '../../generic/MovaIcon';
import {Linking} from 'react-native'

const PageContainer = styled.View`
  background-color: #fff;
  flex: 1;
  margin-top: ${getStatusBarHeight()}px;
`;

const PageHeader = styled.View`
  padding: 10px;
  margin-top: 10px;
`;
const PageContent = styled.View`
  padding: 10px;
`;

const CallContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

type RootStackParamList = {infospage: {page: IPage}};
type Props = { navigation: StackNavigationProp<RootStackParamList, 'infospage'>; page: IPage; };

export default function GenericPage({navigation, page}: Props) {
  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {page.title}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <PageContent>
          <MovaMarkdown>{page.content}</MovaMarkdown>
          <CallContainer>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${page.data.phone_number}`)}>
              <MovaIcon name={'info'} size={100} />
            </TouchableOpacity>
          </CallContainer>
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}
