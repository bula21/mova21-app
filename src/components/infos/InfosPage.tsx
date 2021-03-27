import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {IPage} from './IPage';
import GenericPage from './pages/GenericPage';
import BikePage from './pages/BikePage';

type RootStackParamList = {infospage: {page: IPage}};
type Props = StackScreenProps<RootStackParamList, 'infospage'>;

export default function InfosPage({route, navigation}: Props) {
  const {page} = route.params;
  if (page.renderer === 'bike') {
    return <BikePage navigation={navigation} route={route} />;
  }
  return <GenericPage navigation={navigation} route={route} />;
}
