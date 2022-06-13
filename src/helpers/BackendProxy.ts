import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
import appConfig from '../appConfig';
import i18next from '../i18n';

const fetchJson = async (url: string, showNoInternet: boolean) => {
	const fullUrl = `${appConfig.backendUrl}/${url}`;
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

const fetchJsonOffline = async (url: string) => AsyncStorage.getItem(url).then(s => {
	if (s) {
		return JSON.parse(s);
	}
	else {
		throw 'No data cached offline';
	}
});

/** Attempt to fetch data online. Fall back to offline storage if reading online fails. */
const fetchJsonOnlineOrOffline = async (url: string) => {
	const response = await fetch(url).catch(
		error => {
			// Ignore error, offline data will be used.
			console.debug(error)
		}
	);
	if (response && response.ok) {
		const json = await response.json();
		// Store in the background
		AsyncStorage.setItem(url, JSON.stringify(json)).catch(
			error => console.error(error)
		);
		// Display data immediately
		return json;
	} else {
		Toast.show({
			type: 'error',
			text1: i18next.t('no_server_connection'),
			text2: i18next.t('offline_data_loaded'),
			visibilityTime: 2000,
		});
		return fetchJsonOffline(url);
	}
};

export const BackendProxy = {
	/** Serve requests for the backend server. Whenever possible, requests are sent
	 * directly to the server. If offline, previously retrieved data is served from
	 * locally persisted storage. */
	fetchJson: async (url: string, showNoInternet: boolean = false) => fetchJson(url, showNoInternet).catch(
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
