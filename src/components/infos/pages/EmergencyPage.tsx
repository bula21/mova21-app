import React from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import IconBack from '../../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPage} from '../IPage';
import MovaMarkdown from '../../generic/MovaMarkdown';
import {Linking} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MovaTheme from "../../../constants/MovaTheme";
import MovaText from "../../generic/MovaText";
import PageRefreshScrollView from "../PageRefreshScrollView";

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
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${page.data.phone_number}`)}>
              <CallButtonContent>
                <Icon name="phone" size={40} color="black" />
                <MovaText style={{fontSize: 24, paddingLeft: 20}}>{page.data.phone_number}</MovaText>
              </CallButtonContent>
            </TouchableOpacity>
          </CallContainer>
          <MovaMarkdown>{page.content}</MovaMarkdown>
        </PageContent>
      </PageContainer>
    </PageRefreshScrollView>
  );
}
