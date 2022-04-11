import React, {ReactNode, useState} from 'react';
import {RefreshControl, ScrollView } from 'react-native';
import {InfopagesStore} from "../../stores/InfopagesStore";

type Props = {
  children: ReactNode;
};

export default function PageRefreshScrollView(props: Props) {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  function onRefresh() {
    setRefreshing(true);
    InfopagesStore.reload().then(() => {
      setRefreshing(false);
    });
  }

  return (
    <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
    >{props.children}</ScrollView>
  );
}
