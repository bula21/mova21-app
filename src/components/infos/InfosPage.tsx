import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {IPage} from './IPage';
import GenericPage from './pages/GenericPage';
import BikePage from './pages/BikePage';
import EmergencyPage from './pages/EmergencyPage';
import SponsorsPage from './pages/SponsorsPage';
import LexiconPage from './pages/LexiconPage';
import {InfopagesStore} from '../../stores/InfopagesStore';
import WalkInPage from "./pages/WalkInPage";

type RootStackParamList = {infospage: {page: IPage}};
type Props = StackScreenProps<RootStackParamList, 'infospage'>;

export default function InfosPage({route, navigation}: Props) {

  const [page, setPage] = useState<IPage | null>(null); // integer state

  // load from store on mount
  useEffect(() => {
    setPage(InfopagesStore.getPage(route.params.page.id));
    // make sure the page updates, when the store changes
    const subscription = InfopagesStore.subscribe(() => {
      setPage(InfopagesStore.getPage(route.params.page.id));
    })
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!page) {
    return null;
  }

  switch(page.renderer) {
    case 'bike': return <BikePage navigation={navigation} page={page} />;
    case 'emergency': return <EmergencyPage navigation={navigation} page={page} />;
    case 'sponsors': return <SponsorsPage navigation={navigation} page={page} />;
    case 'walk-in': return <WalkInPage navigation={navigation} page={page} />;
    case 'lexicon': return <LexiconPage navigation={navigation} page={page} />;
    default: return <GenericPage navigation={navigation} page={page} />;
  }
}
