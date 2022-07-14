import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {TouchableOpacity} from 'react-native';
import IconBack from '../generic/IconBack';
import {StackNavigationProp} from '@react-navigation/stack';

import MovaMarkdown from '../generic/MovaMarkdown';
import MovaTheme from '../../constants/MovaTheme';
import { IPage } from '../infos/IPage';
import PageRefreshScrollView from '../infos/PageRefreshScrollView';
import { InfopagesStore } from '../../stores/InfopagesStore';

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

export default function RadioInfo(props: any) {

  const [page, setPage] = useState<IPage | null>(null);

  // load from store on mount
  useEffect(() => {
    setPage(InfopagesStore.getPage(props.route.params.page.id));
    // make sure the page updates, when the store changes
    const subscription = InfopagesStore.subscribe(() => {
      setPage(InfopagesStore.getPage(props.route.params.page.id));
    })
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!page) {
    return null;
  }

    console.log(page)
  return (
    <PageContainer>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <PageHeader>
          <MovaHeadingText>
            <IconBack /> {page.title}
          </MovaHeadingText>
        </PageHeader>
      </TouchableOpacity>
      <PageRefreshScrollView>
        <PageContent>
          <MovaMarkdown navigation={props.navigation}>{page.content}</MovaMarkdown>
        </PageContent>
      </PageRefreshScrollView>
    </PageContainer>
  );
}
