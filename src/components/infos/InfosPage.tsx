import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {IPage} from './IPage';
import GenericPage from './pages/GenericPage';
import BikePage from './pages/BikePage';
import EmergencyPage from './pages/EmergencyPage';
import {InfopagesStore} from '../../stores/InfopagesStore';

type RootStackParamList = {infospage: {page: IPage}};
type Props = StackScreenProps<RootStackParamList, 'infospage'>;

export default function InfosPage({route, navigation}: Props) {

  const [page, setPage] = useState<IPage | null>(null); // integer state

  // load from store on mount
  useEffect(() => {
    setPage(getPage(route.params.page.id));
    // make sure the page updates, when the store changes
    const subscription = InfopagesStore.subscribe(() => {
      setPage(getPage(route.params.page.id));
    })
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function getPage(id: number): IPage|null {
      let pages = InfopagesStore.get().filter(page => page.id === id);
      return pages.length > 0 ? pages[0] : null;
  }
  if (!page) {
    return null;
  }

  switch(page.renderer) {
    case 'bike': return <BikePage navigation={navigation} page={page} />;
    case 'emergency': return <EmergencyPage navigation={navigation} page={page} />;
    default: return <GenericPage navigation={navigation} page={page} />;
  }
}
