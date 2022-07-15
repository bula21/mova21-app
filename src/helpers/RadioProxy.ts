import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
import i18next from '../i18n';
import { fetchJsonOffline, fetchJsonOnlineOrOffline } from "./BackendProxy";

const fetchInfo = async (fullUrl: string, showNoInternet: boolean) => {
  const state = await NetInfo.fetch();
  if (state && state.isConnected) {
    return fetchJsonOnlineOrOffline(fullUrl);
  } else {
    if (showNoInternet) {
      Toast.show({
        type: 'info',
        text1: i18next.t('no_internet'),
        text2: i18next.t('offline_data_loaded'),
        visibilityTime: 2000,
      });
    }
    return fetchJsonOffline(fullUrl);
  }
}

export const RadioProxy = {
  /** Serve requests for the radio server. Whenever possible, requests are sent
   * directly to the server. If offline, previously retrieved data is served from
   * locally persisted storage. */
  fetchJson: async (url: string, showNoInternet: boolean = false) => fetchInfo(url, showNoInternet).catch(
    error => console.error(error)
  ),
  /** Subscribe to arrival of new data. */
  subscribe: (f: () => void) => {
    return NetInfo.addEventListener(state => {
      if (state.isConnected) {
        f();
      }
    });
  }
}
